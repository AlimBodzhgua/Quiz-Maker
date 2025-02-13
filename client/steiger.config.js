import { defineConfig } from 'steiger';
import fsd from '@feature-sliced/steiger-plugin';

export default defineConfig([
	...fsd.configs.recommended,
	{
		// disable the `public-api` rule for files in the Shared layer
		files: ['./src/shared/**'],
		rules: {
			'fsd/public-api': 'off',
		},
	},
	{
		files: ['./src/*/**'],
		rules: {
			// allow slices that have just one reference
			'fsd/insignificant-slice': 'off',
			'fsd/segments-by-purpose': 'off',
		}
	}
]);
