# Esquema de datos para la colección `generations`

```json
{
  "prompt": "string",
  "type": "string",
  "result": "any",
  "createdAt": "timestamp"
}
```

- `prompt`: texto del comando del usuario.
- `type`: tipo de generación (`text`, `image`).
- `result`: contenido generado (texto o URL de imagen).
- `createdAt`: marca de tiempo del registro.
