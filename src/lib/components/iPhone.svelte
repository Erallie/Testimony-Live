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
		padding: 20px 1.6%;
		width: min(675px, 90%);
		/* aspect-ratio: 675 / 320; */
		height: 320px;
		margin: 10px auto;
	}
	div.background {
		background-color: black;
		position: absolute;
		top: 20px;
		left: 2.9%;
		width: calc(100% - 5.8%);
		height: calc(100% - 40px);
		border-radius: 6%;
		z-index: 0;
		/* border: 1px solid red; */
	}
	img {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
		isolation: isolate;
	}
	.iphone-contents {
		isolation: isolate;
		width: 100%;
		height: 100%;
	}
</style>
