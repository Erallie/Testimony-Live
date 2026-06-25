<script lang="ts">
	import { page } from '$app/state';
	import { onMount } from 'svelte';

	let { children } = $props();
	let pages: string[] = $state([]);
	let pathname = $derived(page.url.pathname);
	let act = $derived(pathname.split('/')[1] ?? '');
	onMount(() => {
		const pageModules = import.meta.glob('/src/routes/**/[0-9][0-9][0-9]*/+page.svelte', {
			eager: true
		});

		// Grab all page folder names under this act
		pages = Object.keys(pageModules)
			.filter((path) => path.includes(`/${act}/`))
			.map((path) => {
				const parts = path.split('/');
				return parts[parts.length - 2]; // e.g. "004-sometopic"
			})
			// Sort based on the leading number
			.sort((a, b) => {
				const na = parseInt(a.slice(0, 3), 10);
				const nb = parseInt(b.slice(0, 3), 10);
				return na - nb;
			});
	});

	function goBack() {
		const match = pathname.match(/(\d{3})/);
		if (!match) {
			switch (act) {
				case '1-hopeless':
					window.location.href = '/';
					break;
				case '2-the-waiting':
					window.location.href = '/1-hopeless/065-quote-by-erika-gozar-summer-2016';
					break;
				case '3-surrender':
					window.location.href = '/2-the-waiting/024-a-simple-prayer';
					break;
			}
			return null;
		}
		const currentNum = parseInt(match[1], 10);

		// Find the last page number smaller than currentNum
		const reversed = [...pages].reverse();
		const prev = reversed.find((p) => {
			const n = parseInt(p.slice(0, 3), 10);
			return n < currentNum;
		});

		if (prev) {
			window.location.href = prev;
			return prev;
		} else {
			// Go back to the act main page
			window.location.href = '/' + act;
			return act;
		}
	}

	function goForward() {
		const match = pathname.match(/(\d{3})/);
		const currentNum = match ? parseInt(match[1], 10) : -1;

		// Find the first page number greater than currentNum
		const next = pages.find((p) => {
			const n = parseInt(p.slice(0, 3), 10);
			return n > currentNum;
		});

		if (next) {
			// Special case: page 000 loads as /act/000-xxx instead of just "000-xxx"
			if (currentNum < 0) window.location.href = `/${act}/${next}`;
			else window.location.href = next;

			return next;
		} else {
			switch (act) {
				case '1-hopeless':
					window.location.href = '/2-the-waiting';
					break;
				case '2-the-waiting':
					window.location.href = '/3-surrender';
					break;
				case '3-surrender':
					window.location.href = '/';
					break;
			}
			//!TODO: Add code here for going to the next section
			return null;
		}
	}
</script>

<div>
	<button onclick={goBack} aria-label="Back"
		><svg
			xmlns="http://www.w3.org/2000/svg"
			width="50"
			height="100"
			viewBox="-10 -10 70 110"
			role="img"
		>
			<polyline
				points="50,0 0,50 50,100"
				fill="none"
				stroke="currentColor"
				stroke-width="20"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg></button
	>
	{@render children?.()}
	<button onclick={goForward} aria-label="Next"
		><svg
			xmlns="http://www.w3.org/2000/svg"
			width="50"
			height="100"
			viewBox="-10 -10 70 110"
			role="img"
		>
			<polyline
				points="0,0 50,50 0,100"
				fill="none"
				stroke="currentColor"
				stroke-width="20"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg></button
	>
</div>

<style>
	button {
		position: fixed;
		top: 50%;
		transform: translateY(-50%);
		z-index: 100;

		border: none;
		border-radius: 8px;

		padding: 8px;
		background: white;

		line-height: 0;
		font-size: 0;

		display: inline-flex;
		align-items: center;
		justify-content: center;

		&:first-child {
			left: 12px;
		}

		&:last-child {
			right: 12px;
		}

		& > svg {
			display: block;
			width: 20px;
			height: auto;
		}
	}
</style>
