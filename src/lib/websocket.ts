export function getWebSocketUrl(path: string) {
  const envBase = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";
  const url = new URL(envBase);
  const wsProtocol = url.protocol === "https:" ? "wss:" : "ws:";
  return `${wsProtocol}//${url.host}${path}`;
}


