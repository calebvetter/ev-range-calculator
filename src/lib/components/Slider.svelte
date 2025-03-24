<script lang="ts">
	import { cn } from '$lib/utils';
	import * as Popover from '$lib/components/ui/popover';
	import type { Snippet } from 'svelte';

	type Props = {
		value: number;
		min?: number;
		max?: number;
		step?: number;
		title?: string;
		valueDisplay?: Snippet;
		labels?: string[];
	};

	let {
		value = $bindable(0),
		min = 0,
		max = 100,
		step,
		title,
		valueDisplay,
		labels
	}: Props = $props();

	let isSliding = $state(false);
	let inputEl = $state() as HTMLInputElement;
	let trackEl = $state() as HTMLDivElement;

	function updateValueFromPointer(e: PointerEvent) {
		if (!inputEl || !trackEl) return;

		const rect = trackEl.getBoundingClientRect();
		const x = Math.min(Math.max(e.clientX, rect.left), rect.right);
		const percent = (x - rect.left) / rect.width;
		const rawValue = min + percent * (max - min);
		const stepped = step ? Math.round(rawValue / step) * step : rawValue;
		value = Math.min(max, Math.max(min, stepped));
	}
</script>

{#if title}
	<div class="text-lg font-medium text-green-400">{title}</div>
{/if}
<div class="text-2xl font-bold">
	{#if valueDisplay}
		{@render valueDisplay()}
	{:else}
		{value}
	{/if}
</div>
<div class="relative -mt-6 -mb-5" bind:this={trackEl}>
	<div
		class="pointer-events-none absolute top-1/2 left-0 h-1 w-full translate-y-[calc(-50%-0.125rem)] rounded bg-neutral-600"
	></div>
	<!-- Interaction overlay -->
	<div
		class="absolute inset-0 z-10 cursor-pointer touch-none"
		onpointerdown={(e) => {
			isSliding = true;
			updateValueFromPointer(e);
			window.addEventListener('pointermove', updateValueFromPointer);
			window.addEventListener(
				'pointerup',
				() => {
					isSliding = false;
					window.removeEventListener('pointermove', updateValueFromPointer);
				},
				{ once: true }
			);
		}}
	></div>

	<input
		bind:this={inputEl}
		type="range"
		class={cn(
			'relative h-18 w-full appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-400 [&::-webkit-slider-thumb]:shadow-md'
		)}
		{min}
		{max}
		{step}
		oninput={() => (isSliding = true)}
		onchange={() => (isSliding = false)}
		bind:value
	/>
</div>

{#if labels}
	<div class="mx-auto flex w-[calc(100%-1.25rem)] justify-between text-sm font-medium">
		{#each labels as label}
			<div class="relative flex w-0 justify-center">
				<div class="absolute bottom-full h-2 w-0.5 bg-neutral-600"></div>
				{label}
			</div>
		{/each}
	</div>
{/if}

<div
	class="pointer-events-none fixed top-0 left-0 z-[1] h-dvh w-screen bg-neutral-950/50 backdrop-blur-xs"
	class:hidden={!isSliding}
></div>
<Popover.Root bind:open={isSliding}>
	<Popover.Content
		customAnchor={inputEl}
		side="top"
		class="pointer-events-none w-fit border border-neutral-700 bg-neutral-800 text-4xl shadow select-none"
	>
		{#if valueDisplay}
			{@render valueDisplay()}
		{:else}
			{value}
		{/if}
	</Popover.Content>
</Popover.Root>
