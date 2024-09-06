import react from 'eslint-plugin-react';
import prettier from 'eslint-plugin-prettier';
import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all,
});

export default [
	...compat.extends(
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:prettier/recommended',
	),
	{
		plugins: {
			react,
			prettier,
		},

		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
			},

			ecmaVersion: 12,
			sourceType: 'module',

			parserOptions: {
				ecmaFeatures: {
					jsx: true, // Enable JSX syntax
				},
			},
		},

		settings: {
			react: {
				version: 'detect',
			},
		},

		rules: {
			'prettier/prettier': [
				'error',
				{
					singleQuote: true,
					semi: true,
					trailingComma: 'all',
					endOfLine: 'auto',
				},
			],

			'react/prop-types': 'off',
			'react/react-in-jsx-scope': 'off',
		},
	},
];
