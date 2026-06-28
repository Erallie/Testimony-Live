<script lang="ts">
	import type { TextProps } from '$lib/types';

	let { contact, children }: TextProps = $props();
</script>

<div class="texts">
	<div class="heading"><h2>{contact}</h2></div>
	<div class="container">
		{@render children?.()}
	</div>
	<div class="textbox"></div>
</div>

<style>
	div.texts {
		background-color: white;
		position: relative;
		height: 312px;
		border-radius: 40px;
		overflow: hidden;
	}
	div.container {
		height: 100%;
		box-sizing: border-box;
		overflow-y: auto;
		padding: 60px 20px 56px 60px;
	}
	div.heading {
		/* background-color: rgba(241, 241, 241, 80%); */
		background: linear-gradient(
			to bottom,
			rgba(255, 255, 255, 0.8) 0%,
			rgba(255, 255, 255, 0.6) 50%,
			rgba(255, 255, 255, 0) 100%
		);
		/* background-color: gray; */
		text-align: center;
		height: 80px;
		/* border-bottom: 1px solid hsl(240, 5%, 80%); */
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		& > h2 {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			margin: 0;
			font-size: 1em;
			font-weight: 500;
			background-color: rgba(255, 255, 255, 0.8);
			/* backdrop-filter: blur(1px); */
			border-radius: 20px;
			border: 2px solid white;
			padding: 8px 12px;
			box-shadow: 0px 6px 20px 10px rgba(100, 100, 100, 0.1);
		}
	}
	div.textbox {
		/* background-color: rgba(255, 255, 255, 80%); */
		background: linear-gradient(
			to top,
			rgba(255, 255, 255, 0.8) 0%,
			rgba(255, 255, 255, 0.6) 50%,
			rgba(255, 255, 255, 0) 100%
		);
		height: 56px;
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
	}

	/* div.textbox,
	div.heading {
		backdrop-filter: blur(20px);
	} */
</style>
