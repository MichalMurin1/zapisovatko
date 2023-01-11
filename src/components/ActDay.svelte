<script lang="ts">
	import TiArrowLeftThick from 'svelte-icons/ti/TiArrowLeftThick.svelte';
	import TiArrowRightThick from 'svelte-icons/ti/TiArrowRightThick.svelte';
	import {dateStore, itemsStore} from './../stores/ItemStore.js';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

	const progress = tweened(0, {
		duration: 400,
		easing: cubicOut
	});

	const formatter = new Intl.DateTimeFormat('en',{
		day: 'numeric',
		month: 'long',
		year: 'numeric'
	});
	
	const formatterDay = new Intl.DateTimeFormat('en', {
		weekday: 'long'
	});

	let taskCount = 0;
	let completedCount = 0;

	itemsStore.subscribe(items => {
		taskCount = items.length;

		let completed = items.filter(item => item.complete);
		completedCount = completed.length;
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

	//reactive values
	$:progress.set(completedCount / taskCount);


</script>

<div class="mx-auto max-w-sm flex mb-5 items-center justify-center">
    <div class="sm:w-8 w-5 fill-white cursor-pointer ml-0 mr-auto shrink-0" on:click="{handleBackClick}">
		<TiArrowLeftThick/>
	</div>
    <div class="text-center px-4">
        <p class="text-5xl mb-3">{formatterDay.format($dateStore)}</p>
        <p class="text-xl">{formatter.format($dateStore)}</p>
        <p class="text-xl">Score: {completedCount}/{taskCount} | Points: {completedCount - (taskCount - completedCount)}</p> 
    </div>
    <div class="sm:w-8 w-5 fill-white cursor-pointer mr-0 ml-auto shrink-0" on:click="{handleForwardClick}">
		<TiArrowRightThick/>
	</div> 
</div>

<div class="w-full h-2 rounded bg-zinc-600 mb-5 relative overflow-hidden">
	<div class="scale-0 absolute inset-0 origin-left transition-colors" 
		class:bg-red-700="{$progress < 0.34}" 
		class:bg-orange-700="{$progress > 0.34 && $progress < 0.67}"
		class:bg-green-700="{$progress > 0.67}"
		style="transform: scaleX({$progress})"
	></div>
</div>