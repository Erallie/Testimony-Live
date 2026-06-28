<script lang="ts">
	let { children } = $props();
	import { page } from '$app/state';
	import PrintedPage from '$lib/components/PrintedPage.svelte';
	import { cap } from '$lib/stores';
	import { getContext } from 'svelte';

	const pageModules = import.meta.glob('/src/routes/**/[0-9][0-9][0-9]*/+page.svelte');

	let pathname = $derived(page.url.pathname);

	let pages = $derived(
		Object.entries(pageModules)
			.filter(([path]) => path.includes('/1-hopeless/'))
			.map(([path]) => {
				const parts = path.split('/');
				const title = parts[parts.length - 2]
					.slice(3)
					.split('-')
					.map((word) => $cap(word) ?? '')
					.join(' ');
				// convert file system path -> route path
				// "/src/routes/(book)/1-hopeless/001/+page.svelte"
				// becomes "/1-hopeless/001"
				const routeIndex = path.indexOf('/1-hopeless/');
				const href = path.slice(routeIndex).replace('/+page.svelte', '');

				return {
					title,
					href
				};
			})
			.sort((a, b) => getPrefix(a.href).localeCompare(getPrefix(b.href)))
	);

	const PREFIX_REGEX = /^\d+(?:-\d+)*/;

	function getPrefix(p: string) {
		return p.match(PREFIX_REGEX)?.[0] ?? '';
	}

	let navigationClass: string = $state('');

	const { register } = getContext('toggle-menu');
	register(() => {
		switch (navigationClass) {
			case '':
				navigationClass = 'shown';
				break;
			case 'shown':
				navigationClass = '';
				break;
		}
	});
</script>

<div class="hopeless">
	{@render children?.()}
</div>
<div class="hopeless-navigation {navigationClass}">
	<PrintedPage>
		<h2>Table of Contents</h2>
		<ol>
			{#each pages as page}
				<li>
					<a href={page.href}>{page.title}</a>
				</li>
			{/each}
		</ol>
	</PrintedPage>
</div>

<style>
	div.hopeless {
		width: 100%;
		height: calc(100dvh - 80px - 56px);
		background-image: url('/hopeless/hopeless-backdrop.webp');
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		overflow-y: auto;
		padding: 40px 0;
	}
	div.hopeless-navigation {
		display: none;
		position: fixed;
		width: 100%;
		height: calc(100dvh - 56px);
		top: 0;
		left: 0;
		background-color: rgba(0, 0, 0, 0.6);
		overflow-y: auto;
		padding: 40px 0;
		& a {
			color: black;
		}
		& li {
			margin: 12px;
		}
		text-align: left;
	}
	div.shown {
		display: block;
	}
</style>
