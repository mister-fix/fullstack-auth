import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
	root: './',
	plugins: [react()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src/*'),
			'@/assets/*': path.resolve(__dirname, './src/assets/*'),
			'@/components/*': path.resolve(__dirname, './src/components/*'),
		},
	},
	base: './', // Ensures assets load correctly
	build: {
		cssCodeSplit: false,
		sourcemap: false,
		manifest: true,
		outDir: './dist',
		rollupOptions: {
			input: './index.html',
		},
	},
});
