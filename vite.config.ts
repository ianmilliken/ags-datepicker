import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import tsConfigPaths from 'vite-tsconfig-paths'
import fg from 'fast-glob'

const storyFiles = fg.sync('src/**/*.stories.tsx')

// https://vitejs.dev/config/
export default defineConfig((configEnv) => ({
    plugins: [
        react(),
        tsConfigPaths(),
        dts({
            include: ['./src/components']
        }),
    ],
    build: {
        lib: {
            entry: resolve(__dirname, 'src/components/index.ts'),
            name: 'AGSDatePicker',
            formats: ['es', 'umd'],
            fileName: (format) => `ags-datepicker.${format}.js`,
        },
    },
    rollupOptions: {
        external: ['react', 'react-dom', ...storyFiles],
        globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
        }
    }
}))
