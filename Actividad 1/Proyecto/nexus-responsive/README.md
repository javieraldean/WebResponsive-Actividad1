# Nexus — Módulo de Librería Online

**Asignatura:** Diseño y Desarrollo Web Responsive
**Actividad:** Actividad 1 — Interfaces Responsive con Flexbox
**Modalidad:** Trabajo grupal

---

## Integrantes del grupo

| Nombre | Responsabilidades |
|---|---|
| **Walter Javier Aldean Morales** | Estructura general del diseño: explicación de cómo se han organizado las vistas con Flexbox, incluyendo el enfoque mobile first. |
| **Julio Fernando Tinoco Britho** | Componentes clave: demostración de la implementación del menú responsive y del componente card-libro, mostrando su reutilización y adaptabilidad. |
| **Stteffano Aguayo Caseres** | Comportamiento responsive: evidencias del correcto funcionamiento del diseño en distintos dispositivos (móvil, tablet, escritorio). |

---

## Descripción del proyecto

Nexus es una librería universitaria con espacio de coworking y cafetería ubicada en Aranjuez, junto al campus universitario. Este proyecto implementa el módulo de **librería online** de su aplicación web: un catálogo de libros adaptado a dispositivos móviles, tablets y escritorio.

La interfaz permite explorar el catálogo, consultar el detalle de cada libro y gestionar un carrito de compra con persistencia local.

---

## Objetivos de la actividad

- Aplicar principios de diseño responsive con **CSS Flexbox**
- Estructurar y alinear interfaces adaptativas en distintos tamaños de pantalla
- Implementar el enfoque **Mobile First**
- Reutilizar el componente `card-libro` en distintos contextos visuales
- Trabajar en equipo repartiendo responsabilidades de maquetación

---

## Tecnologías utilizadas

- **HTML5** — Estructura semántica
- **CSS3 — Flexbox** — Maquetación y diseño responsive (sin frameworks)
- **JavaScript Vanilla** — Interactividad y consumo de API
- **API REST mock** (apidog) — Simulación de datos de libros
- **localStorage** — Persistencia del carrito de compra

> No se ha utilizado ningún framework CSS (Bootstrap, Tailwind, etc.), en cumplimiento de los requisitos de la actividad.

---

## Vistas implementadas

| Vista | Archivo | Descripción |
|---|---|---|
| Landing Page | `index.html` | Presentación de la librería, hero con CTA y libros destacados |
| Catálogo | `catalogo.html` | Grid de tarjetas con filtros por búsqueda, categoría y precio |
| Detalle del libro | `detalle.html` | Información completa del libro, botones Comprar / Reservar y libros relacionados |
| Carrito | `carrito.html` | Listado de libros añadidos, resumen del pedido y reservas realizadas |

---

## Diseño responsive — Mobile First

| Breakpoint | Tamaño | Comportamiento |
|---|---|---|
| Mobile | Base (< 768px) | Columna única, menú hamburguesa |
| Tablet | ≥ 768px | Grid de 2 columnas, nav horizontal, footer 2 columnas |
| Desktop | ≥ 1024px | Grid de 3 columnas, footer 4 columnas, resumen del carrito sticky |

---

## Arquitectura del proyecto

```
nexus-responsive/
├── index.html
├── catalogo.html
├── detalle.html
├── carrito.html
├── css/
│   ├── reset.css        # Normalización
│   ├── variables.css    # Tokens de diseño (colores, espaciado, radios)
│   ├── base.css         # Tipografía y estilos globales
│   ├── layout.css       # Header, hero, footer, contenedor principal
│   ├── components.css   # book-card, botones, toasts, estados de carga
│   ├── pages.css        # Estilos específicos por página
│   └── responsive.css   # Media queries (768px · 1024px)
├── js/
│   ├── config.js        # URL y token de la API
│   ├── api.js           # Llamadas a la API mock
│   ├── storage.js       # Gestión del carrito en localStorage
│   ├── ui.js            # Renderizado de tarjetas y utilidades UI
│   ├── main.js          # Inicialización global (menú, destacados, toast)
│   ├── catalogo.js      # Lógica de filtros y listado del catálogo
│   ├── detalle.js       # Carga y renderizado del detalle del libro
│   └── carrito.js       # Gestión y visualización del carrito
├── assets/
│   ├── img/books/       # Portadas de libros
│   ├── img/hero/        # Imágenes del hero
│   ├── img/icons/       # Iconos SVG
│   └── img/logo/        # Favicon y logo
└── docs/
    ├── reparto-tareas.md
    ├── memoria-tecnica.md
    └── guion-videomemoria.md
```

---

## Componente card-libro

El componente `.book-card` es el bloque reutilizable central de la actividad. Aparece en tres contextos:
- **Inicio:** sección de libros destacados (máximo 3, en fila desde tablet)
- **Catálogo:** grid completo con filtros aplicados
- **Detalle:** sección "También te puede interesar"

Implementado íntegramente con Flexbox (`flex-direction: column`, acciones con `margin-top: auto`).

---

## Accesibilidad

- Estructura semántica HTML5 (`header`, `main`, `nav`, `footer`, `article`, `aside`)
- Atributos `alt` descriptivos en todas las imágenes
- `aria-label` en navegación, botones y enlaces de iconos
- `aria-expanded` en el botón del menú hamburguesa
- Foco visible en elementos interactivos

