# Patrones comunes de reglas de seguridad

## Regla básica de autenticación
```javascript
service cloud.firestore {
  match /databases/{database}/documents {
    // Solo usuarios autenticados pueden leer y escribir
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## Regla específica para la colección `generations`
```javascript
match /generations/{docId} {
  allow read, write: if request.auth != null && request.resource.data.keys().hasAll(['prompt', 'type', 'result', 'createdAt']);
}
```

## Uso de variables de entorno en reglas
- Nunca incluir claves secretas directamente.
- Referenciar configuraciones mediante `functions.config()` cuando se usen funciones.

> **Consejo**: Mantener las reglas lo más simples posible para reducir tokens y evitar errores de compilación.
