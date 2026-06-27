<script>
	import dayjs from 'dayjs';
	// import isToday from 'dayjs/plugin/isToday';
	import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
	import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
	import localeData from 'dayjs/plugin/localeData';
	import weekOfYear from 'dayjs/plugin/weekOfYear';

	import { page } from '$app/state';

	// dayjs.extend(isToday);
	dayjs.extend(isSameOrBefore);
	dayjs.extend(isSameOrAfter);
	dayjs.extend(localeData);
	dayjs.extend(weekOfYear);

	import { fly } from 'svelte/transition';

	let {
		isLoading = false,
		currentDate,
		minDate,
		maxDate,
		mode = 'single',
		allowedDates = $bindable(),
		excludedDates = $bindable(),
		allowPreviousMonth = $bindable(true),
		allowNextMonth = $bindable(true),
		selectedDates = $bindable([]),
		selectedRange = $bindable([]),
		warningDates = $bindable([]),
		allowSelect = false,
		allowRangeOverUnavailable = $bindable(false),
		allowRangeOverExcluded = $bindable(false),
		allowRangeSingleDay = $bindable(false),
		weekView = false,
		onDateChange = () => {},
		onMonthChange = () => {}
	} = $props();

	let transitionDirection = $state(0);
	let touchStartX = 0,
		touchEndX = 0;
	let hoverDate = $state(null);
	let showDatePicker = $state(false);

	// let currentDate = $state(selectedDates[0] ?? dayjs().format('YYYY-MM-DD'));

	const currentMonth = $derived(dayjs(currentDate).format('YYYY-MM'));
	const currentYear = $derived(dayjs(currentDate).format('YYYY'));
	const currentWeek = $derived(dayjs(currentDate).week());

	let currentWeekStart = $derived(dayjs(currentDate).startOf('week'));

	$inspect('currentDate', currentDate);
	$inspect('currentWeek', currentWeek);
	$inspect('currentWeekStart', currentWeekStart);

	let tempDay = $state();
	let tempMonth = $state();
	let tempYear = $state();

	const month = $derived(dayjs(currentDate).month());

	const currentDateObj = $derived(dayjs(currentDate));
	const firstDayOfWeek = $derived(dayjs.localeData().firstDayOfWeek());
	const weekdays = $derived.by(() => {
		return dayjs.weekdaysShort(true);
	});

	const year = $derived(dayjs(currentDate || dayjs()).format('YYYY'));
	const selectedMonth = $derived(dayjs(currentDate || dayjs()).format('M'));
	const selectedDay = $derived(dayjs(currentDate || dayjs()).format('D'));
	const firstDay = $derived(dayjs(currentDate).startOf('month').day());
	const minDay = $derived(minDate ? dayjs(minDate) : null);
	const maxDay = $derived(maxDate ? dayjs(maxDate) : null);
	const prevMonth = $derived(dayjs(currentDate).subtract(1, 'month'));
	const nextMonth = $derived(dayjs(currentDate).add(1, 'month'));
	const prevWeek = $derived(currentWeekStart.subtract(1, 'week'));
	const nextWeek = $derived(currentWeekStart.add(1, 'week'));

	const isPrevMonthValid = $derived(
		allowPreviousMonth &&
			(!minDay || prevMonth.isSameOrAfter(minDay.startOf('month'), 'month')) &&
			!isLoading &&
			!showDatePicker
	);

	const isNextMonthValid = $derived(
		allowNextMonth &&
			(!maxDay || nextMonth.isSameOrBefore(maxDay.startOf('month'), 'month')) &&
			!isLoading &&
			!showDatePicker
	);

	const isPrevWeekValid = $derived(
		allowPreviousMonth &&
			(!minDay || prevWeek.isSameOrAfter(minDay, 'day')) &&
			!isLoading &&
			!showDatePicker
	);

	const isNextWeekValid = $derived(
		allowNextMonth &&
			(!maxDay || nextWeek.isSameOrBefore(maxDay, 'day')) &&
			!isLoading &&
			!showDatePicker
	);

	const noAvailableDates = $derived.by(() => {
		if (isLoading) return false;
		if (Array.isArray(allowedDates)) return allowedDates.length === 0;
		return false;
	});

	const formatDate = (date) => date.format('YYYY-MM-DD');

	function isDateDisabled(date) {
		const str = date.format('YYYY-MM-DD');
		if (minDay && date.isBefore(minDay, 'day') && !allowedDates) return true;
		if (maxDay && date.isAfter(maxDay, 'day') && !allowedDates) return true;
		if (!weekView && !date.isSame(currentDate, 'month')) return true;
		if (excludedDates && excludedDates.includes(str)) return true;
		if (mode === 'range' && selectedDates.length === 1 && date.isBefore(dayjs(selectedDates[0])))
			return true;
		if (Array.isArray(allowedDates) && !allowedDates.includes(str)) return true;
		return false;
	}

	function generateDateRange(start, end) {
		if (start === end) return [start, end];

		let lastValid = getLastValidInRange(start, end);
		let range = [];
		let cur = dayjs(start);
		let last = dayjs(lastValid);
		while (cur.isSameOrBefore(last, 'day')) {
			range.push(formatDate(cur));
			cur = cur.add(1, 'day');
		}
		return range;
	}

	let matchingPages = $state([]);
	const pageModules = import.meta.glob('/src/routes/**/+page.svelte', { eager: true });
	async function selectDate(str) {
		const date = dayjs(str);
		if (isDateDisabled(date)) return;

		if (mode === 'single') {
			selectedDates = selectedDates.includes(str) ? [] : [str];
		}

		if (mode === 'multiple') {
			if (selectedDates.includes(str)) {
				selectedDates = selectedDates.filter((d) => d !== str);
			} else {
				selectedDates = [...selectedDates, str];
			}
		}

		if (mode === 'range') {
			if ((selectedDates.includes(str) && !allowRangeSingleDay) || selectedRange.length >= 2) {
				selectedDates = [];
				selectedRange = [];
			} else {
				selectedDates = [...selectedDates, str];
				selectedRange = selectedDates;
			}

			if (selectedRange.length >= 2) {
				if (dayjs(getLastValidInRange(selectedDates[0], str)).isBefore(dayjs(str))) {
					selectedDates = [];
					selectedRange = [];
				} else {
					selectedRange = [selectedDates[0], str];
					selectedDates = generateDateRange(selectedRange[0], selectedRange[1]);
				}
			}
		}

		currentDate = str;

		// #region custom code

		matchingPages = Object.entries(pageModules)
			.filter(([path]) => {
				const fileName = path.split('/').at(-2) ?? '';
				return fileName.startsWith(str);
			})
			.map(([path]) => {
				const fileName = path.split('/').at(-2) ?? '';
				// remove leading date prefix (optional but matches your structure)
				const titleSlug = fileName.replace(/^(?:\d+-)*/, '');
				const splitTitle = titleSlug.split('-');
				const cap = (s) => (s ? s[0].toUpperCase() + s.slice(1) : '');

				let title;

				if (splitTitle.length == 7 && (splitTitle[6] == 'am' || splitTitle[6] == 'pm')) {
					title =
						[cap(splitTitle[0]), cap(splitTitle[1])].join(', ') +
						' ' +
						splitTitle[2] +
						' ' +
						splitTitle[3] +
						' ' +
						splitTitle[4] +
						':' +
						splitTitle[5] +
						' ' +
						splitTitle[6].toUpperCase();
				} else {
					title = splitTitle.map((word) => cap(word) ?? '').join(' ');
				}
				console.log('title', title);
				console.log('titleSlug', titleSlug);
				return {
					path,
					title: title
				};
			});
		console.log('selected date:', str);
		console.log('matches:', matchingPages);
		// #endregion

		onDateChange({
			dates: selectedDates,
			range: selectedRange.length === 2 && mode === 'range' ? selectedRange : null
		});
	}

	function checkInRange(str) {
		if (mode === 'range' && selectedDates.length > 0) {
			let start = dayjs(selectedDates[0]);
			let end = dayjs(selectedRange[1] || hoverDate);
			let lastValid = getLastValidInRange(start, end);
			return dayjs(str).isAfter(start) && dayjs(str).isSameOrBefore(dayjs(lastValid));
		}
		return false;
	}

	function changeMonth(delta) {
		if (weekView) {
			changeWeek(delta);
			return;
		}

		if ((delta < 0 && isPrevMonthValid) || (delta > 0 && isNextMonthValid)) {
			transitionDirection = delta;
			const newMonth = dayjs(currentDate).startOf('month').add(delta, 'month');
			currentDate = newMonth.format('YYYY-MM-DD');
			onMonthChange({ date: currentMonth });
		}
	}

	function changeWeek(delta) {
		if ((delta < 0 && isPrevWeekValid) || (delta > 0 && isNextWeekValid)) {
			transitionDirection = delta;
			const newWeek = currentWeekStart.add(delta, 'week');
			currentDate = newWeek.format('YYYY-MM-DD');
			onMonthChange({ date: currentMonth });
		}
	}

	function handleSwipe(e) {
		let diff = touchStartX - touchEndX;
		if (Math.abs(diff) > 50) {
			if (weekView) {
				if (diff > 0 && isNextWeekValid && !isLoading) changeWeek(1);
				else if (diff < 0 && isPrevWeekValid && !isLoading) changeWeek(-1);
			} else {
				if (diff > 0 && isNextMonthValid && !isLoading) changeMonth(1);
				else if (diff < 0 && isPrevMonthValid && !isLoading) changeMonth(-1);
			}
		}
	}

	let getDays = () => {
		if (weekView) {
			let days = [];
			for (let i = 0; i < 7; i++) {
				days.push(currentWeekStart.add(i, 'day'));
			}
			return days;
		}

		let firstOfMonth = dayjs(currentDate).startOf('month');
		let diff = (firstOfMonth.day() - firstDayOfWeek + 7) % 7;
		let start = firstOfMonth.subtract(diff, 'day');
		let days = [];
		for (let i = 0; i < 6 * 7; i++) {
			days.push(start.add(i, 'day'));
		}
		return days;
	};

	function getLastValidInRange(start, end) {
		let cur = dayjs(start);
		let last = dayjs(end);
		let lastValid = cur;
		while (cur.isSameOrBefore(last, 'day')) {
			let str = formatDate(cur);

			if (excludedDates && excludedDates.includes(str)) {
				if (!allowRangeOverExcluded) break;
			} else if (allowedDates && !allowedDates.includes(str)) {
				if (!allowRangeOverUnavailable) break;
			} else {
				lastValid = cur;
			}
			cur = cur.add(1, 'day');
		}
		return formatDate(lastValid);
	}

	function toggleDatePicker() {
		if (!showDatePicker) {
			tempDay = currentDateObj.format('D');
			tempMonth = currentDateObj.format('M');
			tempYear = currentDateObj.format('YYYY');
		}
		showDatePicker = !showDatePicker;
	}

	function confirmDatePicker() {
		const newDate = dayjs(`${tempYear}-${tempMonth.padStart(2, '0')}-${tempDay.padStart(2, '0')}`);
		currentDate = newDate.format('YYYY-MM-DD');
		showDatePicker = false;
		onMonthChange({ date: currentMonth });
	}

	function selectorNext(type) {
		if (type === 'day') {
			tempDay = Math.min(
				dayjs(`${tempYear}-${tempMonth}-01`).daysInMonth(),
				parseInt(tempDay) + 1
			).toString();
		}
		if (type === 'month') {
			tempMonth = ((parseInt(tempMonth) % 12) + 1).toString();
		}
		if (type === 'year') {
			tempYear = (parseInt(tempYear) + 1).toString();
		}
	}

	function selectorPrevious(type) {
		if (type === 'day') {
			tempDay = Math.max(1, parseInt(tempDay) - 1).toString();
		}
		if (type === 'month') {
			tempMonth = (parseInt(tempMonth) === 1 ? 12 : parseInt(tempMonth) - 1).toString();
		}
		if (type === 'year') {
			tempYear = (parseInt(tempYear) - 1).toString();
		}
	}
