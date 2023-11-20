import {defineConfig, rollupVersion} from 'vite'
import react from '@vitejs/plugin-react-swc'
import {resolve} from 'path'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, 'index.ts'),
            name: 'react-element-transition',
            fileName: (format) => `index.${format}.js`
        },
        rollupOptions: {
            external: ['react', 'react-dom'],
            output: {
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDom'
                }
            }
        },
        sourcemap: true,
        emptyOutDir: true,
    },
    plugins: [react(), dts()],
})
