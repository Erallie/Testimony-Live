<script lang="ts">
	import PrintedPage from '$lib/components/PrintedPage.svelte';
</script>

<PrintedPage>
	<p class="homework-signature">
		Student: Erika Gozar (4666)<br />
		Grade: 9<br />
		June 2, 2015
	</p>
	<h2>Final Progress Report<br />2015-2016</h2>
	<table>
		<thead>
			<tr>
				<th>Course Name</th>
				<th>Tri 1</th>
				<th>Tri 2</th>
				<th>Tri 3</th>
				<th>Final Exam</th>
				<th>Total</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<th>AP English Language & Composition</th>
				<th>F / 59</th>
				<th>D / 65</th>
				<th>F / 55</th>
				<th>F / 16</th>
				<th>F / 45</th>
			</tr>
			<tr>
				<th>AP European History</th>
				<th>F / 48</th>
				<th>F / 10</th>
				<th>F / 32</th>
				<th>--</th>
				<th>F / 30</th>
			</tr>
			<tr>
				<th>AP Physics 2</th>
				<th>C / 76</th>
				<th>C+ / 77</th>
				<th>C / 74</th>
				<th>--</th>
				<th>C / 76</th>
			</tr>
			<tr>
				<th>Biology Honors</th>
				<th>A- / 92</th>
				<th>B / 83</th>
				<th>C / 75</th>
				<th>A / 96</th>
				<th>B / 86</th>
			</tr>
			<tr>
				<th>Choir</th>
				<th>A / 97</th>
				<th>A / 100</th>
				<th>A / 98</th>
				<th>--</th>
				<th>A / 96</th>
			</tr>
			<tr>
				<th>Differential Equations</th>
				<th>A / 98</th>
				<th>A / 98</th>
				<th>A / 100</th>
				<th>--</th>
				<th>A / 99</th>
			</tr>
			<tr>
				<th>Spanish III</th>
				<th>A / 94</th>
				<th>B- / 81</th>
				<th>A / 94</th>
				<th>A- / 92</th>
				<th>A- / 91</th>
			</tr>
		</tbody>
	</table>
	<table class="final-average">
		<tbody>
			<tr>
				<th class="empty-space"></th>
				<th class="final-grade"><strong>Student Final Average: 2.38</strong> / 4.0</th>
			</tr>
		</tbody>
	</table>

	<br />
	<table>
		<thead>
			<tr>
				<th>Course Name</th>
				<th>Teacher</th>
				<th>Comments</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<th>AP European History</th>
				<th>Eva Pelter</th>
				<th>Student has not turned in anything since 10/26/15.</th>
			</tr>
		</tbody>
	</table>
	<br />
	<div class="stamp">
		<h3>You Have Failed</h3>
		To meet the<br />
		BASIS School Criteria<br />
		For Promotion
	</div>
</PrintedPage>

<style>
	.empty-space {
		width: 50%;
	}
	.final-grade {
		text-align: right;
	}
	table {
		width: 100%;
		&.final-average {
			border-top: none;
			& th {
				border-top: none;
			}
		}
	}
	.stamp {
		color: hsl(0, 100%, 50%);
	}
</style>
