<script lang="ts">
	import IPhone from '$lib/components/iPhone.svelte';
	import IPhoneTexts from '$lib/components/IPhoneTexts.svelte';
	import PaperSnippet from '$lib/components/PaperSnippet.svelte';
	import SentText from '$lib/components/SentText.svelte';
	import Timestamp from '$lib/components/Timestamp.svelte';
</script>

<IPhone>
	<IPhoneTexts contact="Music Video Group Chat">
		<Timestamp date="Sep 5, 2016" time="3:44 PM" />
		<SentText>
			<p>Guys, there’s a possibility that we might resume practices come summer.</p>
		</SentText>
		<SentText>I’ll let you know when I find out.</SentText>
		<Timestamp date="Sep 5, 2016" time="10:30 PM" />
		<div>
			<p class="name">Cole</p>
			<img src="/hopeless/thumbs-up.webp" alt="Thumbs Up" />
		</div>
	</IPhoneTexts>
</IPhone>
<PaperSnippet><p class="caption">I never replied.</p></PaperSnippet>

<style>
	p.name {
		color: #8b8a8f;
		font-size: 0.8em;
		font-weight: 300;
		margin: 10px 0;
	}
	img {
		width: 60px;
	}
</style>
