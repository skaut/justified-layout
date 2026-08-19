'use strict';

const {FlatCompat} = require('@eslint/eslintrc');
const js = require('@eslint/js');
const globals = require('globals');

const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended
});

module.exports = [
	{
		ignores: ['coverage/', 'dist/']
	},
	...compat.config({
		extends: 'flickr',
		env: {
			node: true
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
