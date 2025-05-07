import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],

    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@components': path.resolve(__dirname, 'src/components'),
            '@pages': path.resolve(__dirname, 'src/pages'),
            '@styles': path.resolve(__dirname, 'src/assets/styles'),
            '@icons': path.resolve(__dirname, 'src/assets/icons'),
            '@services': path.resolve(__dirname, 'src/services'),
            '@contexts': path.resolve(__dirname, 'src/contexts'),
            '@layouts': path.resolve(__dirname, 'src/layouts'),
            '@clients': path.resolve(__dirname, 'src/clients'),
            '@containers': path.resolve(__dirname, 'src/containers'),
            '@hooks': path.resolve(__dirname, 'src/hooks'),
            '@stores': path.resolve(__dirname, 'src/stores')
        }
    }
});
