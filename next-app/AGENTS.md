# Reglas específicas para Next.js Frontend

## Stack
- **Framework**: Next.js 14 (export static)
- **React**: 18
- **Language**: TypeScript strict

## Patrón de proyecto
- `src/app/` para rutas (App Router)
- Componentes con `"use client"` cuando usen hooks
- Servicios en `src/lib/`
- Estilos globales en `src/styles/globals.css`

## Importaciones Firebase
- Siempre usar paquetes npm: `import { initializeApp } from "firebase/app";`
- Configuración central en `src/lib/firebase.ts`

## Convenciones de UI
- UI en español, código en inglés
- Componentes UI reutilizables en `src/components/`
- Utilizar CSS vanilla o CSS Modules, no Tailwind

> **Importante**: Mantener los archivos lo más concisos posible para reducir tokens.
