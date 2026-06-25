<script lang="ts">
	let { children } = $props();
</script>

<code>
	{@render children?.()}
</code>

<style>
	code {
		padding: 0.3em 0.5em;
		background-color: rgb(46, 45, 93);
		border-radius: 20px;
	}
</style>
