import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
	build: {
		outDir: './build',
	},
	server: {
		host: '0.0.0.0',
		port: 3000,
		watch: {
			usePolling: true,
		},
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
			'shared': '/src/shared',
			'entities': '/src/entities',
			'features': '/src/features',
			'widgets': '/src/widgets',
			'pages': '/src/pages',
		},
	},
});
