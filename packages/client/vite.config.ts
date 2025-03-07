import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src/*'),
			'@/assets/*': path.resolve(__dirname, './src/assets/*'),
			'@/components/*': path.resolve(__dirname, './src/components/*'),
		},
	},
	build: {
		cssCodeSplit: true,
		sourcemap: false,
		manifest: false,
	},
});
