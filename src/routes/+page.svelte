<script lang="ts">
	import { writable } from 'svelte/store';
	import { onMount } from 'svelte';

	let totalBattery = writable<number | null>(50);
	let batteryRemaining = writable(50);
	let estMiKwh = writable(3.5);
	let dialogOpen = false;

	$: {
		if (typeof window !== 'undefined') {
			localStorage.setItem('totalBattery', $totalBattery?.toString() ?? '0');
			localStorage.setItem('batteryRemaining', $batteryRemaining.toString());
			localStorage.setItem('estMiKwh', $estMiKwh.toString());
		}
	}

	onMount(() => {
		const storedTotalBattery = localStorage.getItem('totalBattery');
		const storedBatteryRemaining = localStorage.getItem('batteryRemaining');
		const storedEstMiKwh = localStorage.getItem('estMiKwh');

		if (storedTotalBattery) {
			totalBattery.set(parseFloat(storedTotalBattery));
		}
		if (storedBatteryRemaining) {
			batteryRemaining.set(parseFloat(storedBatteryRemaining));
		}
		if (storedEstMiKwh) {
			estMiKwh.set(parseFloat(storedEstMiKwh));
		}
	});
</script>

<main>
	<h1>Remaining EV Range Calculator</h1>

	<section>
		<div class="label">Total battery capacity</div>
		<div class="amount">
			{$totalBattery?.toFixed(1) ?? 0.0}kWh
			<!-- svelte-ignore a11y-invalid-attribute -->
			<a href="#" on:click|preventDefault={() => (dialogOpen = true)}>change</a>
		</div>
	</section>

	<section>
		<div class="label">Battery remaining</div>
		<div class="amount">{$batteryRemaining}%</div>
		<input type="range" min="0" max="100" step="1" bind:value={$batteryRemaining} />
		<div class="number-labels">
			<div>0</div>
			<div>10</div>
			<div>20</div>
			<div>30</div>
			<div>40</div>
			<div>50</div>
			<div>60</div>
			<div>70</div>
			<div>80</div>
			<div>90</div>
			<div>100</div>
		</div>
	</section>

	<section>
		<div class="label">Estimated efficiency</div>
		<div class="amount">{$estMiKwh} mi/kWh</div>
		<input type="range" min="0" max="8" step=".1" bind:value={$estMiKwh} />
		<div class="number-labels">
			<div>0</div>
			<div>1</div>
			<div>2</div>
			<div>3</div>
			<div>4</div>
			<div>5</div>
			<div>6</div>
			<div>7</div>
			<div>8</div>
		</div>
	</section>

	{#if dialogOpen}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
		<dialog open on:click|self={() => (dialogOpen = false)}>
			<!-- svelte-ignore a11y-autofocus -->
			<input
				type="number"
				bind:value={$totalBattery}
				on:blur={() => (dialogOpen = false)}
				autofocus
			/>
		</dialog>
	{/if}

	<section>
		<h2>Estimated range</h2>
		<p class="range">
			Until 20%: {((($batteryRemaining - 20) / 100) * ($totalBattery ?? 0) * $estMiKwh).toFixed(1)} mi
		</p>
		<p class="range">
			Until 15%: {((($batteryRemaining - 15) / 100) * ($totalBattery ?? 0) * $estMiKwh).toFixed(1)} mi
		</p>
		<p class="range">
			Until 10%: {((($batteryRemaining - 10) / 100) * ($totalBattery ?? 0) * $estMiKwh).toFixed(1)} mi
		</p>
	</section>
</main>

<style lang="scss">
	:global(body) {
		font-family: system-ui, sans-serif;
		background-color: #222;
		color: #eee;
	}

	main {
		max-width: 400px;
		margin: 0 auto;
		padding: 1rem;
	}

	h1 {
		margin-bottom: 1.5rem;
	}

	a {
		color: inherit;
		text-decoration: underline;
	}

	a:hover,
	a:active {
		text-decoration: none;
	}

	dialog {
		background-color: #333;
		border: none;
		border-radius: 4px;
		padding: 1rem;
	}

	input[type='range'] {
		position: relative;
		width: 100%;
		z-index: 1;
	}

	section {
		margin-top: 2rem;
	}

	.number-labels {
		display: flex;
		justify-content: space-between;
		transform: translateX(0.15em);
		width: calc(100% - 1.2em);
		margin: auto;
		color: #aaa;
		font-size: 14px;
		font-weight: 700;

		> div {
			display: flex;
			justify-content: center;
			position: relative;
			width: 0;

			&::after {
				content: '';
				position: absolute;
				bottom: 100%;
				width: 2px;
				height: 8px;
				background: #aaa;
			}
		}
	}

	.range:first-of-type {
		font-size: 1.5rem;
	}
</style>
