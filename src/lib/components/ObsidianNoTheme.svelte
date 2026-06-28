<script lang="ts">
	import type { DiaryProps } from '$lib/types';
	import { getContext } from 'svelte';
	import { allowedDates } from '$lib/stores';
	import Calendar from './Calendar.svelte';
	import ActIIINavigationInner from './ActIIINavigationInner.svelte';

	type ToggleMenuContext = {
		register: (fn: () => void) => void;
	};

	let { date, datestamp, ratingValue, ratingTotal, children }: DiaryProps = $props();

	let sidebarClass: string = $state('');
	let mainClass: string = $state('');

	const { register } = getContext<ToggleMenuContext>('toggle-menu');

	register(() => {
		const toggleSidebar = () => {
			switch (sidebarClass) {
				case '':
					sidebarClass = 'shown';
					break;
				case 'shown':
					sidebarClass = '';
					break;
			}
		};

		const toggleMain = () => {
			switch (mainClass) {
				case '':
					mainClass = 'hidden';
					break;
				case 'hidden':
					mainClass = '';
					break;
			}
		};

		toggleSidebar();
		toggleMain();
	});
</script>

<div class="obsidian">
	<div class="sidebar {sidebarClass}">
		<div class="heading"></div>
		<div class="calendar-container">
			<Calendar
				minDate="2023-10-28"
				maxDate="2026-6-02"
				currentDate={datestamp}
				{allowedDates}
				allowSelect={true}
			/>
		</div>
	</div>
	<div class="container {mainClass}">
		<div class="heading"></div>
		<div class="text">
			<h2>{date}</h2>
			{@render children?.()}
		</div>
	</div>
</div>

<div class="navigation {sidebarClass}">
	<ActIIINavigationInner />
</div>

<style>
	div.sidebar {
		background-color: rgb(38, 38, 38);
		width: 400px;
		border: 1px solid rgb(54, 54, 54);
		border-top: 0px solid rgb(54, 54, 54);
		position: relative;
		flex-shrink: 0;
		flex-grow: 0;
		& > .calendar-container {
			max-height: calc(100dvh - 40px - 20px - 2px - 56px);
			padding: 10px;
			overflow-y: auto;
		}
	}
	div.obsidian {
		color: rgb(218, 218, 218);
		display: flex;
		flex-direction: row;
		width: 100%;
		margin: 0px;
		height: calc(100dvh - 56px);
		font-family:
			ui-sans-serif,
			-apple-system,
			BlinkMacSystemFont,
			system-ui,
			'Segoe UI',
			'Google Sans Flex',
			Roboto,
			'Inter Variable',
			Inter;
	}
	div.heading {
		background-color: rgb(54, 54, 54);
		height: 40px;
		border-bottom: 1px solid rgb(54, 54, 54);
		top: 0;
		left: 0;
		width: 100%;
	}
	div.text {
		background-color: rgb(30, 30, 30);
		overflow-y: auto;
		height: calc(100dvh - 120.5px - 56px);
		padding: 40px;

		& h2 {
			text-align: left;
		}
	}
	div.container {
		position: relative;
	}

	div.navigation {
		display: none;
	}
	div.shown {
		display: block;
	}
	@media (max-width: 800px) {
		div.sidebar {
			display: none;
			width: calc(100% - 1px);
		}
		div.shown:not(.navigation) {
			display: block;
		}
		div.hidden {
			display: none;
		}
		div.navigation.shown {
			display: none;
		}
	}
</style>
