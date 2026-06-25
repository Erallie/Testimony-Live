<script lang="ts">
	import PrintedPage from '$lib/components/PrintedPage.svelte';
</script>

<PrintedPage>
	<p class="homework-signature">
		Student: Erika Gozar (4666)<br />
		Grade: 9<br />
		June 2, 2015
	</p>
	<h2>Final Progress Report<br />2014-2015</h2>
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
				<th>AP Calculus AB</th>
				<th>A / 94</th>
				<th>A / 97</th>
				<th>A / 97</th>
				<th>--</th>
				<th>A / 96</th>
			</tr>
			<tr>
				<th>AP Physics 1</th>
				<th>A / 93</th>
				<th>B+ / 89</th>
				<th>A / 98</th>
				<th>--</th>
				<th>A / 93</th>
			</tr>
			<tr>
				<th>AP US Government</th>
				<th>B / 84</th>
				<th>B- / 81</th>
				<th>C / 76</th>
				<th>--</th>
				<th>B- / 80</th>
			</tr>
			<tr>
				<th>Drama</th>
				<th>A / 98</th>
				<th>A / 99</th>
				<th>A / 100</th>
				<th>--</th>
				<th>A / 99</th>
			</tr>
			<tr>
				<th>Honors English Language</th>
				<th>B+ / 89</th>
				<th>A- / 90</th>
				<th>A- / 91</th>
				<th>--</th>
				<th>A- / 90</th>
			</tr>
			<tr>
				<th>Honors English Literature</th>
				<th>B / 84</th>
				<th>A- / 91</th>
				<th>B / 85</th>
				<th>--</th>
				<th>B+ / 87</th>
			</tr>
			<tr>
				<th>Spanish I</th>
				<th>B / 86</th>
				<th>A / 98</th>
				<th>A / 97</th>
				<th>A / 98</th>
				<th>A / 96</th>
			</tr>
		</tbody>
	</table>
	<table class="final-average">
		<tbody>
			<tr>
				<th class="empty-space"></th>
				<th class="final-grade"><strong>Student Final Average: 3.67</strong> / 4.0</th>
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
				<th>Drama</th>
				<th>Madelyn Stanley</th>
				<th>It’s been amazing to see the growth in Erika this year. She’s a delight.</th>
			</tr>
		</tbody>
	</table>
	<br />
	<div class="stamp">
		<h3>Congratulations</h3>
		You have met the<br />
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
		color: hsl(175, 100%, 34%);
	}
</style>
