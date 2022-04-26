import { writable } from 'svelte/store';

Storage.prototype.setStuff = function (key, value) {
    this.setItem(key, JSON.stringify(value));
}

Storage.prototype.getStuff = function (key) {
    let value = this.getItem(key);
    return value && JSON.parse(value);
}

const date = new Date();
export let dateStore = writable(date);

let dateFromStore = new Date();
dateStore.subscribe(value => {
    dateFromStore = value;
});

const formatter = new Intl.DateTimeFormat('en',{
    day: 'numeric',
    month: 'numeric',
    year: 'numeric'
});


let storedItems = localStorage.getStuff(formatter.format(dateFromStore)) ?? [];

export let itemsStore = writable(storedItems);

dateStore.subscribe(val => {
    storedItems = localStorage.getStuff(formatter.format(val)) ?? [];
    itemsStore.set(storedItems);
});

itemsStore.subscribe(val => localStorage.setStuff(formatter.format(dateFromStore), val));
