#!/bin/bash

# Nombre del proyecto
PROJECT_NAME="nexus-responsive"

echo "Creando estructura del proyecto: $PROJECT_NAME"

# Crear carpeta raíz
mkdir -p $PROJECT_NAME
cd $PROJECT_NAME

# Crear HTML principales
touch index.html catalogo.html detalle.html carrito.html README.md

# Crear carpetas CSS
mkdir -p css
touch css/reset.css
touch css/variables.css
touch css/base.css
touch css/layout.css
touch css/components.css
touch css/pages.css
touch css/responsive.css

# Crear carpetas JS
mkdir -p js
touch js/config.js
touch js/api.js
touch js/storage.js
touch js/ui.js
touch js/main.js
touch js/catalogo.js
touch js/detalle.js
touch js/carrito.js

# Crear assets
mkdir -p assets/img/logo
mkdir -p assets/img/hero
mkdir -p assets/img/books
mkdir -p assets/img/icons

# Crear docs
mkdir -p docs
touch docs/memoria-tecnica.md
touch docs/reparto-tareas.md
touch docs/guion-videomemoria.md

echo "Estructura creada correctamente"