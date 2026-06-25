<script lang="ts">
	import PrintedPage from '$lib/components/PrintedPage.svelte';
</script>

<PrintedPage>
	<h2>
		Primavera Online<br />
		Complete List of Submitted Coursework
	</h2>
	<table>
		<thead>
			<tr>
				<th>Assignment</th>
				<th>Date Submitted</th>
				<th>Score</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<th>Synchronous/Asynchronous Session 1</th>
				<th>--</th>
				<th>100% A+</th>
			</tr>
			<tr>
				<th>Pretest</th>
				<th>Jul 6, 2016</th>
				<th>80% B-</th>
			</tr>
			<tr>
				<th>Workbook 01</th>
				<th>Jul 7, 2016</th>
				<th>100% A+</th>
			</tr>
			<tr>
				<th>Checkpoint 01</th>
				<th>Jul 8, 2016</th>
				<th>100% A+</th>
			</tr>
		</tbody>
	</table>
</PrintedPage>

<style>
	table {
		width: 100%;
	}
</style>
