<script lang="ts">
	import type { JustPictureProps } from '$lib/types';
	import Portal from 'svelte-portal';

	let { imgSrc, imgAlt }: JustPictureProps = $props();
</script>

<Portal target="body">
	<div>
		<img src={imgSrc} alt={imgAlt} />
	</div>
</Portal>

<style>
	div {
		position: fixed;
		inset: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: black;
	}
	img {
		max-width: 100%;
		max-height: 100%;
		z-index: -100;
	}
</style>
