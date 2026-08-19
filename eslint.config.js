import {FlatCompat} from '@eslint/eslintrc';
import js from '@eslint/js';
import globals from 'globals';
import packageJson from 'eslint-plugin-package-json';

const compat = new FlatCompat({
	baseDirectory: import.meta.dirname,
	recommendedConfig: js.configs.recommended
});

export default [
	{
		ignores: ['coverage/', 'dist/']
	},
	// Scoped to JS so the JSON files linted below don't get parsed as JavaScript.
	...compat.config({
		extends: 'flickr',
		env: {
			node: true,
			es2024: true
		},
		parserOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module'
		},
		rules: {}
	}).map((config) => Object.assign({}, config, {files: ['**/*.js']})),
	{
		files: ['test/**/*.js'],
		languageOptions: {
			globals: globals.mocha
		}
	},
	packageJson.configs['recommended-publishable'],
	packageJson.configs.stylistic
];
