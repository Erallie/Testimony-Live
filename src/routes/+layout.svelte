<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import { onMount } from 'svelte';
	export const prerender = true;
	export const ssr = false;

	import '../app.css';
	let { children } = $props();

	let showWarning = $state(false);

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

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

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

{@render children?.()}

<style>
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
