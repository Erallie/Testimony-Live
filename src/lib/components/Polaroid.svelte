<script lang="ts">
	import type { PolaroidProps } from '$lib/types';
	import { onMount } from 'svelte';

	let { source, alt, width, children }: PolaroidProps = $props();

	let randomRotation = $state(0);
	onMount(() => {
		randomRotation = Math.random() * 6 - 3;
	});
</script>

<div class="full-container" style={`transform: rotateZ(${randomRotation}deg); --width: ${width}px`}>
	<img src={source} {alt} class="actual-image" />
	<div class="polaroid-caption">
		{@render children?.()}
	</div>
</div>

<style>
	div.full-container {
		position: relative;
		display: block;
		margin: 20px auto;
		width: var(--width);
		max-width: calc(90% - 40px);
		background-image: url('/components/polaroid-backdrop.webp');
		background-size: contain;
		padding: 20px;
		padding-bottom: 10px;
		border-radius: 2px;
	}
	img.actual-image {
		max-width: 100%;
		max-height: 100%;
		object-fit: contain;
		display: block;
		margin: 0;
		border-radius: 4px;
	}
	div.polaroid-caption {
		margin: 0;
		margin-top: 10px;
	}
</style>
