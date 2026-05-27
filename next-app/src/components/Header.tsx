// src/components/Header.tsx
"use client";

import { useAuth } from "../lib/AuthContext";
import { useRouter } from "next/navigation";

export default function Header() {
  const { user, signOut, loading } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push("/login");
  };

  return (
    <header
      className="hero"
      style={{
        padding: "2rem",
        background: "rgba(0,0,0,0.4)",
        color: "#fff",
      }}
    >
      <h1 className="title">
        UrsoPhi <span className="highlight">GenAI Portal</span>
      </h1>
      <p className="subtitle">
        Impulsado por Gemini 2.5 &amp; Firebase AI Logic
      </p>
      {/* Show sign‑out button only when a user is authenticated */}
      {!loading && user && (
        <button
          onClick={handleSignOut}
          className="signout-button"
          style={{
            marginTop: "1rem",
            padding: "0.5rem 1rem",
            background: "rgba(255,255,255,0.1)",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Cerrar sesión
        </button>
      )}
    </header>
  );
}
