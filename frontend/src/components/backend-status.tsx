"use client";

import { useEffect, useState } from "react";
import { getBackendHealth } from "@/lib/api";

const messages = {
  checking: "Checking connection…",
  connected: "Connected",
  unavailable: "Unable to reach the backend",
};

type Status = keyof typeof messages;

export function BackendStatus() {
  const [status, setStatus] = useState<Status>("checking");
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    getBackendHealth(controller.signal).then(
      () => setStatus("connected"),
      () => {
        if (!controller.signal.aborted) setStatus("unavailable");
      },
    );

    return () => controller.abort();
  }, [attempt]);

  function checkAgain() {
    setStatus("checking");
    setAttempt((previous) => previous + 1);
  }

  return (
    <section className="flex flex-wrap items-center justify-between gap-5 rounded-2xl border border-teal-900/10 bg-white p-6 shadow-sm" aria-labelledby="backend-heading">
      <div>
        <h2 id="backend-heading" className="font-semibold">Backend connection</h2>
        <p className="mt-2 text-sm text-slate-600" role="status">{messages[status]}</p>
      </div>
      <button
        type="button"
        onClick={checkAgain}
        disabled={status === "checking"}
        className="rounded-lg bg-teal-800 px-4 py-2.5 text-sm font-semibold text-white enabled:hover:bg-teal-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-800 disabled:opacity-60"
      >
        Check again
      </button>
    </section>
  );
}
