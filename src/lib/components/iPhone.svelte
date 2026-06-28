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
		padding: 1.6%;
		width: min(675px, 90%);
		aspect-ratio: 675 / 320;
		margin: 10px auto;
	}
	div.background {
		background-color: black;
		position: absolute;
		top: 5.8%;
		left: 2.9%;
		width: calc(100% - 5.8%);
		height: calc(100% - 11.6%);
		z-index: 0;
		border-radius: 6%;
		/* border: 1px solid red; */
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
		width: 100%;
		height: 100%;
	}
</style>
