<script lang="ts">
	import PaperSnippet from '$lib/components/PaperSnippet.svelte';
	import StandaloneImage from '$lib/components/StandaloneImage.svelte';
</script>

<PaperSnippet>
	<h2>Drawing from Band Class</h2>
</PaperSnippet>
<StandaloneImage source="/hopeless/band-drawing.webp" alt="Band Drawing" width={600} />
<PaperSnippet>
	<p class="caption">
		Drawn Thursday, September 22, 2016. The band teacher prompted the class to draw a picture of
		“the way [they felt] being in Upper School Band [that] year” when finished with a Music Theory
		worksheet.
	</p>
	<p class="caption">
		<strong>Note:</strong> In music,
		<img class="quarter-rest" src="/hopeless/quarter-rest.webp" alt="quarter rest" /> denotes a quarter
		rest, during which the instrumentalist does not play.
	</p>
</PaperSnippet>

<style>
	img.quarter-rest {
		height: 1.2em;
	}
</style>
