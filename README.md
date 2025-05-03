Pruebas de ParaBank con Playwright + Cucumber
Este proyecto contiene la suite de pruebas automatizadas para el portal ParaBank, implementada con Playwright y Cucumber (Gherkin).

Prerrequisitos
Node.js v16 o superior

npm (incluido con Node.js)

Chromium (Playwright lo instala automáticamente)

Instalación
Clona el repositorio (o descomprime el zip):

bash
Copiar
Editar
git clone <tu-repo-url>
cd casoguayaquil
Instala las dependencias:

bash
Copiar
Editar
npm install
Instala los navegadores de Playwright:

bash
Copiar
Editar
npx playwright install
Ejecución de pruebas
Modo interactivo (ver el navegador):

bash
Copiar
Editar
npm test
Modo headless (sin GUI, útil para CI):

bash
Copiar
Editar
npm run test:headless
Generación de reportes
Cucumber volcará dos archivos en reports/:

report.json

report.html

Para generar un reporte HTML más completo, ejecuta:

bash
Copiar
Editar
npm run report
El resultado se guardará en reports/index.html. Ábrelo con tu navegador:

bash
Copiar
Editar
open reports/index.html
Estructura del proyecto
bash
Copiar
Editar
casoguayaquil/
├── features/           # Especificaciones Gherkin (.feature)
├── pages/              # Page Objects
├── steps/              # Definición de steps y hooks
├── scripts/            # Scripts auxiliares (p.ej. generación de reportes)
├── reports/            # Salida de Cucumber y reportes HTML
├── cucumber.js         # Configuración de Cucumber
├── package.json        # Dependencias y scripts npm
├── .gitignore
└── README.md           # Este archivo
.gitignore
bash
Copiar
Editar
node_modules/
reports/
.env
¡Listo! Con estos pasos ya puedes clonar el proyecto, instalar dependencias, ejecutar todas las pruebas y generar reportes detallados.
