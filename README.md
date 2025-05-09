## Automatización E2E con Playwright

Este proyecto contiene pruebas automatizadas end-to-end para la aplicación web Sauce Demo utilizando Playwright.

## Pre-requisitos

* Node.js (versión 14 o superior)
* NPM (Node Package Manager)
* Navegadores soportados (Chrome y Firefox)

## Instalación

1. Clonar el repositorio:
```
git clone <url-del-repositorio>
```

## Ejecutar las pruebas:
```
npx playwright test
```

## Estructura del proyecto
Automation_E2E/
├── pages/                  # Page Objects (Objetos de página)
│   ├── loginPage.js        # Página de inicio de sesión
│   ├── inventoryPage.js    # Página de inventario
│   ├── cartPage.js         # Página del carrito
│   └── checkoutPage.js     # Página de checkout
├── tests/                  # Archivos de prueba
│   ├── e2e/                # Pruebas end-to-end
│   │   ├── login-validation.spec.js
│   │   ├── successful-purchase.spec.js
│   │   └── alternate-scenarios.spec.js
│   └── fixtures/           # Datos de prueba
│       ├── loginFixture.js
│       └── testDataFixture.js
├── playwright.config.js    # Configuración de Playwright
└── README.md               # Documentación del proyecto

## Ejecutar las pruebas
En modo secuencial (recomendado para mayor estabilidad):
```
npx playwright test --workers=1
```

# En navegadores especificos:
```
npx playwright test --project=chromium
npx playwright test --project=firefox
```
# En archivos especificos:
```
npx playwright test tests/e2e/login-validation.spec.js
```

# Ver reporte de pruebas:
```
npx playwright show-report
```

## Tecnologías utilizadas
* Playwright: Framework de pruebas automatizadas.
* JavaScript: Lenguaje de programación utilizado.
* Node.js: Entorno de ejecución para JavaScript.

## Características Principales
* Implementación del patrón Page Object Model (POM)
* Pruebas cross-browser (Chrome y Firefox)
* Manejo de datos de prueba mediante fixtures
* Reportes detallados de ejecución
* Capturas de pantalla y videos en caso de fallos
* Ejecución secuencial para mayor estabilidad