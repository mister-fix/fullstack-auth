import { dirname } from 'path';
import { fileURLToPath } from 'url';

import pluginJs from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import pluginImport from 'eslint-plugin-import';
import n from 'eslint-plugin-n';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import pluginSecurity from 'eslint-plugin-security';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/** @type {import('eslint').Linter.Config[]} */
export default [
	pluginJs.configs.recommended,
	pluginSecurity.configs.recommended,
	pluginImport.flatConfigs.recommended,
	n.configs['flat/recommended'],

	// TypeScript ESLint config
	...tseslint.configs.recommended,
	{
		files: ['**/*.{js,mjs,cjs,ts}'],
		languageOptions: {
			parser: tseslint.parser,
			parserOptions: {
				project: `${__dirname}/tsconfig.json`,
				ecmaVersion: 'latest',
				sourceType: 'module',
				tsConfigRootDir: __dirname,
			},
		},
		plugins: {
			'@typescript-eslint': tseslint.plugin,
		},
		rules: {
			'@typescript-eslint/no-unused-vars': [
				'error',
				{ argsIgnorePattern: '^_' },
			],
			'@typescript-eslint/explicit-function-return-type': 'off',
		},
	},

	// Apply prettier config last (to disable conflicting rules)
	{
		name: 'Prettier Config',
		rules: eslintConfigPrettier.rules,
	},

	// Custom ESLint Rules & Plugins
	{
		files: ['**/*.{js,cjs,mjs,ts}'],
		plugins: {
			pluginImport,
			prettier: eslintPluginPrettier,
		},
		settings: {
			'import/resolver': {
				typescript: {
					alwaysTryTypes: true,
					project: './tsconfig.json',
					tsConfigRootDir: './',
				},
				node: {
					paths: ['src'],
					moduleDirectory: ['node_modules', 'src/'],
					extensions: ['.js', '.cjs', '.mjs', '.ts', '.json'],
				},
				alias: {
					map: [
						['@', './src/*'],
						['@/config/*', './src/config/*'],
						['@/controllers/*', './src/controllers/*'],
						['@/middleware/*', './src/middleware/*'],
						['@/routes/*', './src/routes/*'],
						['@/utils/*', './src/utils/*'],
						['@/services/*', './src/services/*'],
						['@/prisma', './src/prisma'],
					],
					extensions: ['.js', '.ts', '.json'],
				},
			},
		},
		rules: {
			// Import rules
			'import/order': [
				'error',
				{
					groups: [
						'builtin',
						'external',
						'internal',
						'parent',
						'sibling',
						'index',
					],
					'newlines-between': 'always',
				},
			],
			'import/no-unresolved': 'error',
			'import/no-extraneous-dependencies': [
				'error',
				{
					devDependencies: true,
					optionalDependencies: false,
					peerDependencies: false,
				},
			],

			// N rules
			'n/exports-style': ['error', 'exports'],
			'n/no-missing-import': [
				'error',
				{
					tryExtensions: ['.ts', '.js'],
				},
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
			'no-console': 'error',
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
				__dirname: true,
			},
		},
	},

	// Ignore Unnecessary Folders
	{
		ignores: ['node_modules', 'dist', 'client', 'build', '.husky', 'logs'],
	},
];
