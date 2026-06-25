<script lang="ts">
	let { children } = $props();
	import { onMount } from 'svelte';

	let randomRotation = $state(0);
	onMount(() => {
		randomRotation = Math.random() * 6 - 3;
	});
</script>

<div class="paper-snippet" style={`transform: rotateZ(${randomRotation}deg)`}>
	{@render children?.()}
</div>

<style>
	div {
		width: 400px;
		max-width: 80%;
		background-image: url('/components/printed-paper.webp');
		background-size: cover;
		margin: auto;
		padding: 12px 16px;
		border-radius: 2px;
	}
</style>
