<script lang="ts">
	import type { DiaryProps } from '$lib/types';
	import Calendar from './Calendar.svelte';

	let { date, datestamp, ratingValue, ratingTotal, images, children }: DiaryProps = $props();

	let openImage: string | null = $state(null);

	function clickImage(src: string) {
		openImage = src;
	}

	function closeModal() {
		openImage = null;
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			closeModal();
		}
	}
	function handleModalClick() {
		closeModal();
	}

	import { allowedDates } from '$lib/stores';
</script>

<div class="diarium">
	<div class="sidebar">
		<Calendar
			minDate="2024-1-17"
			maxDate="2026-1-19"
			currentDate={datestamp}
			{allowedDates}
			allowSelect={true}
		/>
	</div>
	<div>
		<div class="date">
			<p>{date}</p>
		</div>
		<div class="bar"></div>
		<div class="text">
			{@render children?.()}

			{#if images}
				<div>
					{#each images as image}
						<button on:click={() => clickImage(image)}>
							<img src={image} alt={image.split('/').pop()} />
						</button>
					{/each}
				</div>
			{/if}
		</div>
	</div>
	{#if openImage}
		<div class="modal-backdrop" on:click={closeModal} on:keydown={handleKeydown} tabindex="0">
			<div class="modal-content" on:click={handleModalClick}>
				<img src={openImage} alt="Expanded image" />
			</div>
		</div>
	{/if}
</div>

<style>
	div.date {
		background-color: #6b69d6;
		font-weight: 600;
		height: 80px;
		position: relative;
		& > p {
			position: absolute;
			margin: 0;
			bottom: 8px;
			left: 16px;
			font-size: 0.95em;
		}
	}
	div.sidebar {
		background-color: #21201f;
		width: 400px;
		box-sizing: border-box;
		flex-shrink: 0;
		flex-grow: 0;
		padding: 10px;
	}
	div.bar {
		background-color: #504ea0;
		height: 8px;
	}
	div.text {
		background-color: #171717;
		overflow-y: auto;
		height: calc(100dvh - 88px);
		padding: 18px;
		box-sizing: border-box;
	}
	div.diarium {
		color: white;
		display: flex;
		flex-direction: row;
		width: 100%;
		margin: 0;
		/* box-sizing: border-box; */
	}
	button {
		aspect-ratio: 1/1;
		width: 100px;
		border: none;
		border-radius: 4px;
		overflow: hidden;
		margin: -12px 2px;
		margin-top: -2px;
		background: none;
		padding: 0;
		cursor: pointer;
		& > img {
			width: 100%;
			height: 100%;
			object-fit: cover;
			display: block;
		}
		&:first-of-type {
			margin-left: -12px;
		}
		&:last-of-type {
			margin-right: -12px;
		}
	}

	.modal-backdrop {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.85);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1000;
	}

	.modal-content {
		max-width: 90vw;
		max-height: 90vh;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.modal-content img {
		max-width: 90vw;
		max-height: 90vh;
		width: auto;
		height: auto;
		object-fit: contain;
		border-radius: 6px;
	}
</style>
