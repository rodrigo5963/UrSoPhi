---
name: Firebase AI Logic
description: Skill to work with Gemini 2.5 Flash via Firebase AI Logic
---

| Campo | Valor |
|-------|-------|
| **Trigger** | "gemini", "AI", "generar texto", "generar imagen", "modelo", "prompt" |
| **Acción** | Guía para trabajar con Firebase AI Logic + Gemini 2.5 |

**Contenido del skill:**
1. Configuración del SDK (`getAI`, `getGenerativeModel`, `GoogleAIBackend`)
2. Modelos disponibles: `gemini-2.5-flash` (texto), `gemini-2.5-flash-image` (multimodal)
3. Patrones de streaming (`generateContentStream`) vs. respuesta completa
4. Manejo de `ResponseModality` para imágenes
5. Patrones de error y retry
6. Optimización de prompts para reducir tokens
