<script lang="ts">
	import type { TextProps } from '$lib/types';
	import Portal from 'svelte-portal';

	let { contact, children }: TextProps = $props();
</script>

<Portal target="body">
	<div class="texts">
		<div class="heading"><h2>{contact}</h2></div>
		{@render children?.()}
	</div>
</Portal>

<style>
	div.texts {
		background-color: #323339;

		overflow-y: auto;
		padding: 60px 20px;
		margin: 0;
		color: white;
		font-family: 'Inter';
	}
	div.heading {
	}

	/* div.textbox,
	div.heading {
		backdrop-filter: blur(20px);
	} */
</style>
