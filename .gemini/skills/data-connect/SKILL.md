---
name: Data Connect
description: Skill for Firestore/Data Connect operations in the project
---

| Campo | Valor |
|-------|-------|
| **Trigger** | "firestore", "base de datos", "colección", "data connect", "guardar", "historial" |
| **Acción** | Guía para Firestore/Data Connect en el proyecto |

**Contenido del skill:**
1. Esquema actual: colección `generations` con campos `{prompt, type, result, createdAt}`
2. Helpers existentes: `saveGeneration()`, `fetchRecent()`
3. Patrones de queries optimizados (índices, paginación)
4. Convenciones de naming para colecciones/documentos

> Referencia de esquema: see `references/schema.md`
