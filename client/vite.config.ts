import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		outDir: './build',
	},
	plugins: [
		react(),
		svgr({
			include: '**/*.svg',
			svgrOptions: {
				exportType: 'default',
			},
		}),
	],
	resolve: {
		alias: {
			'@': '/src',
			shared: '/src/shared',
			entities: '/src/entities',
			features: '/src/features',
			widgets: '/src/widgets',
			pages: '/src/pages',
		},
	},
});
