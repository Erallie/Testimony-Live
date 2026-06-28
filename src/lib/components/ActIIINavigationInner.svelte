<script lang="ts">
	import { cap } from '$lib/stores';
	import dayjs from 'dayjs';
	import advancedFormat from 'dayjs/plugin/advancedFormat';

	dayjs.extend(advancedFormat);

	type PageModule = {
		default: unknown;
	};

	type PageModuleMap = Record<string, () => Promise<PageModule>>;

	const pageModules = import.meta.glob<PageModule>(
		'/src/routes/**/202[0-9]-[0-9][0-9]-[0-9][0-9]*/+page.svelte'
	) as PageModuleMap;

	type Page = {
		title: string;
		href: string;
		date: string;
	};

	let pages: Page[] = $derived(
		Object.entries(pageModules)
			.filter(([path]) => path.includes('/3-surrender/'))
			.map(([path]) => {
				const parts = path.split('/');
				const folder = parts[parts.length - 2];

				const title = folder
					.replace(/^(?:\d+-)*/, '')
					.split('-')
					.map((word) => $cap(word) ?? '')
					.join(' ');

				const date = dayjs(
					folder.slice(0, 10),
					'YYYY-MM-DD',
					true
				).format('MMMM Do, YYYY');

				const routeIndex = path.indexOf('/3-surrender/');
				const href = path.slice(routeIndex).replace('/+page.svelte', '');

				return { title, href, date };
			})
			.sort((a, b) =>
				getPrefix(a.href).localeCompare(getPrefix(b.href))
			)
	);

	const PREFIX_REGEX = /^\d+(?:-\d+)*/;

	function getPrefix(p: string): string {
		return p.match(PREFIX_REGEX)?.[0] ?? '';
	}
</script>

<div class="surrender-navigation">
	<div class="start-menu">
		{#each pages as page}
			<a class="buttons" href={page.href}>
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
