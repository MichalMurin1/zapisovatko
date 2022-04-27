<script lang="ts">
    import {itemsStore} from './../stores/ItemStore.js';
    import { fade, scale } from 'svelte/transition';
    import { flip } from 'svelte/animate';

    // deleting a poll
    const handleDelete = (id) => {
        itemsStore.update(items => {
            return items.filter(item => item.id !== id);
        });
    };

</script>
<div>
    {#if $itemsStore && $itemsStore.length > 0}  
        {#each $itemsStore as task (task.id)}
            <div in:fade animate:flip={{duration: 300}} 
                class="p-3 border-b border-gray-700 flex items-center justify-between" >
                <label class="cursor-pointer inline-flex items-center w-full {task.complete ? 'line-through opacity-50': ''}">
                    <input type="checkbox" name="{task.id.toString()}" bind:checked="{task.complete}" class="opacity-0 absolute h-6 w-6 cursor-pointer" />
                    <div class="bg-transparent border-2 rounded border-zinc-400 w-5 h-5 flex flex-shrink-0 justify-center items-center mr-4 
                        focus-within:border-zinc-300 checkbox cursor-pointer">
                        <svg class="fill-current w-4 h-4 pointer-events-none" version="1.1" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <polyline points="4 11 8 15 16 6"></polyline>
                        </svg>
                    </div>
                    {#if task.complete}
                        <span>{task.text}</span>
                    {:else}
                        <input type="text" bind:value="{task.text}" class="bg-transparent border-none focus:outline-none w-full cursor-text">
                    {/if}
                </label>
                <span class="cursor-pointer" on:click={() => handleDelete(task.id)}>❌</span>
            </div>
        {/each}
    {:else}
        <div class="p-3 text-lg text-gray-400">There is nothing to doo bro chill or better write down some tasks :D </div>
    {/if}
</div>
