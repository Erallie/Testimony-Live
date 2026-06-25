<script lang="ts">
	let { children } = $props();
</script>

<div>
	{@render children?.()}
</div>

<style>
	div {
		border-left: 2px solid rgb(138, 92, 245);
		padding-left: 24px;
	}
</style>
