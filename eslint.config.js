import {FlatCompat} from '@eslint/eslintrc';
import js from '@eslint/js';
import globals from 'globals';

const compat = new FlatCompat({
	baseDirectory: import.meta.dirname,
	recommendedConfig: js.configs.recommended
});

export default [
	{
		ignores: ['coverage/', 'dist/']
	},
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
	}),
	{
		files: ['test/**/*.js'],
		languageOptions: {
			globals: globals.mocha
		}
	}
];
