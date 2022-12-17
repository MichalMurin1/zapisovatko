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
export let allItemsStore = writable(getItems2Date());

let actualDateStore;

dateStore.subscribe(val => {
    storedItems = localStorage.getStuff(formatter.format(val)) ?? [];
    itemsStore.set(storedItems);
    allItemsStore.set(getItems2Date(val.getMonth()));
    actualDateStore = val;
});


itemsStore.subscribe(val => {
    localStorage.setStuff(formatter.format(dateFromStore), val);
    allItemsStore.set(getItems2Date(actualDateStore.getMonth()));
});

function getItems2Date(actualMonth = date.getMonth()) {
    let items2Date = [];
    for (let i = 0; i < localStorage.length; i++) {

        let key = localStorage.key(i);
        let value = localStorage.getItem(key);
        let dateOfKey = new Date(key);        
        let keyMonth = dateOfKey.getMonth();
        let keyDay = dateOfKey.getDate();

        if (keyMonth == actualMonth) {
            items2Date[keyDay] = {
                length: JSON.parse(value).length,
                completed: JSON.parse(value).filter(item => item.complete).length
            };
        }
    }
    return items2Date;
}

