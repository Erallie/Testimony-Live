<script lang="ts">
	let { children } = $props();
</script>

<div class="text-aligner">
	<div class="text-message">
		{@render children?.()}
	</div>
</div>

<style>
	div.text-message {
		/* background-color: #3478f5; */
		/* background-color: hsl(219, 91%, 58%); */
		background-color: #e9e9eb;
		border-radius: 22px;
		padding: 12px 14px;
		color: black;
		max-width: 80%;
		margin: 0;
		margin-right: auto;
	}
	div.text-aligner {
		display: flex;
		margin: 1.1px 0;
	}
</style>
