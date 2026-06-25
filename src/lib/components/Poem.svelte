<script lang="ts">
	import type { PoemProps } from '$lib/types';

	let { imgSource, title, date, children }: PoemProps = $props();
</script>

<div class="full-container">
	<div class="heading">
		<img src={imgSource} alt="Poem Banner" />
		<hgroup>
			<h2 class="poem-title">{@html title}</h2>
			<h3 class="poem-title">{@html date}</h3>
		</hgroup>
	</div>
	<div class="poem-text">
		{@render children?.()}
	</div>
</div>

<style>
	div.full-container {
		width: 700px;
		max-width: 90%;
		margin: 20px auto;
		background-color: white;
		border-radius: 60px;
		overflow: clip;
		padding-bottom: 4px;
	}

	div.heading {
		width: 100%;
		position: relative;
		& img {
			width: 100%;
		}
		& hgroup {
			position: absolute;
			bottom: 0;
			right: 0;
			width: 100%;
			text-align: right;
			background: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.8) 50%, black 100%);
			padding: 20px;
			padding-bottom: 10px;

			& * {
				color: white;
				margin: 6px 0;

				font-family: Montserrat, sans-serif;
				line-height: 1.2em;
				/* font-weight: 400; */
			}
		}
	}

	div.poem-text {
		margin: 20px 40px;
	}
</style>
