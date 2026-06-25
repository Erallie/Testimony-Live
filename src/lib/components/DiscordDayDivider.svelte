<script lang="ts">
	import type { DiscordDayDividerProps } from '$lib/types';

	let { date }: DiscordDayDividerProps = $props();
</script>

<div class="divider">
	<div><hr /></div>
	<div class="date">{date}</div>
	<div><hr /></div>
</div>

<style>
	.date {
		font-weight: 600;
		opacity: 0.6;
		font-size: 0.7em;
	}
	.divider {
		display: flex;
		margin: 0.75em 0;
		& > div:not(.date) {
			flex: 1;
		}
	}
	hr {
		opacity: 0.1;
	}
</style>
