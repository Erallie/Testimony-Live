<script lang="ts">
	let { children } = $props();
</script>

<div class="container">
	<div class="background"></div>
	<div class="iphone-contents">
		{@render children?.()}
	</div>
	<img src="/components/iphone-16.webp" alt="iPhone" />
</div>

<style>
	div.container {
		position: relative;
		padding: 20px;
		width: 675px;
		margin: 10px auto;
	}
	div.background {
		background-color: black;
		position: absolute;
		top: 20px;
		left: 20px;
		width: calc(100% - 40px);
		height: calc(100% - 40px);
		z-index: 0;
		border-radius: 40px;
	}
	img {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		pointer-events: none;
	}
	.iphone-contents {
		isolation: isolate;
	}
</style>
