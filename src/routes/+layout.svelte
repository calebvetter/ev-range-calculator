<script lang="ts">
	import { onMount } from 'svelte';
	import '../app.css';
	import { pwaInfo } from 'virtual:pwa-info';

	let { children } = $props();

	onMount(async () => {
		if (pwaInfo) {
			const { registerSW } = await import('virtual:pwa-register');
			registerSW({
				immediate: true,
				onRegistered(r) {
					r?.update();
				},
				onRegisterError(error) {
					console.log('SW registration error', error);
				}
			});
		}
	});
</script>

<svelte:head>
	{@html pwaInfo?.webManifest.linkTag ?? ''}
</svelte:head>

{@render children()}
