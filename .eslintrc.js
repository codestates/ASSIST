export default {
	'env': {
		'browser': true,
		'es2021': true,
		'node': true
	},
	'extends': [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:react-hooks/recommended',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:@typescript-eslint/recommended-requiring-type-checking',
	],
	'parser': '@typescript-eslint/parser',
	'parserOptions': {
		'ecmaFeatures': {
			'jsx': true
		},
		'ecmaVersion': 13,
		'sourceType': 'module',
		'project': './tsconfig.json',
	},
	'plugins': [
		'react', 'react-hooks', '@typescript-eslint', 'prettier'
	],
	'rules': {
		'indent': [
			'error', 2, { 'SwitchCase': 1 }
		],
		'linebreak-style': [
			'error',
			'unix'
		],
		'quotes': [
			'error', 'single', { 'avoidEscape': true }
		],
		'semi': [
			'error',
			'always'
		],
		'no-empty-function': 'off',
		'@typescript-eslint/no-empty-function': 'off',
		'react/display-name': 'off',
		'react/prop-types': 'off',
		'prettier/prettier': 'error'
	},
	'settings': {
		'react': {
			'version': 'detect',
		},
	},
};
