/**
 * Il Capo–style letter doubling for decorative labels.
 * Accessible UIs should expose the original word via aria-label / sr-only text.
 */
export function doubleLetters(value: string): string {
  return Array.from(value)
    .map((char) => (/\s/.test(char) ? char : `${char}${char}`))
    .join("");
}
