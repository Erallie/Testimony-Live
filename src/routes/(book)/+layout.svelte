<script lang="ts">
	import { page } from '$app/state';
	import { goto } from '$app/navigation';

	let { children } = $props();

	const pageModules = import.meta.glob('/src/routes/**/[0-9][0-9][0-9]*/+page.svelte');

	let pathname = $derived(page.url.pathname);
	let act = $derived(pathname.split('/')[1] ?? '');

	let pages = $derived(
		Object.keys(pageModules)
			.filter((path) => path.includes(`/${act}/`))
			.map((path) => {
				const parts = path.split('/');
				return parts[parts.length - 2];
			})
			.sort((a, b) => parseInt(a.slice(0, 3), 10) - parseInt(b.slice(0, 3), 10))
	);

	function getNum(p: string) {
		return parseInt(p.slice(0, 3), 10);
	}

	function goBack() {
		const match = pathname.match(/(\d{3})/);
		const isChapterPage = !!match;
		const currentNum = match ? parseInt(match[1], 10) : -1;

		// 1. If we're inside a chapter, try previous chapter
		if (isChapterPage) {
			const prev = [...pages]
				.map((p) => ({ p, n: getNum(p) }))
				.filter(({ n }) => n < currentNum)
				.sort((a, b) => b.n - a.n)[0]?.p;

			if (prev) {
				goto(`/${act}/${prev}`);
				return;
			}

			// 2. No previous chapter → go to ACT ROOT
			goto(`/${act}`);
			return;
		}

		// 3. We are at ACT ROOT → go to previous act's LAST chapter
		const prevActMap: Record<string, string> = {
			'2-the-waiting': '/1-hopeless/065-quote-by-erika-gozar-summer-2016',
			'3-surrender': '/2-the-waiting/024-a-simple-prayer'
		};

		goto(prevActMap[act] ?? '/');
	}

	function goForward() {
		const match = pathname.match(/(\d{3})/);
		const currentNum = match ? parseInt(match[1], 10) : -1;

		const next = pages.find((p) => getNum(p) > currentNum);

		if (next) {
			goto(`/${act}/${next}`);
			return;
		}

		switch (act) {
			case '1-hopeless':
				goto('/2-the-waiting');
				break;
			case '2-the-waiting':
				goto('/3-surrender');
				break;
			case '3-surrender':
				goto('/');
				break;
		}
	}
</script>

<div>
	<button on:click={goBack} aria-label="Back"
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
	<button on:click={goForward} aria-label="Next"
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
        &:hover {
            cursor: pointer;
        }
	}
</style>
