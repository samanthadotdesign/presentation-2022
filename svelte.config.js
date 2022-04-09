import adapter from '@sveltejs/adapter-auto';
import { resolve } from 'path';
/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		vite: {
			resolve: {
				alias: {
					// these are the aliases and paths to them
					'@assets': resolve('./src/assets'),
					'@stores': resolve('./src/stores'),
					'@components': resolve('./src/components'),
					'@utils': resolve('./src/utils')
				}
			}
		},
		adapter: adapter()
	}
};

export default config;
