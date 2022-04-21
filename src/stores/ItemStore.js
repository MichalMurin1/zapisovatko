import { writable } from 'svelte/store';

Storage.prototype.setStuff = function (key, value) {
    this.setItem(key, JSON.stringify(value));
}

Storage.prototype.getStuff = function (key) {
    var value = this.getItem(key);
    return value && JSON.parse(value);
}

const date = new Date();
export let dateStore = writable(date);

let dateFromStore = new Date();
dateStore.subscribe(value => {
    dateFromStore = value;
});

let storedItems = localStorage.getStuff(dateFromStore) ?? [];
console.log(storedItems);
export let itemsStore = writable([{
        complete: false,
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
    },
    {
        complete: false,
        text: 'Lorem ipsum dolor sit amet consectetur.'
    }
]);

/*dateStore.subscribe(value => {
    itemsStore = localStorage.getStuff(value) ?? [];
});*/