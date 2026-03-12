const STORAGE_KEY = "elevenlabs_api_key";

export function getElevenLabsKey(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(STORAGE_KEY);
}

export function setElevenLabsKey(key: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, key.trim());
}

export function clearElevenLabsKey(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}
