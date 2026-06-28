<script lang="ts">
	import type { JustPictureProps } from '$lib/types';
	import Portal from 'svelte-portal';

	let { imgSrc, imgAlt }: JustPictureProps = $props();
</script>

<div>
	<img src={imgSrc} alt={imgAlt} />
</div>

<style>
	div {
		width: 100%;
		height: calc(100dvh - 56px);
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: black;
	}
	img {
		max-width: 100%;
		max-height: 100%;
		z-index: 100;
	}
</style>
