Aquí tienes el contenido listo para copiar y pegar en tu archivo README.md:

# Pruebas de ParaBank con Playwright + Cucumber
Este proyecto contiene la suite de pruebas automatizadas para el portal ParaBank, implementada con Playwright y Cucumber (Gherkin).

## Prerrequisitos
- **Node.js** v16 o superior  
- **npm** (incluido con Node.js)  
- **Chromium** (Playwright lo instala automáticamente)  

## Instalación
1. Clona el repositorio:
   ```bash
   git clone https://github.com/aaamundial/casoguayaquil.git
   cd casoguayaquil
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Instala los navegadores de Playwright:
   ```bash
   npx playwright install
   ```

## Ejecución de pruebas
Modo interactivo (ver el navegador):
```bash
npm test
```

Modo headless (sin GUI, útil para CI):
```bash
npm run test:headless
```

## Generación de reportes
Cucumber volcará dos archivos en `reports/`:
- `report.json`
- `index.html`

Para generar un reporte HTML más completo:
```bash
npm run report
```

El resultado se guardará en `reports/index.html`.
Ábrelo en tu navegador (doble clic) o con:
```bash
# macOS/Linux
open reports/index.html
# Windows (PowerShell)
start reports\index.html
```

## Estructura del proyecto
```
casoguayaquil/
├── features/           # Especificaciones Gherkin (.feature)
├── pages/              # Page Objects
├── steps/              # Definición de steps y hooks
├── scripts/            # Scripts auxiliares (p.ej. generación de reportes)
├── reports/            # Salida de Cucumber y reportes HTML/JSON
├── cucumber.js         # Configuración de Cucumber
├── package.json        # Dependencias y scripts npm
├── .gitignore
└── README.md           # Este archivo
```

## .gitignore
```
node_modules/
reports/
.env
```