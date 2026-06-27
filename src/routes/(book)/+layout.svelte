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
			.sort((a, b) => getPrefix(a).localeCompare(getPrefix(b)))
	);

	const PREFIX_REGEX = /^\d+(?:-\d+)*/;

	function getPrefix(p: string) {
		return p.match(PREFIX_REGEX)?.[0] ?? '';
	}

	function goBack() {
		const segments = pathname.split('/').filter(Boolean);
		const isChapterPage = segments.length === 2;

		const currentPage = segments[1] ?? '';
		const currentPrefix = getPrefix(currentPage);

		// 1. If we're inside a chapter, try previous chapter
		if (isChapterPage) {
			const prev = [...pages]
				.filter((p) => getPrefix(p) < currentPrefix)
				.sort((a, b) => getPrefix(b).localeCompare(getPrefix(a)))[0];

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
		const segments = pathname.split('/').filter(Boolean);

		const currentPage = segments[1] ?? '';
		const currentPrefix = getPrefix(currentPage);

		const next = pages.find((p) => getPrefix(p) > currentPrefix);

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

<div class="buttons-container">
	<button class="desktop-button" on:click={goBack} aria-label="Back"
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
				stroke-width="10"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg></button
	>
	<div class="layout-content">
		{@render children?.()}
	</div>
	<button class="desktop-button" on:click={goForward} aria-label="Next"
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
				stroke-width="10"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg></button
	>
	<div class="mobile-buttons-container">
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
					stroke-width="10"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg></button
		><button on:click={goForward} aria-label="Next"
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
					stroke-width="10"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg></button
		>
	</div>
</div>

<style>
	.buttons-container {
		display: flex;
		flex-direction: row;
		height: 100dvh;
	}
	div.layout-content {
		flex: 1;
		height: 100dvh;
		overflow-y: auto;
	}
	button {
		flex: 0;
		flex-grow: 0;
		flex-shrink: 0;
		width: 36px;
		z-index: 100;

		border: none;

		padding: 8px;
		background: #101010;

		line-height: 0;
		font-size: 0;

		align-items: center;
		justify-content: center;

		& > svg {
			display: block;
			width: 20px;
			height: auto;
			color: white;
		}
		&:hover {
			cursor: pointer;
			background-color: #1e1e1e;
		}
	}
	.mobile-buttons-container {
		display: none;
		& > button {
			flex: 1;
			& > svg {
				margin: auto;
			}
		}
	}
	@media (max-width: 480px) {
		.buttons-container {
			flex-direction: column;
		}
		div.layout-content {
			flex-shrink: 1;
			height: calc(100dvh - 56px);
		}
		button.desktop-button {
			display: none;
		}
		.mobile-buttons-container {
			display: flex;
			flex: 0;
		}
	}
</style>
