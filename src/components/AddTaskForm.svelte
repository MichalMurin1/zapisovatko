<script lang="ts">
import {itemsStore} from './../stores/ItemStore.js';


let uid = 0;
let text = '';
let error = '';

if($itemsStore.length > 0) {
    $itemsStore.forEach(element => { uid = uid < element.id? element.id : uid;  });
}

const submitHandler = () => {
    if (text == '') {
        error = 'You need to fill what to doo :D';
        return;
    }
    error = '';

    itemsStore.update(currentItems => {
        let task = {id: ++uid, text: text, complete: false};
        return [...currentItems, task];
    });

    text = '';
}

</script>

<form on:submit|preventDefault={submitHandler} class="pb-4 mb-4 border-b border-gray-400 flex">
    <input 
        type="text" 
        class="p-3 w-full bg-zinc-800 placeholder-gray-500 focus:outline-none focus:ring-1 ring-zinc-700 rounded-l-md" 
        placeholder="Add a task..." 
        bind:value="{text}"
    >
    <button class="px-6 py-2 bg-green-900 rounded-r-md hover:bg-green-700 transition-colors">Save</button>
</form>
<div class="font-bold text-sm text-red-600">{error}</div>