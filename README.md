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

## Estructura del proyecto
```
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
```

## Ejecutar pruebas
En modo secuencial (recomendado para mayor estabilidad):
```
npx playwright test --workers=1
```
También
```
npx playwright test 
```

* En navegadores especificos:
```
npx playwright test --project=chromium
npx playwright test --project=firefox
```
* En archivos especificos:
```
npx playwright test tests/e2e/login-validation.spec.js
```

## Ver reporte de pruebas:
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

----
# E2E Automation with Playwright

This project contains end-to-end automated tests for the Sauce Demo web application using Playwright.

## Prerequisites

* Node.js (version 14 or higher)  
* NPM (Node Package Manager)  
* Supported browsers (Chrome and Firefox)

## Installation

1. Clone the repository:
```
git clone <repository-url>
```

## Project Structure
```
Automation_E2E/
├── pages/                  # Page Objects
│   ├── loginPage.js        # Login page
│   ├── inventoryPage.js    # Inventory page
│   ├── cartPage.js         # Cart page
│   └── checkoutPage.js     # Checkout page
├── tests/                  # Test files
│   ├── e2e/                # End-to-end tests
│   │   ├── login-validation.spec.js
│   │   ├── successful-purchase.spec.js
│   │   └── alternate-scenarios.spec.js
│   └── fixtures/           # Test data
│       ├── loginFixture.js
│       └── testDataFixture.js
├── playwright.config.js    # Playwright configuration
└── README.md               # Project documentation
```

## Running Tests
Sequential mode (recommended for higher stability):
```
npx playwright test --workers=1
```
Also:
```
npx playwright test
```

* On specific browsers:
```
npx playwright test --project=chromium
npx playwright test --project=firefox
```

* On specific files:
```
npx playwright test tests/e2e/login-validation.spec.js
```

## View Test Report:
```
npx playwright show-report
```

## Technologies Used

* Playwright: Automated testing framework  
* JavaScript: Programming language used  
* Node.js: JavaScript runtime environment

## Key Features

* Implementation of the Page Object Model (POM) pattern  
* Cross-browser testing (Chrome and Firefox)  
* Test data management using fixtures  
* Detailed execution reports  
* Screenshots and videos on test failures  
* Sequential execution for better stability

## Contributions
Contributions, issues, and feature requests are welcome! Feel free to fork this repository and submit a pull request.

---
Developed with ❤️ by **Alejandra Villa Posada**
