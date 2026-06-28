<script lang="ts">
	import { cap } from '$lib/stores';
	import { getContext } from 'svelte';
	import dayjs from 'dayjs';
	import advancedFormat from 'dayjs/plugin/advancedFormat';
	dayjs.extend(advancedFormat);

	const pageModules = import.meta.glob(
		'/src/routes/**/202[0-9]-[0-9][0-9]-[0-9][0-9]*/+page.svelte'
	);

	let pages = $derived(
		Object.entries(pageModules)
			.filter(([path]) => path.includes('/3-surrender/'))
			.map(([path]) => {
				const parts = path.split('/');
				const title = parts[parts.length - 2]
					.replace(/^(?:\d+-)*/, '')
					.split('-')
					.map((word) => $cap(word) ?? '')
					.join(' ');

				const date = dayjs(parts[parts.length - 2].slice(0, 10), 'YYYY-MM-DD', true).format(
					'MMMM Do, YYYY'
				);
				// convert file system path -> route path
				// "/src/routes/(book)/1-hopeless/001/+page.svelte"
				// becomes "/1-hopeless/001"
				const routeIndex = path.indexOf('/3-surrender/');
				const href = path.slice(routeIndex).replace('/+page.svelte', '');

				return {
					title,
					href,
					date
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

<div class="surrender-navigation {navigationClass}">
	<div class="start-menu">
		{#each pages as page}
			<a class="buttons" href={page.href} on:click={toggleMenu}>
				<div>
					<div class="title">{page.title}</div>
					<div class="date">{page.date}</div>
				</div>
			</a>
		{/each}
	</div>
</div>

<style>
	.surrender-navigation {
		display: none;
		position: fixed;
		width: 100%;
		height: calc(100dvh - 56px);
		top: 0;
		left: 0;
		/* background-color: rgba(0, 0, 0, 0.6); */
		overflow-y: auto;
		padding: 40px 0 20px;
		font-family: 'Segoe UI Variable', 'Segoe UI', 'Inter';

		text-align: left;
	}
	a {
		color: white;
		text-decoration: none;
	}
	.start-menu {
		background-color: rgba(50, 49, 138, 0.8);
		width: 800px;
		max-width: 90%;
		max-height: calc(100dvh - 56px - 60px - 28px);
		overflow-y: auto;
		margin: auto;
		border-radius: 20px;
		border: 2px solid hsla(240, 5%, 40%, 0.6);

		backdrop-filter: blur(20px);
		-webkit-backdrop-filter: blur(20px); /* Safari */
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		padding: 12px;
	}
	.buttons {
		height: 30px;
		padding: 12px;
		border-radius: 4px;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		min-width: 0;
		&:hover {
			background-color: hsla(241, 20%, 60%, 0.15);
			cursor: pointer;
		}
		& > div {
			min-width: 0;
			flex: 1;
		}
	}
	.date {
		color: hsla(0, 0%, 100%, 0.9);
		font-size: 0.9em;
	}
	.title {
		min-width: 0;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.shown {
		display: block;
	}
	@media (max-width: 480px) {
		.start-menu {
			grid-template-columns: repeat(2, 1fr);
			max-height: calc(100dvh - 56px - 40px - 28px);
		}
		.surrender-navigation {
			padding: 20px 0;
		}
	}
</style>
