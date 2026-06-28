<script lang="ts">
	import PaperSnippet from '$lib/components/PaperSnippet.svelte';
</script>

<div class="heading">
	<PaperSnippet>
		<h1>Erika's Testimony</h1>
		<p>
			This is a true story about a young girl who loses everything and falls into the Father's arms,
			told in three parts.
		</p>
	</PaperSnippet>
</div>
<section>
	<a href="/1-hopeless"
		><button style="background-image: url('/main-page/hopeless.webp'); background-position: right;"
			>Act I:<br />Hopeless</button
		></a
	>
	<a href="/2-the-waiting"
		><button
			style="background-image: url('/main-page/the-waiting.webp'); background-position: center;"
			>Act II:<br />The Waiting</button
		></a
	>
	<a href="/3-surrender"><button>Act III:<br />Surrender</button></a>
</section>

<style>
	div.heading {
		width: 100%;
		background-image: url('/main-page/gold.webp');
		background-size: cover;
		box-sizing: border-box;
		margin: 0;
		padding-top: 40px;
		height: 100px;
		& h1 {
			font-family: 'Miss Fajardose', cursive;
			font-size: 4em;
			font-weight: 400;
			text-align: center;
		}
		& p {
			text-align: center;
			font-family: 'EB Garamond', 'Times New Roman', serif;
		}
	}
	section {
		width: 100%;
		display: flex;
		flex-direction: row;
		margin: 0;
	}
	a {
		flex: 1;
		height: calc(100dvh - 100px);
		text-decoration: none;
		transition: flex 0.3s;
		font-family: 'EB Garamond', 'Times New Roman', serif;
		font-weight: 500;

		font-size: clamp(4vw, 3rem, 8vw);
		line-height: 1em;
		color: white;
		background-color: black;
		text-shadow: 2px 2px 4px black;
		/* -webkit-text-stroke: 4px black;
		paint-order: stroke fill;
		border: 4px solid rgba(255, 204, 111, 0%); */
		& > button {
			all: unset;
			width: 100%;
			height: 100%;
			background-size: cover;
			text-align: center;
		}
		&:hover {
			flex: 1.5;
		}
	}

	@media (max-width: 480px) {
		div.heading {
			height: 225px;
		}
		section {
			flex-direction: column;
			height: calc(100dvh - 225px);
		}
		a {
		    font-size: clamp(2rem, 6vh, 3rem);
			height: unset;
		}
	}
</style>
