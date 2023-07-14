import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import tsConfigPaths from 'vite-tsconfig-paths'

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
            entry: resolve('src', 'components/index.ts'),
            name: 'AGS DatePicker',
            formats: ['es', 'umd'],
            fileName: (format) => `ags-datepicker.${format}.js`,
        },
    },
}))
