<script lang="ts">
	import type { NotesProps } from '$lib/types';

	let { title, children }: NotesProps = $props();
</script>

<div class="notes-background">
	<div class="notes-container">
		<div class="heading">{title}</div>
		<div class="children">
			{@render children?.()}
		</div>
	</div>
</div>

<style>
	div.notes-background {
		width: 100%;
		height: calc(100dvh - 56px);
		top: 0;
		left: 0;
		overflow-y: auto;
		background-color: rgb(32, 32, 32);
	}
	div.notes-container {
		width: 800px;
		max-width: calc(90% - 20px);
		margin: 20px auto;
		background-color: #5b5fa8;
		color: white;
		overflow: clip;
		font-family: 'Open Sans';
		padding: 20px;
		padding-top: 0;
		font-size: 1.2em;
	}

	div.heading {
		width: 100%;
		position: sticky;
		text-align: center;
		font-size: 1.2em;
		font-weight: bold;
		background-color: #5b5fa8;
		top: 0;
		padding: 20px;
	}

	div.children {
		margin: 20px 40px;
		line-height: 1.75em;
	}

	@media (max-width: 480px) {
		div.children {
			margin: 20px 0;
		}
	}
</style>
