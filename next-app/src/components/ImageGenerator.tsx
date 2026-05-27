// src/components/ImageGenerator.tsx
"use client";

import { useState } from "react";
import { imageModel, saveGeneration } from "../lib/firebase";

export default function ImageGenerator() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "generating" | "error">("idle");
  const [error, setError] = useState("");

  const generate = async () => {
    if (!prompt.trim()) return;
    setStatus("generating");
    setError("");
    try {
      const result = await imageModel.generateContent(prompt);
      // Gemini 2.5 flash-image returns Media objects; we take the first image URL
      const media = (result as any).media?.[0];
      const url = media?.uri || media?.url;
      if (!url) throw new Error("No image URL returned");
      setImageUrl(url);
      await saveGeneration({ prompt, type: "image", result: url });
      setStatus("idle");
    } catch (e: any) {
      setError(e.message ?? "Error generating image");
      setStatus("error");
    }
  };

  return (
    <section className="tab-content">
      <div className="form-group">
        <label htmlFor="img-prompt">Prompt de Imagen</label>
        <input
          id="img-prompt"
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ej. Un atardecer cyberpunk sobre la ciudad"
        />
      </div>

      <button
        className="btn-submit"
        onClick={generate}
        disabled={status === "generating"}
      >
        {status === "generating" ? "Generando…" : "Generar Imagen"}
      </button>

      {error && <p className="error-msg">{error}</p>}

      {imageUrl && (
        <div className="output-panel">
          <div className="output-header">
            <span>Imagen generada</span>
          </div>
          <img src={imageUrl} alt={prompt} className="generated-image" />
        </div>
      )}
    </section>
  );
}