</script>

<div
	class="calendar"
	ontouchstart={(e) => (touchStartX = e.touches[0].clientX)}
	ontouchend={(e) => {
		touchEndX = e.changedTouches[0].clientX;
		handleSwipe(e);
	}}
>
	<div class="calendar-header">
		<button
			aria-label={weekView ? 'Previous Week' : 'Previous Month'}
			onclick={() => changeMonth(-1)}
			class="nav-button"
			disabled={weekView ? !isPrevWeekValid : !isPrevMonthValid}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="20"
				height="20"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<path d="m15 18-6-6 6-6" />
			</svg>
		</button>

		<button type="button" onclick={toggleDatePicker} class="month-label">
			{currentDateObj.format('MMMM YYYY')}
		</button>

		<button
			aria-label={weekView ? 'Next Week' : 'Next Month'}
			onclick={() => changeMonth(1)}
			class="nav-button"
			disabled={weekView ? !isNextWeekValid : !isNextMonthValid}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="20"
				height="20"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<path d="m9 18 6-6-6-6" />
			</svg>
		</button>
	</div>

	{#if showDatePicker && allowSelect}
		<div class="date-picker">
			<div class="selector-row">
				<div class="selector">
					<button aria-label="Next Day" onclick={() => selectorNext('day')} class="selector-btn">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<path d="m18 15-6-6-6 6" />
						</svg>
					</button>
					<div class="selector-value">{tempDay}</div>
					<button
						aria-label="Previous Day"
						onclick={() => selectorPrevious('day')}
						class="selector-btn"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<path d="m6 9 6 6 6-6" />
						</svg>
					</button>
				</div>
			</div>

			<div class="selector-row">
				<div class="selector">
					<button
						aria-label="Next Month"
						onclick={() => selectorNext('month')}
						class="selector-btn"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<path d="m18 15-6-6-6 6" />
						</svg>
					</button>
					<div class="selector-value">
						{dayjs()
							.month(parseInt(tempMonth) - 1)
							.format('MMM')}
					</div>
					<button
						aria-label="Previous Month"
						onclick={() => selectorPrevious('month')}
						class="selector-btn"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<path d="m6 9 6 6 6-6" />
						</svg>
					</button>
				</div>
			</div>

			<div class="selector-row">
				<div class="selector">
					<button aria-label="Next Year" onclick={() => selectorNext('year')} class="selector-btn">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<path d="m18 15-6-6-6 6" />
						</svg>
					</button>
					<div class="selector-value">{tempYear}</div>
					<button
						aria-label="Previous Year"
						onclick={() => selectorPrevious('year')}
						class="selector-btn"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<path d="m6 9 6 6 6-6" />
						</svg>
					</button>
				</div>
			</div>

			<div class="picker-actions">
				<button aria-label="Cancel" onclick={toggleDatePicker} class="picker-btn cancel">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<path d="M18 6 6 18" />
						<path d="m6 6 12 12" />
					</svg>
				</button>

				<button aria-label="Confirm Date" onclick={confirmDatePicker} class="picker-btn confirm">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<path d="M20 6 9 17l-5-5" />
					</svg>
				</button>
			</div>
		</div>
	{:else}
		<div class="weekdays">
			{#each weekdays as d, index}
				{@const isSundayHeader = (7 - firstDayOfWeek) % 7 === index}
				<div class:weekday-sunday={isSundayHeader}>{d}</div>
			{/each}
		</div>

		<div class="calendar-grid">
			{#if noAvailableDates}
				<div class="no-dates">
					No available dates this {weekView ? 'week' : 'month'}
				</div>
			{/if}

			{#key weekView ? currentWeek : currentMonth}
				<div
					class="calendar-month"
					in:fly={{ x: transitionDirection * 200, duration: 400 }}
					out:fly={{ x: transitionDirection * -200, duration: 200 }}
				>
					<div class:week-grid={weekView} class:month-grid={!weekView}>
						{#each getDays() as date (date.format('YYYY-MM-DD'))}
							{@const str = date.format('YYYY-MM-DD')}
							<!-- {@const isCurrent = date.isToday()} -->
							{@const isCurrent = str == currentDate}
							{@const isDisabled = isDateDisabled(date)}
							{@const isSelected = selectedDates.includes(str)}
							{@const isInRange = checkInRange(str)}
							{@const isSunday = date.day() === 0}
							<button
								disabled={isDisabled}
								onclick={() => selectDate(str)}
								onmouseover={() => (hoverDate = str)}
								onfocus={() => (hoverDate = str)}
								class="day-button"
								class:is-disabled={isDisabled}
								class:is-selected={(isSelected && !isInRange) || selectedRange.includes(str)}
								class:is-inrange={isInRange && !selectedRange.includes(str)}
								class:sunday={isSunday && !isSelected && !isInRange && !isDisabled}
							>
								{date.date()}
								{#if isCurrent}
									<span class:is-current={isSelected} class:is-current-unselected={!isSelected}
									></span>
								{/if}
								{#if warningDates.includes(str)}
									<span class="warning-dot"></span>
								{/if}
							</button>
						{/each}
					</div>
				</div>
			{/key}
		</div>
	{/if}
</div>

{#if matchingPages?.length}
	<div class="page-previews">
		{#each matchingPages as p}
			<div class="preview">
				{p.title}
			</div>
		{/each}
	</div>
{/if}

<style>
	.calendar {
		display: flex;
		flex-direction: column;
		width: 100%;
		max-width: 400px;
		margin: 0 auto;
		font-size: 14px;
		font-weight: 400;
	}

	.calendar-header {
		display: flex;
		width: 100%;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 8px;
	}

	.nav-button {
		padding: 8px;
		border: none;
		background: transparent;
		cursor: pointer;
		border-radius: 8px;
		transition: background 0.2s ease;
		color: #b0b0b0;
	}

	.nav-button:hover {
		background: rgba(255, 255, 255, 0.06);
	}

	.nav-button:disabled {
		opacity: 0.2;
		pointer-events: none;
	}

	.month-label {
		background: transparent;
		border: none;
		cursor: pointer;
		display: flex;
		align-items: center;
		gap: 8px;
		font-size: 18px;
		font-weight: 600;
		text-transform: capitalize;
		color: #b0b0b0;
	}

	.date-picker {
		display: flex;
		flex-direction: column;
		gap: 12px;
		padding: 24px;
		align-items: center;
		justify-content: center;
		min-height: 192px;
	}

	.selector-row {
		display: flex;
		flex-direction: row;
		gap: 32px;
		align-items: center;
	}

	.selector {
		display: flex;
		flex-direction: column;
		align-items: center;
		/* gap: 8px; */
	}

	.selector-btn {
		padding: 4px;
		border: none;
		background: transparent;
		cursor: pointer;
		border-radius: 6px;
		transition: background 0.2s ease;
	}

	.selector-btn:hover {
		background: rgba(0, 0, 0, 0.06);
	}

	.selector-value {
		font-size: 28px;
		font-weight: 700;
		padding: 8px 0;
		/* width: 48px; */
		text-align: center;
	}

	.picker-actions {
		display: flex;
		flex-direction: row;
		gap: 12px;
	}

	.picker-btn {
		padding: 8px;
		border-radius: 12px;
		border: 1px solid #ddd;
		background: #fff;
		cursor: pointer;
		transition: background 0.2s ease;
	}

	.picker-btn:hover {
		background: rgba(0, 0, 0, 0.06);
	}

	.picker-btn.cancel {
		border-color: #ccc;
	}

	.picker-btn.confirm {
		border-color: #0070f3;
		background: #0070f3;
		color: white;
	}

	.weekdays {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		gap: 8px;
		font-weight: 500;
		color: #6b7280;
	}

	.weekday-sunday {
		color: #ef4444;
	}

	.calendar-grid {
		position: relative;
		width: 100%;
		margin-top: 8px;
		overflow: hidden;
	}

	.no-dates {
		position: absolute;
		background: #fff;
		color: #111;
		border: 1px solid #ddd;
		border-radius: 16px;
		padding: 16px;
		display: flex;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
		pointer-events: none;
		z-index: 20;
	}

	.month-grid {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		grid-template-rows: repeat(6, 1fr);
		gap: 8px;
		text-align: center;
		align-items: center;
	}

	.week-grid {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		grid-template-rows: repeat(1, 1fr);
		gap: 8px;
		text-align: center;
		align-items: center;
	}

	.day-button {
		padding: 8px;
		width: 100%;
		aspect-ratio: 1 / 1;
		max-width: 44px;
		border-radius: 10px;
		border: 1px solid transparent;
		font-size: 14px;
		font-weight: 600;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		transition:
			border 0.1s ease,
			background 0.1s ease;
		position: relative;
	}

	.day-button:hover {
		border-color: #9ca3af;
	}

	.day-button.is-disabled {
		pointer-events: none;
		color: #9ca3af;
	}

	.day-button.is-selected {
		background: #111827;
		color: #fff;
	}

	.day-button.is-inrange {
		background: #e5e7eb;
		color: #6b7280;
	}

	.day-button.sunday {
		color: #ef4444;
	}

	.day-button span {
		position: absolute;
		bottom: 4px;
		left: 50%;
		transform: translateX(-50%);
		width: 6px;
		height: 6px;
		border-radius: 999px;
	}

	.day-button span.is-current {
		background: #fff;
	}

	.day-button span.is-current-unselected {
		background: #111827;
	}

	.warning-dot {
		position: absolute;
		bottom: 4px;
		left: 50%;
		transform: translateX(-50%);
		width: 6px;
		height: 6px;
		border-radius: 999px;
		background: #f59e0b;
	}

	@media (max-width: 480px) {
		.calendar {
			max-width: 100%;
		}

		.selector-row {
			gap: 18px;
		}
	}
	button {
		font-family: inherit;
	}
</style>
