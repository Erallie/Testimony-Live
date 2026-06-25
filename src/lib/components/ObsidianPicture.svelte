<script lang="ts">
	import type { JustPictureProps } from '$lib/types';
	let { imgSrc, imgAlt }: JustPictureProps = $props();
</script>

<img src={imgSrc} alt={imgAlt} />

<style>
	img {
		max-width: 100%;
		max-height: 100dvh;
		z-index: -100;
	}
</style>
