<script lang="ts">
	let { children } = $props();
</script>

<div class="hopeless">
	{@render children?.()}
</div>

<style>
	div {
		width: 100%;
		position: fixed;
		height: calc(100dvh - 80px);
		top: 0;
		left: 0;
		background-image: url('/hopeless/hopeless-backdrop.webp');
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		overflow-y: auto;
		padding: 40px 0;
	}
	@media (max-width: 480px) {
		div {
			height: calc(100dvh - 80px - 56px);
		}
	}
</style>
