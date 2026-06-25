<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	export const prerender = true;
	export const ssr = false;

	import '../app.css';
	let { children } = $props();
</script>

export const prerender = true; export const ssr = false;
<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children?.()}
