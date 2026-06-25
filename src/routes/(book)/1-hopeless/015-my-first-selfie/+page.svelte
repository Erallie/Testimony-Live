<script lang="ts">
	import PaperSnippet from '$lib/components/PaperSnippet.svelte';
	import Polaroid from '$lib/components/Polaroid.svelte';
</script>

<PaperSnippet>
	<h2>My First Selfie</h2></PaperSnippet
>
<Polaroid source="/hopeless/my-first-selfie.webp" alt="My First Selfie" width={300}>
	<p class="caption">
		This was taken backstage in the theater office on Friday, April 10, 2015, our school’s opening
		night of <em>A Little Shop of Horrors,</em> one of BASIS Peoria’s best shows, in which I starred
		as Audrey, the leading female role. The crew is doing my hair and makeup for the show, which would
		start in a couple hours. I am in the bottom right corner.
	</p>
</Polaroid>
