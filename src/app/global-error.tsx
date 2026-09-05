"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Critical root exception:", error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          backgroundColor: "#090a0c",
          color: "#f4f4f5",
          fontFamily: "system-ui, sans-serif",
          display: "flex",
          minHeight: "100vh",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          margin: 0,
        }}
      >
        <div style={{ maxWidth: "32rem", width: "100%" }}>
          <p
            style={{
              fontFamily: "monospace",
              fontSize: "0.75rem",
              color: "#3b82f6",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            Critical Exception
          </p>
          <h1
            style={{
              fontSize: "1.875rem",
              fontWeight: 600,
              margin: "0.5rem 0 1rem",
            }}
          >
            System failure encountered
          </h1>
          <p style={{ color: "#9ca3af", fontSize: "0.95rem", lineHeight: 1.6 }}>
            A root-level exception halted execution. Reset the application to recover.
          </p>
          <button
            onClick={() => reset()}
            style={{
              marginTop: "1.5rem",
              backgroundColor: "#f4f4f5",
              color: "#090a0c",
              border: "none",
              padding: "0.625rem 1.25rem",
              borderRadius: "0.375rem",
              fontSize: "0.875rem",
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            Reset System
          </button>
        </div>
      </body>
    </html>
  );
}
