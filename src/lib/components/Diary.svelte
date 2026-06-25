<script lang="ts">
	let { children } = $props();
</script>

<div class="diary">
	<img src="/components/diary.webp" alt="Diary" />
	<div>
		{@render children?.()}
	</div>
</div>

<style>
	div.diary {
		width: 500px;
		max-width: 90%;
		height: calc(100dvh - 100px);
		margin: auto;
		position: relative;
		& img {
			position: absolute;
			width: 200%;
			transform: translate(-50%, 0);
			z-index: -1;
		}
		& > div {
			padding: 40px;
			padding-top: calc(1.8em + 3px);
			height: 100%;
			overflow-y: auto;
		}
		font-family: Caveat, 'Playpen Sans Hebrew', cursive;
		font-size: 1.4em;
		line-height: 0.9em;
	}
</style>
