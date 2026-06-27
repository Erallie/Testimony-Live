<script lang="ts">
	let { children } = $props();
	import { onMount } from 'svelte';

	let randomRotation = $state(0);
	onMount(() => {
		randomRotation = Math.random() * 4 - 2;
	});
</script>

<section style={`transform: rotateZ(${randomRotation}deg)`}>
	{@render children?.()}
</section>

<style>
	section {
		background-image: url('/components/printed-paper.webp');
		background-size: cover;
		margin: auto;
		width: 600px;
		max-width: 90%;
		padding: 30px 40px;
		max-height: calc(100dvh - 140px);
		overflow-y: auto;
		border-radius: 2px;
	}
	@media (max-width: 480px) {
		section {
			max-width: 80%;
			max-height: calc(100dvh - 140px - 56px);
		}
	}
</style>
