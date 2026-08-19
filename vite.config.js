import {defineConfig} from 'vite';

// Minification strips the banner in `lib/`, but the MIT license requires the
// copyright notice to ship with the bundles, so re-add it after minifying.
const licenseBanner = [
	'/*!',
	' * Copyright 2019 SmugMug, Inc.',
	' * Licensed under the terms of the MIT license. Please see LICENSE file in the project root for terms.',
	' * @license',
	' */'
].join('\n') + '\n';

// `lib/index.js` is shipped directly as the ESM entry point, so this build only
// produces the CommonJS compatibility layer and the browser (UMD) bundle.
export default defineConfig({
	plugins: [
		{
			name: 'license-banner',
			generateBundle(options, bundle) {
				Object.values(bundle).forEach(function (file) {
					if (file.type === 'chunk') {
						file.code = licenseBanner + file.code;
					}
				});
			}
		}
	],
	build: {
		target: 'es2015',
		sourcemap: true,
		lib: {
			entry: 'lib/index.js',
			name: 'justifiedLayout',
			formats: ['cjs', 'umd'],
			fileName: (format) => format === 'cjs' ? 'justified-layout.cjs' : 'justified-layout.umd.js'
		}
	}
});
