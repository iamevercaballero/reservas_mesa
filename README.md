
# TP Reservas de Restaurante

Aplicación frontend para la **gestión de reservas de mesas en restaurantes**, desarrollada como Trabajo Práctico de Frontend.

Permite administrar:

- Restaurantes  
- Zonas por restaurante  
- Mesas por zona  
- Horarios por zona  
- Registro de reservas (con asignación automática de mesa)  
- Listado y filtros de reservas (restaurante, zona y fecha)

El proyecto está desarrollado con **Angular 19** y almacena los datos en **LocalStorage**, por lo que no requiere backend para ejecutarse.

##  Prerrequisitos
Antes de ejecutar el proyecto, asegurate de tener instalado:

1. **Node.js** (recomendado: versión 20.x LTS o superior)  
    Descargar desde: https://nodejs.org

2. **npm** (se instala junto con Node)  
   - Ver versión instalada:
     ```bash
     npm -v
     ```

3. **Angular CLI** (versión 19.x)
   - Instalar de forma global:
     ```bash
     npm install -g @angular/cli@19
     ```
   - Verificar instalación:
     ```bash
     ng version
     ```
4. **Levantar el servidor de desarrollo:**
    ```bash
     ng ng serve -o
     ```


## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
