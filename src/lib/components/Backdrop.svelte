<script lang="ts">
	import type { BackdropProps } from '$lib/types';
	import Portal from 'svelte-portal';

	let { imgSource, children }: BackdropProps = $props();
</script>

<Portal target="body">
	<img src={imgSource} alt="Backdrop" />
</Portal>
{@render children?.()}

<style>
	img {
		max-width: 100%;
		position: fixed;
		top: 0;
		left: 0;
		object-fit: fill;
		z-index: -100;
	}
</style>
