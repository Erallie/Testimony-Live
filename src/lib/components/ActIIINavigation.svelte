<script lang="ts">
	import { getContext } from 'svelte';
	import ActIIINavigationInner from './ActIIINavigationInner.svelte';

	let navigationClass: string = $state('');

	const { register } = getContext('toggle-menu');
	register(() => {
		switch (navigationClass) {
			case '':
				navigationClass = 'shown';
				break;
			case 'shown':
				navigationClass = '';
				break;
		}
	});

	function toggleMenu() {
		switch (navigationClass) {
			case '':
				navigationClass = 'shown';
				break;
			case 'shown':
				navigationClass = '';
				break;
		}
	}
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
