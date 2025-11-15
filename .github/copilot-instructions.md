## Repo snapshot

- Framework: Angular 19 (standalone-component style using bootstrapApplication).
- SSR: @angular/ssr with an Express adapter implemented in `src/server.ts`.
- Build outputs: `dist/tp-reservas-restaurante` (see `angular.json` -> `outputPath`).

## What an AI agent needs to know (concise)

1. Big picture
   - This is a client app built with Angular 19 and optionally served via server-side rendering (SSR).
   - Dev workflow: `ng serve` (package.json `start`) runs the client dev server.
   - Production SSR: app uses `src/main.server.ts` (server bootstrap) and `src/server.ts` (Express handler). After building the app, the server can be launched with `npm run serve:ssr:tp-reservas-restaurante` (this expects the compiled server bundle in `dist/tp-reservas-restaurante/server`).

2. Key files to edit and why
   - `src/app/app.config.ts` — client ApplicationConfig providers (routing, hydration, zone strategy). Prefer adding client-only providers here.
   - `src/app/app.config.server.ts` — server-side providers (server rendering + server routing). Merge server-side changes here.
   - `src/server.ts` — Express entry for SSR and a place to add REST endpoints for `/api/**` if needed. Static assets are served from `dist/.../browser`.
   - `src/main.server.ts` — server-side bootstrap used by the Angular SSR builder.
   - `angular.json` — inspect `architect.build.options` for `server`, `ssr.entry`, and `outputPath` when changing build flows.
   - `package.json` — use the provided npm scripts: `start` (dev), `build` (client build), `test` (Karma), `serve:ssr:tp-reservas-restaurante` (run SSR bundle).

3. Project-specific conventions and patterns
   - Standalone components: the app uses `bootstrapApplication(AppComponent, config)`, not NgModules. Add providers via `appConfig` rather than NgModule providers.
   - Hydration is enabled for the client: `provideClientHydration(withEventReplay())` in `app.config.ts`.
   - Server routing is minimal and pre-renders all routes: `src/app/app.routes.server.ts` contains a wildcard `RenderMode.Prerender` route.
   - Style language: SCSS (see `angular.json` and component default schematic).
   - Assets: static files are pulled from the project `public/` directory as configured in `angular.json`.

4. Data shapes and examples (use these when generating code/tests)
   - `src/app/models/restaurant.model.ts` defines:
     ```ts
     export interface Restaurant { id: number; nombre: string; }
     ```
   - `src/app/models/zone.model.ts` is currently empty—when adding zones, follow the simple TS interface pattern used for `Restaurant`.

5. Build / test / debug quick reference
   - Dev client: `ng serve` (or `npm start`) — serves at http://localhost:4200.
   - Build client: `ng build` (produces `dist/tp-reservas-restaurante/browser` by default for the browser bundle).
   - Unit tests: `ng test` (Karma).
   - Run compiled SSR server (after building appropriate server bundle): `npm run serve:ssr:tp-reservas-restaurante` — this script executes `node dist/tp-reservas-restaurante/server/server.mjs`.
   - Debugging SSR: inspect `src/server.ts` for how the Express app is constructed; it exports `reqHandler` for hosting environments.

6. Integration & external dependencies to be aware of
   - `@angular/ssr` + `@angular/platform-server` used for SSR.
   - `express` used for the server host; add `@types/express` types if you change server code.
   - Karma/Jasmine for unit tests.

7. Safe editing guidelines for AI agents
   - Prefer changes in `app.config.ts` / `app.config.server.ts` for provider-level changes.
   - When adding server REST endpoints, add under the `app.get('/api/**', ...)` area in `src/server.ts` (follow the file's commenting pattern).
   - Avoid changing `angular.json` output paths unless necessary—document the change in the PR.
   - If you add runtime environment variables for the server, follow current pattern: `process.env['PORT'] || 4000`.

8. Examples to cite in PRs or generated code
   - To add a new provider for server-only telemetry, put it in `src/app/app.config.server.ts` and merge via `mergeApplicationConfig`.
   - To add an API route for restaurants, add e.g. `app.get('/api/restaurants', (req, res) => { ... })` in `src/server.ts` and update any client fetch URL accordingly.

If something here is unclear or you want more detail (for example, exact SSR build steps used in CI), tell me which area and I will expand or adapt these instructions. 
