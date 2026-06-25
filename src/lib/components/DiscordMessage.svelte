<script lang="ts">
	import type { DiscordMessageProps } from '$lib/types';

	let { username, profilePicSrc, timestamp, children }: DiscordMessageProps = $props();
</script>

<div class="discord-message">
	<div class="pfp-column">
		<div class="rounded-pfp"><img src={profilePicSrc} alt="{username}-pfp" /></div>
	</div>
	<div class="text-column">
		<div class="title">
			<div class="username">{username}</div>
			<div class="timestamp">{timestamp}</div>
		</div>
		<div class="discord-messages">
			{@render children?.()}
		</div>
	</div>
</div>

<style>
	.discord-message {
		display: flex;
		flex-direction: columns;
		gap: 1em;
		margin-bottom: 1em;
		& > .pfp-column {
			width: 3em;
			flex-grow: 0;
			flex-shrink: 0;
			& > .rounded-pfp {
				width: 100%;
				aspect-ratio: 1/1;
				border-radius: 40px;
				overflow: hidden;
			}
		}
	}
	img {
		width: 100%;
	}
	.title {
		display: flex;
		justify-content: left;
		gap: 0.5em;
		& > .username {
			font-weight: 600;
		}
		& > .timestamp {
			font-size: 0.8em;
			opacity: 0.6;
			font-weight: 300;
		}
	}

	.discord-messages {
		font-size: 0.925em;
		line-height: 1.5em;
	}
</style>
