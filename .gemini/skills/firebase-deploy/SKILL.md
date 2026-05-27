---
name: Firebase Deploy
description: Skill to build and deploy Next.js app to Firebase Hosting
---

| Campo | Valor |
|-------|-------|
| **Trigger** | "deploy", "desplegar", "publicar", "hosting" |
| **Acción** | Procedimiento paso a paso para build + deploy en Firebase Hosting |

**Contenido del skill:**
1. Verificar que `next-app/` compile sin errores (`npm run build`)
2. Verificar que `next-app/out/` se haya generado
3. Ejecutar `firebase deploy --only hosting`
4. Validar URL de producción
5. Fallback: reconstruir con `output: 'export'` si falla
