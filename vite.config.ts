import tailwindcss from '@tailwindcss/vite';
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';
import { withPwa } from '@vite-pwa/sveltekit';

export default defineConfig({
	plugins: [
		tailwindcss(),
		// withPwa wraps and includes the sveltekit() plugin
		withPwa(
			// SvelteKit config (formerly svelte.config.js)
			{
				preprocess: vitePreprocess(),
				adapter: adapter()
			},
			// PWA options
			{
				registerType: 'autoUpdate',
				manifest: {
					name: 'EV Range Calculator',
					short_name: 'EV Range',
					description: 'A simple app for calculating the remaining EV range.',
					theme_color: '#222222',
					icons: [
						{
							src: '/icon-192.png',
							sizes: '192x192',
							type: 'image/png'
						},
						{
							src: '/icon-512.png',
							sizes: '512x512',
							type: 'image/png'
						}
					]
				}
			}
		)
	]
});
