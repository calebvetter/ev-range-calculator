<script lang="ts">
	import { writable } from 'svelte/store';
	import { onMount } from 'svelte';

	let mounted = false;
	let totalBattery = writable<number | null>(50);
	let batteryRemaining = writable(50);
	let estMiKwh = writable(3.5);
	let dialogOpen = false;

	$: {
		if (typeof window !== 'undefined' && mounted) {
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

		mounted = true;
	});
</script>

<svelte:head>
	<meta
		name="viewport"
		content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
	/>
</svelte:head>

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
		<h2>Estimated range until</h2>
		<div class="range">
			<div class="label">20%</div>
			<div class="value">
				{((($batteryRemaining - 20) / 100) * ($totalBattery ?? 0) * $estMiKwh).toFixed(0)}<span
					>mi</span
				>
			</div>
		</div>
		<div class="range">
			<div class="label">15%</div>
			<div class="value">
				{((($batteryRemaining - 15) / 100) * ($totalBattery ?? 0) * $estMiKwh).toFixed(0)}<span
					>mi</span
				>
			</div>
		</div>
		<div class="range">
			<div class="label">10%</div>
			<div class="value">
				{((($batteryRemaining - 10) / 100) * ($totalBattery ?? 0) * $estMiKwh).toFixed(0)}<span
					>mi</span
				>
			</div>
		</div>
	</section>
</main>

<style lang="scss">
	:global(body) {
		font-family: 'Inter', sans-serif;
		background-color: #1a1a1a;
		color: #f0f0f0;
	}
	main {
		max-width: 400px;
		margin: 0 auto;
		padding: 2rem;
		background-color: #222;
		border-radius: 8px;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	}
	h1 {
		font-size: 2rem;
		font-weight: 600;
		margin-top: 0;
		margin-bottom: 2rem;
		color: #f0f0f0;
	}
	h2 {
		font-size: 1.2em;
	}
	a {
		color: #66b3ff;
		font-size: 0.7em;
		text-decoration: none;
		transition: color 0.2s;
	}
	a:hover,
	a:active {
		color: #99ccff;
	}
	dialog {
		background-color: #2d2d2d;
		border: none;
		border-radius: 8px;
		padding: 1.5rem;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	}
	input[type='range'] {
		position: relative;
		width: 100%;
		z-index: 1;
		appearance: none;
		background-color: #444;
		height: 4px;
		border-radius: 2px;
		outline: none;
		margin-bottom: 1rem;
	}
	input[type='range']::-webkit-slider-thumb {
		appearance: none;
		width: 20px;
		height: 20px;
		border-radius: 50%;
		background-color: #66b3ff;
		cursor: pointer;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
	}
	section {
		margin-top: 1.5rem;
	}
	.label {
		font-size: 1.1rem;
		font-weight: 500;
		margin-bottom: 0.5rem;
		color: #ccc;
	}
	.amount {
		font-size: 1.5rem;
		font-weight: 600;
		color: #f0f0f0;
	}
	.number-labels {
		display: flex;
		justify-content: space-between;
		transform: translateX(0.15em);
		width: calc(100% - 1.2em);
		margin: auto;
		color: #aaa;
		font-size: 14px;
		font-weight: 500;
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
				background: #666;
			}
		}
	}
	.range {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 10px;
		font-size: 1.2rem;
		font-weight: 500;
		line-height: 1.1;
		color: #ccc;
		&:nth-of-type(2) {
			font-size: 0.9em;
		}
		&:nth-of-type(3) {
			font-size: 0.6em;
		}

		.label {
			margin-bottom: 0;
			font-size: max(14px, 1em);
		}

		.value {
			font-size: 2em;
			font-weight: 900;

			span {
				margin-left: 0.2em;
				font-size: 0.8em;
				font-weight: 400;
			}
		}
	}
</style>
