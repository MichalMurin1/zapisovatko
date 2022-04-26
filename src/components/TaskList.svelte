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
                class="p-3 border-b border-gray-700" >
                <label class="cursor-pointer {task.complete ? 'line-through opacity-50': ''}">
                    <input type="checkbox" class="mr-2" name="{task.id.toString()}" bind:checked="{task.complete}">
                    <span>{task.text}</span>
                </label>
                <span on:click={() => handleDelete(task.id)}>❌</span>
            </div>
        {/each}
    {:else}
        <div class="p-3 text-lg text-gray-400">There is nothing to doo bro chill or better write down some tasks :D </div>
    {/if}
</div>
