<script>
    import { createEventDispatcher } from "svelte";
    let dispatch = createEventDispatcher();
    export let tasks = [];

    const statusChange = (e) => {  
        tasks[e.target.name].complete = e.target.checked;
        dispatch("statusChange", tasks);
    }
</script>


<ul>
    {#if tasks && tasks.length > 0}
        
            {#each tasks as task, index}
            <li class="p-3 border-b border-gray-700">
                <label class="cursor-pointer {task.complete ? 'line-through opacity-50': ''}">
                    <input type="checkbox" class="mr-2" name="{index.toString()}" bind:checked="{task.complete}" on:click|self={statusChange}>
                    <span>{task.text}</span>
                </label>
                <span on:click={() => dispatch('remove', index)}>❌</span>
            </li>
            {/each}
    {:else}
        <li class="p-3 text-lg text-gray-400">There is nothing to doo bro chill or better write down some tasks :D </li>
    {/if}
</ul>
