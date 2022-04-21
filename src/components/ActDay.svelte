<script lang="ts">
	import TiArrowLeftThick from 'svelte-icons/ti/TiArrowLeftThick.svelte';
	import TiArrowRightThick from 'svelte-icons/ti/TiArrowRightThick.svelte';

	import {dateStore, itemsStore} from './../stores/ItemStore.js';
	

	const formatter = new Intl.DateTimeFormat('en',{
		day: 'numeric',
		month: 'long',
		year: 'numeric'
	});
	
	const formatterDay = new Intl.DateTimeFormat('en', {
		weekday: 'long'
	});

	export let taskCount = 0;
	export let completedCount = 0;

	itemsStore.subscribe(items => {
		taskCount = items.length;

		let completed = items.filter(item => item.complete);
		completedCount = completed.length;
		console.log(items);
	});
    
	function handleBackClick() {
		let date = new Date($dateStore);
		date.setDate(date.getDate() - 1);
		dateStore.set(date);
	}

	function handleForwardClick() {
		let date = new Date($dateStore);
		date.setDate(date.getDate() + 1);
		dateStore.set(date);
	}
</script>

<div class="mx-auto max-w-sm flex mb-10 items-center justify-center">
    <div class="w-8 fill-white cursor-pointer ml-0 mr-auto" on:click="{handleBackClick}">
		<TiArrowLeftThick/>
	</div>
    <div class="text-center px-4">
        <p class="text-5xl mb-3">{formatterDay.format($dateStore)}</p>
        <p class="text-xl">{formatter.format($dateStore)}</p>
        <p class="text-xl">Score: {completedCount}/{taskCount} | Points: {completedCount - (taskCount - completedCount)}</p> 
    </div>
    <div class="w-8 fill-white cursor-pointer mr-0 ml-auto" on:click="{handleForwardClick}">
		<TiArrowRightThick/>
	</div> 
</div>