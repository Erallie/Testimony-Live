<script lang="ts">
	let { children } = $props();
</script>

<code>
	{@render children?.()}
</code>

<style>
	code {
		padding: 0.15em 0.3em;
		background-color: rgb(36, 36, 36);
		border-radius: 4px;
	}
</style>
