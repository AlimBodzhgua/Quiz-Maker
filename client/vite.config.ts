import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		outDir: './build',
	},
	plugins: [react()],
	resolve: {
		alias: {
			src: '/src',
			pages: '/src/pages',
			components: '/src/components',
			types: '/src/types',
			styles: '/src/styles',
			store: '/src/store',
		},
	},
});
