<script lang="ts">
	let { children } = $props();
</script>

<div>
	{@render children?.()}
</div>

<style>
	div {
		border-left: 2px solid #993396;
		padding-left: 24px;
	}
</style>
