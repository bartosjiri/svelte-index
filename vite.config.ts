import { defineConfig } from 'vite';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { sveltekit } from '@sveltejs/kit/vite';
import adapter from '@sveltejs/adapter-auto';

import { copyContentAssets } from './src/util/vite/copyContentAssets';

export default defineConfig({
	server: {
		fs: {
			allow: ['./content']
		}
	},
	plugins: [
		copyContentAssets(),
		sveltekit({
			preprocess: [vitePreprocess()],
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},
			// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
			// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
			// See https://svelte.dev/docs/kit/adapters for more information about adapters.
			adapter: adapter(),
			alias: {
				'@/*': './src/*'
			}
		})
	],
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: '@use "@/styles/+preprocess.scss" as *;'
			}
		}
	}
});
