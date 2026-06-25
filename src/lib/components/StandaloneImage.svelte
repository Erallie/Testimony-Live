<script lang="ts">
	import type { StandaloneImageProps } from '$lib/types';

	let { source, alt, width }: StandaloneImageProps = $props();
	import { onMount } from 'svelte';

	let randomRotation = $state(0);
	onMount(() => {
		randomRotation = Math.random() * 6 - 3;
	});
</script>

<img src={source} {alt} style={`width: ${width}px; transform: rotateZ(${randomRotation}deg)`} />

<style>
	img {
		display: block;
		margin: 10px auto;
		max-width: 80%;
		border-radius: 2px;
	}
</style>
