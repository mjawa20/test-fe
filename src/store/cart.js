import { get, writable } from "svelte/store";
import { browser } from "$app/env";

let stored = browser && localStorage.getItem('cart');

console.log(JSON.parse(stored))

export const cart = writable([]);
console.log('---------AA');
const fetchCart = () => {
    cart.set(JSON.parse(stored) || [])
}
fetchCart();