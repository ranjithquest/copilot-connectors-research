"use client";

import { useState } from "react";

const PRIMARY_BTN = "#1a1a1a";

interface PersonaToggleProps {
  onChange?: (persona: "admin" | "users") => void;
}

export function PersonaToggle({ onChange }: PersonaToggleProps) {
  const [active, setActive] = useState<"admin" | "users">("admin");

  function select(p: "admin" | "users") {
    setActive(p);
    onChange?.(p);
  }

  return (
    <div
      className="inline-flex items-center rounded-full p-0.5"
      style={{
        background: "rgba(0,0,0,0.05)",
        border: "1px solid rgba(0,0,0,0.08)",
      }}
    >
      {(["admin", "users"] as const).map((p) => (
        <button
          key={p}
          onClick={() => select(p)}
          className="relative px-4 py-1 rounded-full text-xs font-semibold transition-all duration-200"
          style={
            active === p
              ? { background: PRIMARY_BTN, color: "#fff", boxShadow: "0 1px 6px rgba(0,0,0,0.2)" }
              : { color: "#64748B" }
          }
        >
          {p === "admin" ? "Admin" : "Users"}
        </button>
      ))}
    </div>
  );
}
