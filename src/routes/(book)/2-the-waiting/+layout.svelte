<script lang="ts">
	import PrintedPage from '$lib/components/PrintedPage.svelte';

	let { children } = $props();

	import { cap } from '$lib/stores';
	import { getContext } from 'svelte';

	const pageModules = import.meta.glob('/src/routes/**/[0-9][0-9][0-9]*/+page.svelte');

	let pages = $derived(
		Object.entries(pageModules)
			.filter(([path]) => path.includes('/2-the-waiting/'))
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
				const routeIndex = path.indexOf('/2-the-waiting/');
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
	function toggleMenu() {
		switch (navigationClass) {
			case '':
				navigationClass = 'shown';
				break;
			case 'shown':
				navigationClass = '';
				break;
		}
	}
</script>

<div class="the-waiting">
	{@render children?.()}
</div>

<div class="the-waiting-navigation {navigationClass}">
	<div class="navigation">
		<h2>Table of Contents</h2>
		<ol>
			{#each pages as page}
				<li>
					<a href={page.href} on:click={toggleMenu}>{page.title}</a>
				</li>
			{/each}
		</ol>
	</div>
</div>

<style>
	div.the-waiting {
		width: 100%;
		height: calc(100dvh - 56px);
		top: 0;
		left: 0;
		background-image: url("data:image/svg+xml,<svg id='patternId' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><defs><pattern id='a' patternUnits='userSpaceOnUse' width='40' height='40' patternTransform='scale(3) rotate(0)'><rect x='0' y='0' width='100%' height='100%' fill='%23fafafaff'/><path d='M46.231 19.999a5.937 7.48 0 01-5.937 7.48A5.937 7.48 0 0134.357 20a5.937 7.48 0 015.937-7.48 5.937 7.48 0 015.937 7.48zm-40.421 0a5.937 7.48 0 01-5.937 7.48A5.937 7.48 0 01-6.064 20a5.937 7.48 0 015.937-7.48 5.937 7.48 0 015.937 7.48zm20.21 20.285a5.937 7.48 0 01-5.937 7.48 5.937 7.48 0 01-5.936-7.48 5.937 7.48 0 015.936-7.48 5.937 7.48 0 015.937 7.48zm0-40.57a5.937 7.48 0 01-5.937 7.48 5.937 7.48 0 01-5.936-7.48 5.937 7.48 0 015.936-7.48 5.937 7.48 0 015.937 7.48zM-5.732 46.942c1.676-.944 3.556-1.6 5.478-1.587 1.924.011 3.796.69 5.463 1.653 1.668.962 3.156 2.202 4.637 3.434 1.48 1.233 2.97 2.471 4.641 3.428 1.67.957 3.547 1.627 5.47 1.627 1.924 0 3.8-.67 5.47-1.627s3.161-2.195 4.642-3.428c1.48-1.232 2.968-2.472 4.636-3.434 1.667-.963 3.54-1.642 5.463-1.653 1.922-.012 3.802.643 5.479 1.587V33.628c-1.677.944-3.557 1.6-5.479 1.587-1.923-.011-3.796-.69-5.463-1.653-1.668-.962-3.156-2.202-4.636-3.434-1.48-1.233-2.971-2.471-4.642-3.428-1.67-.957-3.546-1.627-5.47-1.627-1.923 0-3.8.67-5.47 1.627s-3.161 2.195-4.641 3.428c-1.48 1.232-2.97 2.472-4.637 3.434-1.667.963-3.54 1.641-5.463 1.653-1.922.012-3.802-.643-5.478-1.587zM45.647-6.943c-1.677.944-3.557 1.6-5.479 1.587-1.923-.011-3.796-.69-5.463-1.653-1.668-.962-3.156-2.202-4.636-3.434-1.48-1.233-2.971-2.471-4.642-3.428-1.67-.957-3.546-1.627-5.47-1.627-1.923 0-3.8.67-5.47 1.627s-3.161 2.195-4.641 3.428c-1.48 1.232-2.97 2.472-4.637 3.434-1.667.963-3.54 1.642-5.463 1.653-1.922.012-3.802-.643-5.478-1.587V6.372c1.676-.944 3.556-1.6 5.478-1.587 1.924.012 3.796.69 5.463 1.653C6.877 7.4 8.365 8.64 9.846 9.872c1.48 1.233 2.97 2.471 4.641 3.428 1.67.957 3.547 1.627 5.47 1.627 1.924 0 3.8-.67 5.47-1.627s3.161-2.195 4.642-3.428c1.48-1.232 2.968-2.472 4.636-3.434 1.667-.963 3.54-1.642 5.463-1.653 1.922-.012 3.802.643 5.479 1.587z'  stroke-width='1' stroke='%23f2f2f2be' fill='none'/></pattern></defs><rect width='800%' height='800%' transform='translate(0,0)' fill='url(%23a)'/></svg>");
		overflow-y: auto;
	}
	div.the-waiting-navigation {
		display: none;
		position: fixed;
		width: 100%;
		height: calc(100dvh - 56px);
		top: 0;
		left: 0;
		background-color: rgba(0, 0, 0, 0.6);
		overflow-y: auto;
		& a {
			color: black;
		}
		& li {
			margin: 12px;
		}
		text-align: left;
	}
	.navigation {
		width: 700px;
		max-width: 90%;
		margin: 20px auto;
		background-color: white;
		border-radius: 60px;
		overflow: clip;
		padding-bottom: 4px;
		padding: 20px 0;
	}
	div.shown {
		display: block;
	}
</style>
