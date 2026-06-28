<script lang="ts">
	import { getContext } from 'svelte';
	import ActIIINavigationInner from './ActIIINavigationInner.svelte';

	type ToggleMenuContext = {
		register: (fn: () => void) => void;
	};

	let navigationClass = $state('');

	const context = getContext('toggle-menu') as ToggleMenuContext | undefined;

	if (!context) {
		throw new Error('toggle-menu context is missing');
	}

	const { register } = context;

	const toggle = (): void => {
		navigationClass = navigationClass === 'shown' ? '' : 'shown';
	};

	register(toggle);
</script>

<div class="actiii-navigation {navigationClass}">
	<ActIIINavigationInner />
</div>

<style>
	.actiii-navigation {
		display: none;
	}
	.shown {
		display: block;
	}
</style>
