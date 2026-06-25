<script lang="ts">
	import type { QuoteProps } from '$lib/types';
	import { onMount } from 'svelte';

	let { speaker, date, children }: QuoteProps = $props();
	let randomRotation = $state(0);
	onMount(() => {
		randomRotation = Math.random() * 12 - 6;
	});
</script>

<div class="quote" style={`transform: rotateZ(${randomRotation}deg)`}>
	<div>
		<span>“</span>{@render children?.()}
	</div>
	<p>(Quote by {speaker}<br />{date})</p>
</div>

<style>
	div.quote {
		background-image: url('/components/sticky-note-brighter.webp');
		background-size: contain;
		aspect-ratio: 1/1;
		overflow-y: auto;
		width: 300px;
		max-width: 90%;
		padding: 30px;
		margin: auto;
		display: flex;
		flex-direction: column;
		justify-content: center;
		& > div {
			text-align: center;
			font-size: 2em;
			line-height: 0.9em;
		}
		& > p {
			text-align: right;
			margin: 16px 0 0;
			font-size: 1.2em;
		}
		font-family: Caveat, 'Playpen Sans Hebrew', cursive;
		& span {
			font-size: 2em;
			line-height: 0;
			transform: translate(-10px, 12px);
			display: inline-block;
		}
	}
</style>
