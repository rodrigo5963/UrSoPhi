# Reglas Constitucionales del Proyecto UrsoPhi

## Identidad del proyecto
- **Nombre**: UrsoPhi
- **Stack Tecnológico**: Next.js 14 (SSG), Firebase AI (Gemini 2.5 Flash), Firestore, Data Connect, Firebase App Hosting, Firebase Storage, Firebase Auth
- **Proyecto Firebase**: `ursophi`

## Convenciones de Código
- **Lenguaje**: TypeScript estricto en `next-app/`
- **Módulos**: ES Modules en la raíz
- **Comentarios/UI**: Español

## Estructura de Directorios
```
ursus/
├── AGENTS.md                 # Reglas constitucionales (este archivo)
├── .gemini/skills/…          # Skills compartidos
├── next-app/                 # Aplicación Next.js
└── ...
```

## Reglas de Seguridad
- Nunca exponer secrets en el código.
- Usar `.env.local` para variables de entorno.

## Modelo de Referencia
- Usar siempre `gemini-2.5-flash` como modelo base.

## Principios de Eficiencia
- Diffs mínimos, no regenerar archivos completos.
- Componentes y lógica modular.

> **Importante**: Este archivo se mantiene deliberadamente conciso (<80 líneas). Instrucciones detalladas se delegan a los Skills.
