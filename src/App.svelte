<script lang="ts">
	import ActDay from './components/ActDay.svelte';
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

</script>

<main class="bg-gray-800 w-screen h-screen text-gray-300 ">
	
	<section class="px-8 w-full">
		<div class="max-w-4xl pt-16 mx-auto">
			<h1 class="text-center text-3xl w-full font-bold mb-20">Zapisovátor-bodovátor</h1>
			<ActDay></ActDay>
			
			<AddTaskForm />

			<div class="p-4 w-full">
				<TaskList />
			</div>
		</div>
	</section>
</main>