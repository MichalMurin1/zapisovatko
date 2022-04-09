<script lang="ts">
	import TiArrowLeftThick from 'svelte-icons/ti/TiArrowLeftThick.svelte';
	import TiArrowRightThick from 'svelte-icons/ti/TiArrowRightThick.svelte';

    export let activeDate = new Date();
	export let taskCount = 0;
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
	day = weekday[activeDate.getDay()];

	function handleBackClick() {
		activeDate.setDate(activeDate.getDate() - 1);
		activeDate = activeDate;
	}

	function handleForwardClick() {
		activeDate.setDate(activeDate.getDate() + 1);
		activeDate = activeDate;
	}
</script>

<div class="mx-auto max-w-xs flex mb-10 items-center">
    <div class="w-8 fill-white cursor-pointer" on:click="{handleBackClick}">
		<TiArrowLeftThick/>
	</div>
    <div class="text-center px-4">
        <p class="text-5xl mb-3">{day}</p>
        <p class="text-xl">{activeDate.getDate()}. {months[activeDate.getMonth()]}, {activeDate.getFullYear()}</p>
        <p class="text-xl">Score: {completedCount}/{taskCount} | Points: {completedCount - (taskCount - completedCount)}</p> 
    </div>
    <div class="w-8 fill-white cursor-pointer" on:click="{handleForwardClick}">
		<TiArrowRightThick/>
	</div> 
</div>