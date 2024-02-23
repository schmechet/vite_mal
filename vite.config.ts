import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy'
import svgLoader from 'vite-svg-loader'


// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [vue()],
// })

export default defineConfig({
  // Projekt root directory, in der muss die index.html sein
  root: "./",
  // Base public path für das asset handling
  base: "/",
  plugins: [vue()],
  // Definiert global const replacements, siehe vite-env.d.ts
  define: {
    __APP_VERSION__: JSON.stringify('v1.0.0')
  },
  // public directory ist für assets welche nie im code benutzt werden oder den exakten namen behalten müssen
  // alle assets in public können in dem Ordner benutzt werden ohne sie zu importieren
  // Absolute path wird für diese assets dan benutzt
  publicDir: "public",
  // Wo der cache gespeicher wird, pre-bundled dependencies oder andere cached
  cacheDir: "node_modules/.vite",
  css: {
    modules:{
      localsConvention: 'camelCase'
    }
  },
  // sorgt dafür das alle die dem pattern entsprechen als static assets behandelt werden.
  // import von js resolved die url, die date wird auch nicht ransformed
  assetsInclude: ['**/*.gltf'],
  envDir: "/",
  // single page, multi page oder custom 
  appType: "spa",

  server: {
    host: 'localhost',
    port: 1337,
    // öffnet den server bei start im browser, wenn ein string benutzt wird öffnet es die datei
    open: true,
    proxy: {
      '/swapi': {
        target: 'https://swapi.dev/api/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/swapi/, '')
      },
    },
    // falls man will, dass datein vorher gecached, warmed up werden und nicht erst bei aufruf der route
    warmup: {
      clientFiles: ['./src/components/*.vue']
    },
    // URL der assets während dev
    //origin: 'http://127.0.0.1:8080',
  },
  build: {
    target: ['modules'],
    outDir: "dist",
    assetsDir: "assets",
    cssCodeSplit: true,
    // default ist build.target
    cssTarget: ["modules"],
    cssMinify: true,
    //rollupOptions:
    // kann auch einstellen welcher minifier
    minify: true,
  },
  optimizeDeps: {
    // alle prebundler entries
    //entries: 
    // alles was nicht pre-gebundlet werden soll
    //exclude:
  }
})

//- command ist entweder server oder build
//- mode ist dev oder prod
/*
export default defineConfig(({ command, mode, isSsrBuild, isPreview }) => {
  if (command === 'serve') {
    return {
      plugins: [vue(), svgLoader()],
      // dev specific config
    }
  } else {
    // command === 'build'
    return {
      plugins: [vue(), legacy({
        targets: ['defaults', 'not IE 11']
      })]
      // build specific config
    }
  }
})
*/

/*
export default defineConfig(async ({ command, mode }) => {
  const data = await asyncFunction()
  return {
    // vite config
  }
})
*/

