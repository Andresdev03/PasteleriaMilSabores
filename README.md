# Pastelería 1000 Sabores – Prototipo Evaluación 1

## Requerimientos

- Navegador moderno.
- VS Code o IntelliJ IDEA.
- Git 2.x.
- Cuenta GitHub.
- Live Server

## Ejecución

1. Abrir la carpeta en VS Code.
2. Ejecutar `index.html` con Live Server o:
   ```bash
   python3 -m http.server 5500
   ```
3. Abrir `http://localhost:5500`.

## Estructura

- `index.html`: inicio.
- `catalogo.html`: catálogo y carrito.
- `registro.html`: formulario.
- `css/styles.css`: estilos.
- `js/app.js`: lógica.
- `docs/ERS-v1.md`: requisitos.

## Git

```bash
git init
git add .
git commit -m "chore: crear estructura inicial del frontend"
git branch -M main
git remote add origin <URL>
git push -u origin main
```

## Funcionalidades

- HTML semántico.
- CSS externo.
- Catálogo, filtro y búsqueda.
- Carrito con localStorage.
- Validaciones JS en formulario.
- Descuentos por edad y código.