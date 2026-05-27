---
name: Security Rules
description: Skill to write and deploy Firestore security rules for the project
---

| Campo | Valor |
|-------|-------|
| **Trigger** | "reglas de seguridad", "security rules", "permisos", "firestore rules" |
| **Acción** | Guía para escribir y desplegar Firestore Security Rules |

**Contenido del skill:**
1. Reglas para la colección `generations` (solo usuarios autenticados)
2. Plantilla básica de reglas con `allow read, write: if request.auth != null;`
3. Extensión a futuras colecciones y campos sensibles
4. Testing de reglas con el emulador local (`firebase emulators:start --only firestore`)
5. Deploy de reglas: `firebase deploy --only firestore:rules`

> Referencia de patrones: see `references/patterns.md`
