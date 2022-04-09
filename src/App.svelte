<script lang="ts">
	import ActDay from './components/actDay.svelte';
	import Task from './components/task.svelte';

	/*let tasks = [
		{
			complete: false,
			text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
		},
		{
			complete: true,
			text: 'Lorem ipsum dolor sit amet consectetur.'
		},
		{
			complete: false,
			text: 'Lorem ipsum dolor sit amet consectetur. r sit amet consecteturr sit amet consectetur'
		}
	];*/
	
	Storage.prototype.setStuff = function (key, value) {
		this.setItem(key, JSON.stringify(value));
	}

	Storage.prototype.getStuff = function (key) {
		var value = this.getItem(key);
		return value && JSON.parse(value);
	}
	//tasks = localStorage.setStuff('items', tasks);
	let newTask: string;
	let completedItems: number;
	let activeDate = new Date();
	let tasks = [];
	let activeDayString: string;

	function makeStringOfDay(activeDate) {
		return  `${activeDate.getDate()}.${activeDate.getMonth()}.${activeDate.getFullYear()}`;
	}
	let activeDateString = makeStringOfDay(activeDate);

	function tasksForDay(dayString) {
		let tasks = localStorage.getStuff(dayString) ?? [];
		if (tasks.length < 1) {
			localStorage.setStuff(dayString,[]);
			return [];
		} else {
			return tasks;	
		}
	}

	tasks = tasksForDay(activeDateString);
	let taskCount = tasks? tasks.length : 0;
	console.log(activeDateString, tasks);

	function countCompletedItems() {
		let completedItems = 0;
		console.log(tasks);
		if(tasks || tasks.length === 0){
			completedItems = 0;
			return;
		}

		tasks.forEach(item => {
			if (item.complete) {
				completedItems += 1;
			}
		});
		
		return completedItems;
	};

	function removeFromList(index) {
		tasks.splice(index, 1)
		tasks = tasks;
		localStorage.setStuff(activeDateString, tasks);
    };

	function addItem () {
		if (newTask === '' || newTask === undefined) {
			return;
		}
		tasks = [...tasks, {text: newTask, complete: false}];

		newTask = '';
		localStorage.setStuff(activeDateString, tasks);
	};
	
	$: {
		activeDateString = makeStringOfDay(activeDate);
		tasks = tasksForDay(activeDateString);
		taskCount = tasks.length;
	}

	function changeTaskStatus () {
		console.log(tasks[parseInt(this.name)]);
		if(this.checked) {
			tasks[parseInt(this.name)].complete = true;
		} else {
			tasks[parseInt(this.name)].complete = false;
		}
		completedItems = countCompletedItems();
		localStorage.setStuff(activeDateString, tasks);
		tasks = tasks;
	}
</script>

<main class="bg-gray-800 w-screen h-screen flex text-gray-300 ">
	<section class="flex mt-6 max-w-screen-xl px-8 w-full">
		<div class="w-1/4">
			<h1 class="text-center text-3xl font-bold">Zapisovatko</h1>
		</div>
		<div class="w-3/4 pt-16">
			<ActDay taskCount={taskCount} completedCount={completedItems} bind:activeDate={activeDate}></ActDay>

			<div class="pb-4 border-b border-gray-900 flex">
				<input type="text" class="p-3 w-full bg-gray-900 placeholder-gray-600" placeholder="Add a task..." bind:value="{newTask}">
				<button class="px-6 py-2 bg-gray-500" on:click="{addItem}">Save</button>
			</div>
			<div class="p-4 w-full">
				<h3 class="text-xl text-bold mb-2">Your todays tasks: </h3>
				<ul id="js-items" class="js-items">
					{#if tasks && tasks.length > 0}
						{#each tasks as task, index}
						<li class="p-3 border-b border-gray-700">
							<label class="cursor-pointer {task.complete ? 'line-through opacity-50': ''}">
								<input type="checkbox" class="mr-2" name="{index.toString()}" on:click="{changeTaskStatus}" value="true">
								<span>{task.text}</span>
							</label>
							<span on:click={() => removeFromList(index)}>❌</span>
						</li>
						{/each}
					{:else}
						<li class="p-3 text-lg text-gray-400">There is nothing to doo bro chill or better write down some tasks :D </li>
					{/if}
				</ul>
			</div>
		</div>
	</section>
</main>