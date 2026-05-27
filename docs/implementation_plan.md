# Estructura Profesional de Agentes, Reglas y Skills — UrsoPhi Firebase

## Contexto del Proyecto

**UrsoPhi** (`ursophi`) es un portal GenAI construido con Firebase que utiliza:
- **Firebase Hosting** — SSG via Next.js 14 (`next-app/out/`) + página estática raíz (`index.html`)
- **Firebase AI Logic** — Gemini 2.5 Flash para texto e imágenes (`firebase/ai`)
- **Firestore (Data Connect)** — Colección `generations` para historial
- **Firebase Auth** — Email/Password con contexto React

Actualmente **no existe ningún archivo** de configuración agéntica (`.gemini/`, `AGENTS.md`, skills, etc.).

---

## Objetivo Principal

> Optimizar al máximo el consumo de tokens en cada sesión de desarrollo agéntico mediante **Progressive Disclosure**: reglas constitucionales siempre activas (~200 tokens) + Skills modulares activados bajo demanda (~100 tokens de metadata cada uno, instrucciones completas solo cuando se necesitan).

---

## Propuesta de Estructura de Archivos

```text
ursus/                              # Raíz del proyecto
├── AGENTS.md                       # [NEW] Reglas constitucionales del proyecto
├── .gemini/
│   └── skills/                     # [NEW] Skills compartidos del workspace
│       ├── firebase-deploy/
│       │   └── SKILL.md            # [NEW] Skill de despliegue Firebase
│       ├── firebase-ai-logic/
│       │   └── SKILL.md            # [NEW] Skill de Firebase AI Logic (Gemini)
│       ├── data-connect/
│       │   ├── SKILL.md            # [NEW] Skill de Firestore/Data Connect
│       │   └── references/
│       │       └── schema.md       # [NEW] Referencia del esquema de datos
│       ├── nextjs-components/
│       │   └── SKILL.md            # [NEW] Skill de componentes Next.js
│       └── security-rules/
│           ├── SKILL.md            # [NEW] Skill de reglas de seguridad
│           └── references/
│               └── patterns.md     # [NEW] Patrones de reglas Firestore
├── next-app/
│   ├── AGENTS.md                   # [NEW] Reglas específicas del frontend Next.js
│   └── src/
│       └── ...                     # (archivos existentes sin cambios)
├── firebase.json                   # (existente, sin cambios)
├── .firebaserc                     # (existente, sin cambios)
└── ...
```

---

## Propuestas de Cambio Detalladas

### Reglas Constitucionales (Siempre Activas)

#### [NEW] [AGENTS.md](file:///c:/1/spinther/ursus/AGENTS.md)

Archivo raíz con reglas constitucionales del proyecto. Estas instrucciones se cargan **siempre** en el contexto del agente (~200 tokens). Contenido:

- **Identidad del proyecto**: nombre, stack tecnológico, proyecto Firebase (`ursophi`)
- **Convenciones de código**: TypeScript estricto en `next-app/`, ES Modules en raíz, español para UI/comentarios
- **Estructura de directorios**: mapa conciso de qué hay en cada carpeta
- **Reglas de seguridad**: nunca exponer secrets, usar `.env.local` para variables
- **Modelo de referencia**: siempre usar `gemini-2.5-flash` como modelo base
- **Principios de eficiencia**: diffs mínimos, no regenerar archivos completos, componentes modulares

> [!IMPORTANT]
> Este archivo se mantiene **deliberadamente conciso** (<80 líneas). Todo lo que sea instrucción detallada o procedimiento va en Skills.

---

#### [NEW] [next-app/AGENTS.md](file:///c:/1/spinther/ursus/next-app/AGENTS.md)

Reglas específicas para el subdirectorio `next-app/`. El agente prioriza este archivo cuando trabaja dentro de `next-app/`. Contenido:

- **Stack**: Next.js 14, React 18, TypeScript, output estático (`export`)
- **Patrones del proyecto**: `"use client"` obligatorio en componentes con hooks, `src/lib/` para servicios
- **Importaciones Firebase**: siempre desde `firebase/*` (npm), nunca desde CDN
- **Estructura de componentes**: convenciones de nombres, ubicación de archivos
- **Estilos**: Vanilla CSS en `src/styles/globals.css`, sin Tailwind

---

### Skills (Progressive Disclosure — Bajo Demanda)

Cada skill se carga solo cuando el agente detecta que es relevante para la tarea actual.

---

#### [NEW] `.gemini/skills/firebase-deploy/SKILL.md`

