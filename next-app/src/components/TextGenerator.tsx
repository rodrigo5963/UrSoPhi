import React, { useState } from "react";
import { textModel, saveGeneration } from "../lib/firebase";

export default function TextGenerator() {
  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setError("");
    setOutput("");
    try {
      const result = await textModel.generateContentStream(prompt);
      for await (const chunk of result.stream) {
        setOutput((prev) => prev + chunk.text());
      }
      await saveGeneration({ prompt, type: "text", result: output });
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="tab-content">
      <div className="form-group">
        <label htmlFor="text-prompt">Prompt de texto</label>
        <textarea
          id="text-prompt"
          rows={4}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ejemplo: escribe un poema futurista…"
        />
      </div>
      <button className="btn-submit" onClick={generate} disabled={loading}>
        {loading ? "Generando…" : "Generar texto"}
      </button>
      {error && <p className="error-msg">{error}</p>}
      {output && (
        <div className="output-panel">
          <div className="output-header">
            <span>Respuesta Gemini 2.5</span>
          </div>
          <div className="output-content" dangerouslySetInnerHTML={{ __html: output }} />
        </div>
      )}
    </section>
  );
}
