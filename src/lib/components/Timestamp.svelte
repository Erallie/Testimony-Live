<script lang="ts">
	import type { TimestampProps } from '$lib/types';

	let { date, time }: TimestampProps = $props();
</script>

<p><strong>{date}</strong> at {time}</p>

<style>
	p {
		color: #8b8a8f;
		font-size: 0.8em;
		font-weight: 300;
		text-align: center;
		margin-top: 18px;
		margin-bottom: 10px;
	}
</style>
