import type { HealthResponse } from "@/types/api";

const baseUrl = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000").replace(/\/+$/, "");

export async function getBackendHealth(signal?: AbortSignal): Promise<HealthResponse> {
  const timeout = AbortSignal.timeout(5000);
  const response = await fetch(`${baseUrl}/api/v1/health`, {
    cache: "no-store",
    signal: signal ? AbortSignal.any([signal, timeout]) : timeout,
  });

  if (!response.ok) {
    throw new Error(`Health check failed with HTTP ${response.status}`);
  }

  const payload: unknown = await response.json();
  if (!payload || typeof payload !== "object" || !("status" in payload) || payload.status !== "ok") {
    throw new Error("Unexpected health response");
  }

  return { status: payload.status };
}
