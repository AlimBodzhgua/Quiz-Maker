import antfu from '@antfu/eslint-config';

export default antfu({
	typescript: true,
	jsonc: false,
	yaml: false,

	rules: {
		'antfu/top-level-function': 'off',
		'ts/consistent-type-definitions': 'off',
		'node/prefer-global/process': 'off',

		'style/no-tabs': 'off',
		'style/arrow-parens': ['error', 'always'],
		'style/jsx-quotes': ['error', 'prefer-single'],
		'style/jsx-indent-props': ['error', 'tab'],
		'style/indent': ['off', 'tab'],
		'style/indent-binary-ops': ['off', 'tab'],
		'style/brace-style': ['error', '1tbs', { allowSingleLine: true }],

		'perfectionist/sort-named-imports': ['warn', {
			type: 'alphabetical',
		}],
		'perfectionist/sort-named-exports': ['warn', {
			type: 'alphabetical',
		}],
	},
	stylistic: {
		semi: true,
	},
});
