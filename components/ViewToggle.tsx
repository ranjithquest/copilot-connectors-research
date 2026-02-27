"use client";
import { useRouter, useSearchParams } from "next/navigation";

export function ViewToggle() {
  const router = useRouter();
  const params = useSearchParams();
  const view = params.get("view") ?? "newsletter";

  return (
    <div
      style={{
        display: "flex",
        gap: 2,
        background: "#f1f5f9",
        borderRadius: 999,
        padding: 3,
      }}
    >
      {(["newsletter", "web"] as const).map((v) => (
        <button
          key={v}
          onClick={() => router.push(`/?view=${v}`)}
          style={{
            padding: "4px 14px",
            borderRadius: 999,
            fontSize: 12,
            fontWeight: 600,
            background: view === v ? "#fff" : "transparent",
            color: view === v ? "#0f172a" : "#94a3b8",
            boxShadow: view === v ? "0 1px 4px rgba(0,0,0,0.1)" : "none",
            border: "none",
            cursor: "pointer",
            textTransform: "capitalize",
            transition: "all 0.15s",
          }}
        >
          {v === "web" ? "Web" : "Newsletter"}
        </button>
      ))}
    </div>
  );
}
