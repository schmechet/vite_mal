# Vite

## Wieso Vite ?
https://vitejs.dev/guide/why
Kurzfassung:  DEV EXPERIENCE im Vordergrund
Bundling: Relikt von alten Zeiten in der es keine ES Modules gab. Größere Codebase bedeutet auch mehr Module 
-> mehr bundling -> längere zeit um einen dev server zu starten -> schlecht
Was macht Vite? Benutzt native ES modules und lässt den Browser arbeiten

## Was macht Vite besser
### Vite server startet schneller.
Das gelingt dadurch, dass Vite die Module in dependencies und Source code unterteilt.
1. Dependencies: plain JS welche sich nicht oft ändern. -> Pre-bundle mit esbuild
2. Source code: oft kein plain JS -> .vue, .jsx, .ts, .css-> müssen transformiert werden und werden häufig geändert.
    Zudem muss nicht jeder Source code geladen werden -> Route based code splitting
Vite served den source code über ESM.-> Vite muss nur den Code transformieren und source code auf abfrage servieren.
Sogar conditional dynamic imports werden nur gesendet wenn diese auf dem Bildschirm angezeigt werden.

### Schnellere Updates
Hot Module Replacement mit ESM -> nicht über den Bundler
Vite muss nur die Kette zwischen dem editierten Modul und der HMR boundary invalidieren
Dependencies werden strongly cached: cache-Control: max-age=31536000,immutable
Source code wird mit HTTP: 304 Modified requested ????

## Production
Production wird gebundelt -> weniger network roundtrips wegen nested imports -> bessere loading performance 
durch tree-shaking, lazy-loading, common-chunk splitting.
Bundle mit Rollup. Ist jedoch schon konfiguriert.


## Development Server
Wie bei einem static http server besitzt Vite einen root folder <root> über welchen er die Datein served.
Default <root> ist das aktuelle working directory
### Browser Support
Vite nimmt einen aktuellen/modernen Browser an welcher alle aktuellen JS und CSS features besitzt.
-> Kein syntax lowering also transpiling in alte js versionen
-> build supported browser mit ESModules alte können über ein Plugin supportet werden

# Features
## NPM Dependency Resolving
vite resolved die imports
z.B : 

``` ts
import { someMethod } from 'my-dep' 
```
1. Pre bundle mit esbuild
2. Verändere die import url zu 
*/node_modules/.vite/deps/my-dep.js?v=f3sf2ebd*

-> Strongly Cached
Wenn man dependencies verändern will (modifikation von Packages nicht Updates):
1. Brwoser cache deaktivieren
2. Vite neustarten mit --force um neu zu bundlen
3. Page reloaden?

## Hot Module Replacement
Vite hat eine eigene HMR API über native ESM. Welche es eralubt, dass framewors präzise updates ausführen kännen ohne die Seite neu zu laden und die application state zu verlieren.

Vite supported Vue Single File Components -> config: ```  plugins: [vue()],```

## Typescript support
Transpilation von typescript **kein** type checking.
Wieso?
Transpilation ist per-file -> Vites on-demand compile model. Type checking beötigt info über alle Module -> Schnelligkeit geht verloren.

Beim Build befehl werden die Types überprüft.

## CSS
Importieren von .css Datein in eine Komponente führt dazu, dass der Inhalt automatisch injected wird innerhalb eines style tags -> HMR Support.
Um das zu deaktivieren muss man **?inline** am ende vom Pfad hinzufügen.
```js
import './foo.css' // will be injected into the page
import otherStyles from './bar.css?inline' // will not be injected
```

Pre-processors wie SASS,less... werden unterstüzt.

### Modules
https://github.com/css-modules/css-modules

alle Datein mit .module.css werden als CSS Module erkannt.
CSS Module sind CSS welche nur einen lokalen Scope haben.

```css /* example.module.css */
.red {
  color: red;
}
```
```js
import classes from './example.module.css'
document.getElementById('foo').className = classes.red
```

## Static Assets
Static assets werden auch resolved und die Public url wird geserved.

Das coole ist das es spezielle Querys gibt die modifizieren wie die assets geladen werden.

```js
// Explicitly load assets as URL
import assetAsURL from './asset.js?url'
// Load assets as strings
import assetAsString from './shader.glsl?raw'
// Load Web Workers
import Worker from './worker.js?worker'
// Web Workers inlined as base64 strings at build time
import InlineWorker from './worker.js?worker&inline'
```

## Build Optimizations
1. CSS Code Splitting, extrahieren der benutzen css des modules in einen async chunk. Nachem der async chunk geladen ist
2. Async Chunk Loading Optimization
Wenn Async Chunk A angefragt wird und Async Chunk C gebraucht wird für a dann sorgt vite dafür dass a mit c parallel gefetch wird.

# Config
Vite hat schon viel voreingestellt, weshalb die Startkonfig nur ein plugin beinhaltet.
```js
export default defineConfig
```
defineConfig ist ein helper damit die IDE intellisense in der config nutzen kann.
## conditional
Man kann die Config so schreiben, dass sie in verschiedenen situationen verschiedene befehle ausführt.
Entweder nach command oder mode. Mode ist interessant, weil hier noch custom modes festgelegt werden können.
```bash
vite build --mode staging
```
Mit **--** kann der default mode überschrieben werden
Die Modes sorgen dafür, dass verschiedene env variablen benutzt werden, z.B .env.production, .env.staging....

# CLI
npm run dev (or vite) starts a local web server with HMR for development

npm run build (or vite build) builds the project, and outputs to the folder ./dist

npm run preview (or vite preview) start a local web server that serves the built solution from ./dist for previewing