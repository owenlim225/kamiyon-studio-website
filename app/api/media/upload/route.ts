import { createHash, timingSafeEqual } from "node:crypto";

import { NextResponse } from "next/server";

import { resolveMediaBucket } from "@/lib/cms/media-bucket";
import {
  buildMediaPublicUrl,
  createMediaObjectKey,
  readImageDimensions,
  type MediaUploadResult,
} from "@/lib/cms/media";

type ApiEnvelope<T> = {
  success: boolean;
  data: T | null;
  error: string | null;
};

function jsonEnvelope<T>(
  status: number,
  body: ApiEnvelope<T>,
): NextResponse<ApiEnvelope<T>> {
  return NextResponse.json(body, { status });
}

function secretsMatch(provided: string, expected: string): boolean {
  const left = createHash("sha256").update(provided).digest();
  const right = createHash("sha256").update(expected).digest();
  return timingSafeEqual(left, right);
}

function extractBearerSecret(request: Request): string | null {
  const auth = request.headers.get("authorization");
  if (!auth?.startsWith("Bearer ")) {
    return null;
  }

  const token = auth.slice("Bearer ".length).trim();
  return token || null;
}

async function extractUploadFile(request: Request): Promise<File | null> {
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.includes("multipart/form-data")) {
    return null;
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return null;
  }

  const entry = form.get("file");
  return entry instanceof File && entry.size > 0 ? entry : null;
}

export async function POST(
  request: Request,
): Promise<NextResponse<ApiEnvelope<MediaUploadResult>>> {
  const expected = process.env.MEDIA_UPLOAD_SECRET?.trim();
  if (!expected) {
    return jsonEnvelope<MediaUploadResult>(503, {
      success: false,
      data: null,
      error: "Media upload is not configured",
    });
  }

  const provided = extractBearerSecret(request);
  if (!provided || !secretsMatch(provided, expected)) {
    return jsonEnvelope<MediaUploadResult>(401, {
      success: false,
      data: null,
      error: "Unauthorized",
    });
  }

  const file = await extractUploadFile(request);
  if (!file) {
    return jsonEnvelope<MediaUploadResult>(400, {
      success: false,
      data: null,
      error: "Missing file",
    });
  }

  const mimeType = file.type?.trim() || "application/octet-stream";
  const key = createMediaObjectKey(file.name || "upload.bin");
  const bytes = new Uint8Array(await file.arrayBuffer());
  const dimensions = readImageDimensions(bytes, mimeType);
  const url = buildMediaPublicUrl(key);

  if (!url) {
    return jsonEnvelope<MediaUploadResult>(503, {
      success: false,
      data: null,
      error: "NEXT_PUBLIC_R2_PUBLIC_BASE_URL is not configured",
    });
  }

  try {
    const bucket = await resolveMediaBucket();
    await bucket.put(key, bytes, {
      httpMetadata: { contentType: mimeType },
    });
  } catch {
    return jsonEnvelope<MediaUploadResult>(503, {
      success: false,
      data: null,
      error: "MEDIA_BUCKET binding is unavailable",
    });
  }

  const data: MediaUploadResult = {
    key,
    url,
    mimeType,
    ...(dimensions?.width != null ? { width: dimensions.width } : {}),
    ...(dimensions?.height != null ? { height: dimensions.height } : {}),
  };

  return jsonEnvelope<MediaUploadResult>(200, {
    success: true,
    data,
    error: null,
  });
}
