"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surface the real runtime error in the browser console.
    console.error("Route error boundary caught:", error);
  }, [error]);

  return (
    <div className="min-h-screen grid place-items-center p-6 bg-xbg">
      <div className="surface-card max-w-[900px] w-full p-6 font-mono whitespace-pre-wrap leading-[1.5]">
        <strong className="t-h5 text-xprimary block">Client runtime error</strong>
        <div className="mt-3 t-body2 text-xsecondary">
          {error?.message || "Unknown error"}
        </div>
        {error?.digest ? (
          <div className="mt-2 t-caption text-xtertiary">Digest: {error.digest}</div>
        ) : null}
        <button
          type="button"
          onClick={reset}
          className="mt-4 border border-xbrand text-xbrand bg-transparent rounded-[8px] px-3 py-2 cursor-pointer hover:bg-[rgba(71,100,255,0.08)] transition-colors t-button-sm"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