| Campo | Valor |
|-------|-------|
| **Trigger** | "deploy", "desplegar", "publicar", "hosting" |
| **Acción** | Procedimiento paso a paso para build + deploy en Firebase Hosting |

Contenido del skill:
1. Verificar que `next-app/` compile sin errores (`npm run build`)
2. Verificar que `next-app/out/` se haya generado
3. Ejecutar `firebase deploy --only hosting`
4. Validar URL de producción
5. Fallback: reconstruir con `output: 'export'` si falla

---

#### [NEW] `.gemini/skills/firebase-ai-logic/SKILL.md`

| Campo | Valor |
|-------|-------|
| **Trigger** | "gemini", "AI", "generar texto", "generar imagen", "modelo", "prompt" |
| **Acción** | Guía para trabajar con Firebase AI Logic + Gemini 2.5 |

Contenido del skill:
1. Configuración del SDK (`getAI`, `getGenerativeModel`, `GoogleAIBackend`)
2. Modelos disponibles: `gemini-2.5-flash` (texto), `gemini-2.5-flash-image` (multimodal)
3. Patrones de streaming (`generateContentStream`) vs. respuesta completa
4. Manejo de `ResponseModality` para imágenes
5. Patrones de error y retry
6. Optimización de prompts para reducir tokens

---

#### [NEW] `.gemini/skills/data-connect/SKILL.md`

| Campo | Valor |
|-------|-------|
| **Trigger** | "firestore", "base de datos", "colección", "data connect", "guardar", "historial" |
| **Acción** | Guía para Firestore/Data Connect en el proyecto |

Contenido del skill:
1. Esquema actual: colección `generations` con campos `{prompt, type, result, createdAt}`
2. Helpers existentes: `saveGeneration()`, `fetchRecent()`
3. Patrones de queries optimizados (índices, paginación)
4. Convenciones de naming para colecciones/documentos

Con subdirectorio `references/schema.md` para documentación detallada del esquema.

---

#### [NEW] `.gemini/skills/nextjs-components/SKILL.md`

| Campo | Valor |
|-------|-------|
| **Trigger** | "componente", "página", "layout", "tab", "UI", "interfaz" |
| **Acción** | Guía para crear/modificar componentes Next.js en el proyecto |

Contenido del skill:
1. Componentes existentes: `Header`, `ImageGenerator`, `TextGenerator`, `TabSwitcher`, `Protected`
2. Template para nuevos componentes (con `"use client"`, typing, CSS modules)
3. Patrones de estado (AuthContext, hooks)
4. Estructura de rutas (App Router, `page.tsx`, `layout.tsx`)

---

#### [NEW] `.gemini/skills/security-rules/SKILL.md`

| Campo | Valor |
|-------|-------|
| **Trigger** | "reglas de seguridad", "security rules", "permisos", "firestore rules" |
| **Acción** | Guía para escribir y desplegar Firestore Security Rules |

Contenido del skill:
1. Patrones de reglas para la colección `generations` (solo usuarios autenticados)
2. Reglas para futuras colecciones
3. Testing de reglas con emulador
4. Deploy: `firebase deploy --only firestore:rules`

Con subdirectorio `references/patterns.md` para patrones comunes.

---

## Open Questions

> [!IMPORTANT]
> **¿Incluir Data Connect GraphQL?** El proyecto actualmente usa Firestore SDK directamente. ¿Deseas migrar a Firebase Data Connect (GraphQL) en el futuro? Esto afectaría el contenido del skill `data-connect`.

> [!IMPORTANT]
> **¿Agregar skill para Cloud Functions?** El proyecto no tiene `functions/` actualmente. ¿Planeas agregar Cloud Functions? Si es así, puedo incluir un skill dedicado.

> [!IMPORTANT]
> **¿Idioma del contenido agéntico?** Las instrucciones en AGENTS.md y SKILLs las escribiré en **inglés** (estándar de la industria para que el agente las procese de manera óptima con el mínimo de tokens). La UI y comentarios de código seguirán en español. ¿Estás de acuerdo?

---

## Verificación

### Validación Automática
- Verificar que todos los archivos se crean en las rutas correctas
- Confirmar que cada `SKILL.md` tiene frontmatter YAML válido con `name` y `description`
- Validar que `AGENTS.md` raíz es < 80 líneas (eficiencia de tokens)

### Validación Manual
- Iniciar una nueva conversación y verificar que el agente reconoce las reglas
- Solicitar una tarea cubierta por un skill (e.g., "despliega a hosting") y confirmar que el agente activa el skill correcto
- Verificar que el agente **no** carga skills irrelevantes para tareas simples
