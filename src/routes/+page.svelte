<script lang="ts">
	import { onMount } from 'svelte';
	import PaperSnippet from '$lib/components/PaperSnippet.svelte';

	let showWarning = false;

	onMount(() => {
		const stored = localStorage.getItem('testimony_warning');

		if (stored) {
			const expires = Number(stored);

			if (Date.now() < expires) {
				showWarning = false;
				return;
			}
		}

		showWarning = true;
	});

	function acknowledgeWarning() {
		const expires = Date.now() + 30 * 24 * 60 * 60 * 1000; // 30 days

		localStorage.setItem('testimony_warning', String(expires));
		showWarning = false;
	}
</script>

{#if showWarning}
	<div class="warning-overlay">
		<div class="warning-modal">
			<h2>Content Warning</h2>

			<p>
				This book contains <strong>mature themes</strong> including sex, violence, and suicide.
			</p>

			<p>Please proceed at your own discretion.</p>

			<button class="warning" on:click={acknowledgeWarning}> I Understand </button>
		</div>
	</div>
{/if}

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
		font-size: 3em;
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
	.warning-overlay {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.8);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 9999;
		padding: 20px;
		box-sizing: border-box;
	}

	.warning-modal {
		width: 500px;
		max-width: 100%;
		background: white;
		padding: 2rem;
		border-radius: 12px;
		text-align: center;
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
	}

	.warning-modal h2 {
		margin-top: 0;
		font-family: 'EB Garamond', 'Times New Roman', serif;
	}

	.warning-modal p {
		font-family: 'EB Garamond', 'Times New Roman', serif;
		margin: 1rem 0;
	}

	.warning-modal button {
		padding: 0.75rem 1.5rem;
		font-size: 1rem;
		cursor: pointer;
		border: none;
		border-radius: 6px;
		background: #222;
		color: white;
		font-family: Poppins;
		font-weight: bold;
		&:hover {
			background-color: #313131;
		}
	}
</style>
