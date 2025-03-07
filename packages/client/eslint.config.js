import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
	{ ignores: ['dist', 'node_modules'] },
	{
		extends: [
			js.configs.recommended,
			...tseslint.configs.recommended,
			...tseslint.configs.stylistic,
		],
		files: ['**/*.{ts,tsx}'],
		languageOptions: {
			sourceType: 'module',
			ecmaVersion: 'latest',
			parser: tseslint.parser,
			parserOptions: {
				ecmaVersion: 'latest',
				sourceType: 'module',
				tsConfigRootDir: './',
			},
			globals: { ...globals.browser, ...globals.node, ...globals.es2021 },
		},
		plugins: {
			'react-hooks': reactHooks,
			'react-refresh': reactRefresh,
			'@typescript-eslint': tseslint.plugin,
			prettier: eslintPluginPrettier,
		},
		rules: {
			...reactHooks.configs.recommended.rules,
			'react-refresh/only-export-components': [
				'warn',
				{ allowConstantExport: true },
			],
			// Prettier rules
			'prettier/prettier': 'error',

			// General rules
			'linebreak-style': ['error', 'unix'],
			'max-len': [
				'error',
				{
					code: 80,
					ignoreStrings: true,
					ignoreTemplateLiterals: true,
					ignoreComments: true,
				},
			],
			indent: ['error', 'tab', { SwitchCase: 1 }],
			quotes: ['error', 'single'],
			semi: ['error', 'always'],
			eqeqeq: 'error',
			'arrow-spacing': ['error', { before: true, after: true }],
			'brace-style': ['error', '1tbs', { allowSingleLine: true }],
			'object-curly-spacing': ['error', 'always'],
			'no-mixed-spaces-and-tabs': ['error', 'smart-tabs'],
			'no-trailing-spaces': 'error',
			'no-unused-vars': [
				'warn',
				{
					vars: 'all',
					args: 'after-used',
					ignoreRestSiblings: false,
					argsIgnorePattern: '^_',
				},
			],
		},
	},

	// Apply prettier config last (to disable conflicting rules)
	{
		name: 'Prettier Config',
		rules: eslintConfigPrettier.rules,
	},

	// Language options & globals
	{
		languageOptions: {
			parserOptions: { sourceType: 'module', ecmaVersion: 'latest' },
			globals: {
				...globals.browser,
				...globals.node,
				...globals.es2021,
			},
		},
	}
);
