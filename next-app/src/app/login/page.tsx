"use client";

import { useState } from "react";
import { signIn, signUp } from "../../lib/firebase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      if (mode === "login") await signIn(email, password);
      else await signUp(email, password);
      router.push("/");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <main className="container">
      <section className="card">
        <h2>{mode === "login" ? "Iniciar sesión" : "Crear cuenta"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Correo electrónico</label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="error-msg">{error}</p>}
          <button className="btn-submit" type="submit">
            {mode === "login" ? "Entrar" : "Registrarse"}
          </button>
        </form>
        <p>
          {mode === "login" ? "¿No tienes cuenta?" : "¿Ya tienes una cuenta?"}{" "}
          <button className="tab-btn" onClick={() => setMode(mode === "login" ? "signup" : "login")}>
            {mode === "login" ? "Regístrate" : "Inicia sesión"}
          </button>
        </p>
      </section>
    </main>
  );
}
