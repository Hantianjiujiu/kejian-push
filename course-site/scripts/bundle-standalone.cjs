/**
 * Bundle the entire course site into a single standalone HTML file.
 *
 * Steps:
 * 1. Build with Vite (generates CSS with Tailwind support)
 * 2. Bundle JS with esbuild (includes all React components + 35 lesson markdowns)
 * 3. Combine CSS + JS into a single HTML file
 * 4. Fix esbuild regex compatibility issue using Python
 *
 * Run: node scripts/bundle-standalone.cjs
 * Output: dist/standalone.html (completely self-contained, no server needed)
 */
const { readFileSync, writeFileSync, mkdirSync, rmSync, readdirSync } = require('fs')
const { resolve } = require('path')
const { execSync } = require('child_process')

const DIST_DIR = resolve(__dirname, '../dist')
const TMP_DIR = resolve(DIST_DIR, 'tmp')

// Clean and create temp dir
rmSync(TMP_DIR, { recursive: true, force: true })
mkdirSync(TMP_DIR, { recursive: true })

console.log('=== Step 1: Build with Vite (generates CSS) ===')
execSync('npm run build', { cwd: resolve(__dirname, '..'), stdio: 'inherit' })

// Read generated CSS
const cssFiles = readdirSync(resolve(DIST_DIR, 'assets')).filter(f => f.endsWith('.css'))
const CSS = readFileSync(resolve(DIST_DIR, 'assets', cssFiles[0]), 'utf-8')

console.log('\n=== Step 2: Bundle JS with esbuild ===')
const ENTRY = resolve(__dirname, '../src/main.tsx')
const esbuildCmd = `npx esbuild "${ENTRY}" --bundle --outfile="${resolve(TMP_DIR, 'bundle.js')}" --format=iife --target=es2018 --global-name=CourseApp --jsx=automatic --packages=bundle --external:tailwindcss`
execSync(esbuildCmd, { stdio: 'inherit' })

console.log('\n=== Step 3: Create standalone HTML ===')
const TEMPLATE = readFileSync(resolve(__dirname, '../index.html'), 'utf-8')
const BUNDLE = readFileSync(resolve(TMP_DIR, 'bundle.js'), 'utf-8')

let html = TEMPLATE
  .replace(/<script[^>]*src="[^"]*"><\/script>/, '')
  .replace('</head>', `<style>\n${CSS}\n</style>\n</head>`)
  .replace('</body>', `<script>\n${BUNDLE}\n</script>\n</body>`)

console.log('\n=== Step 4: Fix regex compatibility ===')
const OUTPUT = resolve(DIST_DIR, 'standalone.html')
writeFileSync(OUTPUT, html, 'utf-8')

// Use the dedicated fix-regex.py script (handles string escaping properly)
execSync(`python "${resolve(__dirname, 'fix-regex.py')}" "${OUTPUT}"`, { stdio: 'inherit' })

// Cleanup
rmSync(TMP_DIR, { recursive: true, force: true })

const finalSize = Buffer.byteLength(readFileSync(OUTPUT, 'utf-8'))

console.log(`\n✅ Standalone HTML: ${OUTPUT}`)
console.log(`Size: ${(finalSize / 1024).toFixed(0)} KB`)
console.log('\n📦 Double-click dist/standalone.html to view the course!')
console.log('   No server needed. Works offline.')
