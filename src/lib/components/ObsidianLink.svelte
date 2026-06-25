<script lang="ts">
	import type { ObsidianLinkProps } from '$lib/types';

	let { href, target, children }: ObsidianLinkProps = $props();
</script>

<a {href} {target}>
	{@render children?.()}
</a>

<style>
	a {
		color: rgb(96, 211, 215);
		&:hover {
			color: rgb(166, 235, 231);
		}
	}
</style>
