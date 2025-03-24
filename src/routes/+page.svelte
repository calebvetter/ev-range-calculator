<script lang="ts">
	import { onMount } from 'svelte';
	import * as Dialog from '$lib/components/ui/dialog';
	import Slider from '$lib/components/Slider.svelte';
	import Fa from 'svelte-fa';
	import { faCarSide } from '@fortawesome/free-solid-svg-icons';

	let totalBattery = $state(50);
	let batteryRemaining = $state(50);
	let estMiKwh = $state(3.5);
	let dialogOpen = $state(false);

	onMount(() => {
		const storedTotalBattery = localStorage.getItem('totalBattery');
		const storedBatteryRemaining = localStorage.getItem('batteryRemaining');
		const storedEstMiKwh = localStorage.getItem('estMiKwh');

		if (storedTotalBattery) {
			totalBattery = parseFloat(storedTotalBattery);
		}
		if (storedBatteryRemaining) {
			batteryRemaining = parseFloat(storedBatteryRemaining);
		}
		if (storedEstMiKwh) {
			estMiKwh = parseFloat(storedEstMiKwh);
		}
	});

	$effect(() => {
		localStorage.setItem('totalBattery', totalBattery.toString() ?? '0');
	});
	$effect(() => {
		localStorage.setItem('batteryRemaining', batteryRemaining.toString());
	});
	$effect(() => {
		localStorage.setItem('estMiKwh', estMiKwh.toString());
	});
</script>

<main class="mx-auto my-0 min-h-dvh max-w-[440px] rounded bg-neutral-900 p-8 shadow-md select-none">
	<h1 class="text-3xl font-bold">Remaining EV Range Calculator</h1>

	<section class="mt-6">
		<div class="text-lg font-medium text-green-400">Total battery capacity</div>
		<div class="amount">
			{totalBattery.toFixed(1)}kWh
			<Dialog.Root bind:open={dialogOpen}>
				<Dialog.Trigger class="text-base text-blue-400">change</Dialog.Trigger>
				<Dialog.Content class="w-fit" closeClasses="hidden">
					<Dialog.Header>
						<Dialog.Description>
							<input
								type="number"
								class="w-[80px] text-xl"
								bind:value={totalBattery}
								onblur={() => (dialogOpen = false)}
							/>
						</Dialog.Description>
					</Dialog.Header>
				</Dialog.Content>
			</Dialog.Root>
		</div>
	</section>

	<section class="mt-6">
		<Slider
			max={100}
			step={1}
			title="Battery remaining"
			labels={Array.from({ length: 11 }, (_, i) => (i * 10).toString())}
			bind:value={batteryRemaining}
		>
			{#snippet valueDisplay()}
				{batteryRemaining}%
			{/snippet}
		</Slider>
	</section>

	<section class="mt-6">
		<Slider
			max={8}
			step={0.1}
			title="Estimated efficiency"
			labels={Array.from({ length: 9 }, (_, i) => i.toString())}
			bind:value={estMiKwh}
		>
			{#snippet valueDisplay()}
				{estMiKwh.toFixed(1)}
				<span class="text-[.7em]"> mi/kWh</span>
			{/snippet}
		</Slider>
	</section>

	<section class="mt-6">
		<div class="text-lg font-medium text-green-400">Estimated range until</div>
		<div class="mt-2 text-xl text-neutral-300"><Fa icon={faCarSide} /></div>
		<div class="h-1 w-full rounded bg-neutral-600"></div>
		<div class="mt-2 flex justify-between px-10">
			{#each [20, 15, 10] as percentage, i}
				<div class="relative h-2 w-0.5 bg-neutral-600">
					<div
						class="absolute top-full left-1/2 flex -translate-x-1/2 flex-col items-center leading-tight"
					>
						<div class="text-lg">{percentage}%</div>
						<div class="flex items-end gap-1 text-3xl font-bold">
							<span style="font-size: {1.1 - i * 0.15}em;">
								{(((batteryRemaining - percentage) / 100) * (totalBattery ?? 0) * estMiKwh).toFixed(
									0
								)}
							</span>
							<span class="text-xl font-normal">mi</span>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</section>
</main>
