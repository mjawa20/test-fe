import { get, writable } from "svelte/store";
import { browser } from "$app/env";

let stored = browser && localStorage.getItem('cart');

console.log(JSON.parse(stored))

export const cart = writable([]);
console.log('---------AA');
const fetchCart = () => {
    console.log(JSON.parse(stored),'----')
    cart.set(JSON.parse(stored))
    console.log(get(cart),'cart');
}
fetchCart();