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
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: "24px",
      }}
    >
      <div
        style={{
          maxWidth: 900,
          width: "100%",
          border: "1px solid #d9dce8",
          borderRadius: 12,
          padding: 20,
          background: "#fff",
          color: "#141933",
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
          whiteSpace: "pre-wrap",
          lineHeight: 1.5,
        }}
      >
        <strong>Client runtime error</strong>
        <div style={{ marginTop: 12 }}>
          {error?.message || "Unknown error"}
        </div>
        {error?.digest ? (
          <div style={{ marginTop: 8 }}>Digest: {error.digest}</div>
        ) : null}
        <button
          onClick={reset}
          style={{
            marginTop: 16,
            border: "1px solid #4764ff",
            color: "#4764ff",
            background: "transparent",
            borderRadius: 8,
            padding: "8px 12px",
            cursor: "pointer",
          }}
        >
          Try again
        </button>
      </div>
    </div>
  );
}
