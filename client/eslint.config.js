import js from '@eslint/js';
import globals from 'globals';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';
import eslintConfigPrettier from 'eslint-config-prettier';
import { version } from 'typescript';

export default tseslint.config(
	{ ignores: ['dist'] },
	{
		extends: [
			js.configs.recommended,
			reactPlugin.configs.flat.recommended,
			reactPlugin.configs.flat['jsx-runtime'],
			importPlugin.configs.flat,
			...tseslint.configs.recommended
		],
		files: ['**/*.{ts,tsx}'],
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser,
		},
		settings: {
			react: {
				version: 'detect',
			}
		},
		plugins: {
			'react-hooks': reactHooks,
			'react-refresh': reactRefresh,
		},
		rules: {
			...reactHooks.configs.recommended.rules,
			...eslintConfigPrettier.rules,
			quotes: ['error', 'single'],
			'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
			'react/jsx-max-props-per-line': ['error', { maximum: 3 }],
			'react/prop-types': 'off',
			'react/display-name': 'off',
		},
	},
);
