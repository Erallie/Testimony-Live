import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const dev = process.argv.includes('dev');

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter({
			// IMPORTANT for GitHub Pages:
			pages: 'docs',
			assets: 'docs',
			fallback: '404.html'
		}),
		prerender: {
			handleHttpError: 'warn'
		},

		paths: {
			base: ''
		}
	}
};

export default config;
