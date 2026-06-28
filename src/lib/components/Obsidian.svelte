<script lang="ts">
	import type { DiaryProps } from '$lib/types';
	import { getContext } from 'svelte';
	import { allowedDates } from '$lib/stores';
	import Calendar from './Calendar.svelte';

	let { date, datestamp, ratingValue, ratingTotal, children }: DiaryProps = $props();
	let sidebarClass: string = $state('');

	const { register } = getContext('toggle-menu');
	register(() => {
		switch (sidebarClass) {
			case '':
				sidebarClass = 'shown';
				break;
			case 'shown':
				sidebarClass = '';
				break;
		}
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
	<div class="container">
		<div class="heading"></div>
		<div class="text">
			<h2>{date}</h2>
			{@render children?.()}
		</div>
	</div>
</div>

<style>
	div.sidebar {
		background-color: #343267;
		width: 400px;
		border: 1px solid #23223f;
		border-top: 0px solid #23223f;
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
		color: hsl(0, 0%, 85%);
		display: flex;
		flex-direction: row;
		width: 100%;
		margin: 0px;
		height: calc(100dvh - 56px);
	}
	div.heading {
		background-color: #37356e;
		height: 40px;
		border-bottom: 1px solid #23223f;
		top: 0;
		left: 0;
		width: 100%;
	}
	div.text {
		background-color: #2b2956;
		overflow-y: auto;
		height: calc(100dvh - 121px - 56px);
		padding: 40px;

		& h2 {
			text-align: left;
		}
	}
	div.container {
		position: relative;
	}
	@media (max-width: 480px) {
		.sidebar {
			display: none;
		}
		.shown {
			display: block;
		}
	}
</style>
