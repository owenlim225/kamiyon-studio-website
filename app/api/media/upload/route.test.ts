import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { setMediaBucketForTests } from "@/lib/cms/media-bucket";

/** Minimal 1×1 PNG (valid IHDR). */
const PNG_1X1 = Uint8Array.from(
  Buffer.from(
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==",
    "base64",
  ),
);

describe("POST /api/media/upload", () => {
  const originalSecret = process.env.MEDIA_UPLOAD_SECRET;
  const originalBase = process.env.NEXT_PUBLIC_R2_PUBLIC_BASE_URL;
  const putMock = vi.fn();

  beforeEach(() => {
    vi.resetModules();
    putMock.mockReset();
    putMock.mockResolvedValue(undefined);
    process.env.MEDIA_UPLOAD_SECRET = "test-media-upload-secret";
    process.env.NEXT_PUBLIC_R2_PUBLIC_BASE_URL = "https://media.example.com";
    setMediaBucketForTests({
      put: (...args: unknown[]) => putMock(...args),
    });
  });

  afterEach(() => {
    setMediaBucketForTests(null);
    if (originalSecret === undefined) {
      delete process.env.MEDIA_UPLOAD_SECRET;
    } else {
      process.env.MEDIA_UPLOAD_SECRET = originalSecret;
    }
    if (originalBase === undefined) {
      delete process.env.NEXT_PUBLIC_R2_PUBLIC_BASE_URL;
    } else {
      process.env.NEXT_PUBLIC_R2_PUBLIC_BASE_URL = originalBase;
    }
  });

  async function post(init: { headers?: HeadersInit; body?: BodyInit } = {}) {
    const { POST } = await import("./route");
    const request = new Request("http://localhost/api/media/upload", {
      method: "POST",
      headers: init.headers,
      body: init.body,
    });
    return POST(request);
  }

  function formWithFile(file: File, fieldName = "file"): FormData {
    const form = new FormData();
    form.append(fieldName, file);
    return form;
  }

  it("returns 401 when unauthorized", async () => {
    const response = await post({
      headers: { Authorization: "Bearer wrong-secret" },
      body: formWithFile(new File([PNG_1X1], "pixel.png", { type: "image/png" })),
    });

    expect(response.status).toBe(401);
    await expect(response.json()).resolves.toEqual({
      success: false,
      data: null,
      error: "Unauthorized",
    });
    expect(putMock).not.toHaveBeenCalled();
  });

  it("returns 401 when Authorization header is missing", async () => {
    const response = await post({
      body: formWithFile(new File([PNG_1X1], "pixel.png", { type: "image/png" })),
    });

    expect(response.status).toBe(401);
    expect(putMock).not.toHaveBeenCalled();
  });

  it("returns 400 when file is missing", async () => {
    const empty = new FormData();
    empty.append("note", "no-file");

    const response = await post({
      headers: { Authorization: "Bearer test-media-upload-secret" },
      body: empty,
    });

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({
      success: false,
      data: null,
      error: "Missing file",
    });
    expect(putMock).not.toHaveBeenCalled();
  });

  it("puts to R2 and returns mapped success payload", async () => {
    const file = new File([PNG_1X1], "Hero Shot.PNG", { type: "image/png" });

    const response = await post({
      headers: { Authorization: "Bearer test-media-upload-secret" },
      body: formWithFile(file),
    });

    expect(response.status).toBe(200);
    const json = await response.json();

    expect(json).toMatchObject({
      success: true,
      error: null,
      data: {
        mimeType: "image/png",
        width: 1,
        height: 1,
      },
    });
    expect(typeof json.data.key).toBe("string");
    expect(json.data.key).toMatch(/^uploads\/\d{4}\/\d{2}\/[0-9a-f-]+-hero-shot\.png$/i);
    expect(json.data.url).toBe(`https://media.example.com/${json.data.key}`);

    expect(putMock).toHaveBeenCalledTimes(1);
    const [key, body, options] = putMock.mock.calls[0]!;
    expect(key).toBe(json.data.key);
    expect(body).toBeInstanceOf(Uint8Array);
    expect(options).toEqual({
      httpMetadata: { contentType: "image/png" },
    });
  });
});
