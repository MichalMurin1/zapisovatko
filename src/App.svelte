<script lang="ts">
	import ActDay from './components/actDay.svelte';
	import TaskList from './components/TaskList.svelte';
	import AddTaskForm from './components/AddTaskForm.svelte';

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

	const countCompleted = () => {
		let completed = tasks.filter(task => task.complete);
		completedItems = completed.length;
	}
	
	$: {
		activeDateString = makeStringOfDay(activeDate);
		tasks = tasksForDay(activeDateString);
		taskCount = tasks.length;
		countCompleted();
	}

	const handleAdd = (e) => {
		const task = e.detail;
		tasks = [...tasks, task];
		localStorage.setStuff(activeDateString, tasks);
	}

	const handleRemoveTask = (e) => {
		const index = e.detail;
		tasks.splice(index, 1)
		tasks = tasks;
		localStorage.setStuff(activeDateString, tasks);
	}

	const handleStatus = (e) => {
		tasks = e.detail;
	
		localStorage.setStuff(activeDateString, tasks);
		countCompleted();
	}

</script>

<main class="bg-gray-800 w-screen h-screen flex text-gray-300 ">
	<section class="flex mt-6 max-w-screen-xl px-8 w-full">
		<div class="w-1/4">
			<h1 class="text-center text-3xl font-bold">Zapisovatko</h1>
		</div>
		<div class="w-3/4 pt-16">
			<ActDay taskCount={taskCount} completedCount={completedItems} bind:activeDate={activeDate}></ActDay>
			
			<AddTaskForm on:add={handleAdd} />

			<div class="p-4 w-full">
				<TaskList {tasks} on:remove={handleRemoveTask} on:statusChange={handleStatus} />
			</div>
		</div>
	</section>
</main>