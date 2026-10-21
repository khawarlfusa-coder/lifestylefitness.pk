// Signed-cookie session using Web Crypto (works in both middleware/edge and Node routes).
export const COOKIE = "lf_session";
const enc = new TextEncoder();

async function hmac(data: string, secret: string) {
  const key = await crypto.subtle.importKey("raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(data));
  return Array.from(new Uint8Array(sig)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function createToken(secret: string, ttlMs = 7 * 24 * 3600 * 1000) {
  const exp = String(Date.now() + ttlMs);
  return `${exp}.${await hmac(exp, secret)}`;
}

export async function verifyToken(token: string | undefined, secret: string | undefined) {
  if (!token || !secret) return false;
  const [exp, sig] = token.split(".");
  if (!exp || !sig || !(Number(exp) > Date.now())) return false;
  const expected = await hmac(exp, secret);
  if (expected.length !== sig.length) return false;
  let diff = 0;
  for (let i = 0; i < expected.length; i++) diff |= expected.charCodeAt(i) ^ sig.charCodeAt(i);
  return diff === 0;
}
