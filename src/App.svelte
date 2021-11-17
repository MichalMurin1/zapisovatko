<script lang="ts">
	import ActDay from './components/ActDay.svelte';
	export let item: string;
	export let tasks: [];
	
</script>

<main class="bg-gray-800 text-white w-screen h-screen flex text-gray-300">
	<section class="flex mt-6 max-w-screen-xl px-8 w-full">
		<div class="w-1/4">
			<h1 class="text-center text-3xl font-bold">Zapisovatko</h1>
		</div>
		<div class="w-3/4 pt-16">
			<ActDay></ActDay>

			<div class="pb-4 border-b border-gray-900">
				<input type="text" class="p-3 w-full bg-gray-900 placeholder-gray-600" placeholder="Add a task...">
			</div>
			<div class="p-4 w-full">
				<h3 class="text-xl text-bold mb-2">Your todays tasks: </h3>
				<ul id="js-items" class="js-items">
					<li class="p-3 border-b border-gray-700">
						<label class="cursor-pointer">
							<input type="checkbox" class="mr-2" value="1" name="task-1">
							<span>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro, quae?</span>
						</label>
					</li>
					<li class="p-3 border-b border-gray-700">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro, quae?</li>
					<li class="p-3 border-b border-gray-700">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro, quae?</li>
					<li class="p-3 border-b border-gray-700">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro, quae?</li>
				</ul>
			</div>
		</div>
	</section>
</main>