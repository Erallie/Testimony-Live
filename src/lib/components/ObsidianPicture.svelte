<script lang="ts">
	import type { JustPictureProps } from '$lib/types';
	let { imgSrc, imgAlt }: JustPictureProps = $props();
</script>

<img src={imgSrc} alt={imgAlt} />

<style>
	img {
		max-width: 100%;
		max-height: calc(100dvh - 40px);
		z-index: -100;
	}
</style>
