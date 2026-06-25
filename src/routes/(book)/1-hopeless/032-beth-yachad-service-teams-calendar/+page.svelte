<script lang="ts">
	import PrintedPage from '$lib/components/PrintedPage.svelte';
</script>

<PrintedPage>
	<h2>Beth Yachad<br />Service Teams Calendar</h2>
	<div class="key">
		<p class="accepted-position">Accepted Position</p>
		<p class="unconfirmed-position">Unconfirmed Position</p>
	</div>
	<div class="grid">
		<div>
			<div class="date">June 11, 2016</div>
			<div class="part">Vocals</div>
			<div class="names">
				<div>Worship Team</div>
				<div>
					<p class="accepted-position">Erika Gozar</p>
				</div>
			</div>
		</div>
		<div>
			<div class="date">June 18, 2016</div>
			<div class="part">Vocals</div>
			<div class="names">
				<div>Worship Team</div>
				<div>
					<p class="accepted-position">Erika Gozar</p>
					<p class="unconfirmed-position">Marisela Alvarez</p>
				</div>
			</div>
		</div>
		<div>
			<div class="date">June 25, 2016</div>
			<div class="part">Vocals</div>
			<div class="names">
				<div>Worship Team</div>
				<div>
					<p class="accepted-position">Erika Gozar</p>
					<p class="unconfirmed-position">Marisela Alvarez</p>
				</div>
			</div>
		</div>
		<div>
			<div class="date">July 2, 2016</div>
			<div class="part">Vocals</div>
			<div class="names">
				<div>Worship Team</div>
				<div>
					<p class="accepted-position">Erika Gozar</p>
				</div>
			</div>
		</div>
		<div>
			<div class="date">July 9, 2016</div>
			<div class="part">Vocals</div>
			<div class="names">
				<div>Worship Team</div>
				<div>
					<p class="accepted-position">Erika Gozar</p>
				</div>
			</div>
		</div>
		<div>
			<div class="date">July 16, 2016</div>
			<div class="part">Vocals</div>
			<div class="names">
				<div>Worship Team</div>
				<div>
					<p class="accepted-position">Erika Gozar</p>
				</div>
			</div>
		</div>
		<div>
			<div class="date">July 23, 2016</div>
			<div class="part">Vocals</div>
			<div class="names">
				<div>Worship Team</div>
				<div>
					<p class="accepted-position">Erika Gozar</p>
					<p class="unconfirmed-position">Marisela Alvarez</p>
				</div>
			</div>
		</div>
		<div>
			<div class="date">July 30, 2016</div>
			<div class="part">Vocals</div>
			<div class="names">
				<div>Worship Team</div>
				<div>
					<p class="accepted-position">Erika Gozar</p>
				</div>
			</div>
		</div>
		<div>
			<div class="date">August 6, 2016</div>
			<div class="part">Vocals</div>
			<div class="names">
				<div>Worship Team</div>
				<div>
					<p class="accepted-position">Erika Gozar</p>
					<p class="unconfirmed-position">Marisela Alvarez</p>
				</div>
			</div>
		</div>
		<div>
			<div class="date">August 13, 2016</div>
			<div class="part">Vocals</div>
			<div class="names">
				<div>Worship Team</div>
				<div>
					<p class="accepted-position">Marisela Alvarez</p>
				</div>
			</div>
		</div>
		<div>
			<div class="date">August 20, 2016</div>
			<div class="part">Vocals</div>
			<div class="names">
				<div>Worship Team</div>
				<div></div>
			</div>
		</div>
		<div>
			<div class="date">August 27, 2016</div>
			<div class="part">Vocals</div>
			<div class="names">
				<div>Worship Team</div>
				<div>
					<p class="accepted-position">Marisela Alvarez</p>
				</div>
			</div>
		</div>
		<div>
			<div class="date">September 3, 2016</div>
			<div class="part">Vocals</div>
			<div class="names">
				<div>Worship Team</div>
				<div></div>
			</div>
		</div>
		<div>
			<div class="date">September 10, 2016</div>
			<div class="part">Vocals</div>
			<div class="names">
				<div>Worship Team</div>
				<div>
					<p class="accepted-position">James Wells</p>
					<p class="accepted-position">Marisela Alvarez</p>
				</div>
			</div>
		</div>
		<div>
			<div class="date">September 17, 2016</div>
			<div class="part">Vocals</div>
			<div class="names">
				<div>Worship Team</div>
				<div></div>
			</div>
		</div>
		<div>
			<div class="date">September 24, 2016</div>
			<div class="part">Vocals</div>
			<div class="names">
				<div>Worship Team</div>
				<div>
					<p class="accepted-position">James Wells</p>
				</div>
			</div>
		</div>
		<div>
			<div class="date">October 1, 2016</div>
			<div class="part">Vocals</div>
			<div class="names">
				<div>Worship Team</div>
				<div></div>
			</div>
		</div>
	</div>
</PrintedPage>

<style>
	div.grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-template-rows: 1fr;
		gap: 16px;
		text-align: center;
	}
	div.date {
		background-color: black;
		color: white;
	}
	div.part {
		background-color: gray;
		color: white;
	}
	div.names {
		display: flex;
		flex-direction: row;
		& > div {
			width: 50%;
		}
	}
	div.date,
	div.part,
	div.names > div {
		border: 1px solid black;
	}
	p {
		margin: 0;
	}
	div.key {
		margin: 12px 0;
	}
	p.unconfirmed-position {
		color: hsl(0, 0%, 50%);
	}
</style>
