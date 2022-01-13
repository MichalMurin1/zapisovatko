<script lang="ts">
    export const date = new Date();
	export let taskCount: Number;
	export let completedCount = 0;
    
    const weekday = new Array(7);
	weekday[0] = "Sunday";
	weekday[1] = "Monday";
	weekday[2] = "Tuesday";
	weekday[3] = "Wednesday";
	weekday[4] = "Thursday";
	weekday[5] = "Friday";
	weekday[6] = "Saturday";

	const months = new Array(12);
	months[0] = "Jan";
	months[1] = "Feb";
	months[2] = "Mar";
	months[3] = "Apr";
	months[4] = "May";
	months[5] = "Jun";
	months[6] = "Jul";
	months[7] = "Aug";
	months[8] = "Sep";
	months[9] = "Oct";
	months[10] = "Nov";
	months[11] = "Dec";

	let day;
	day = weekday[date.getDay()];

</script>

<div class="mx-auto max-w-xs flex mb-10 items-center">
    <div>-></div>
    <div class="text-center px-4">
        <p class="text-5xl mb-3">{day}</p>
        <p class="text-xl">{months[date.getMonth()]+' '+ date.getDate()}, {date.getFullYear()}</p>
        <p class="text-xl">Score: {completedCount}/{taskCount} | Points: {completedCount - (taskCount - completedCount)}</p> 
    </div>
    <div>-></div>
</div>