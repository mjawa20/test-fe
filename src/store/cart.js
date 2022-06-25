import { get, writable } from "svelte/store";
import { browser } from "$app/env";

let stored = browser && localStorage.getItem('cart');


export const cart = writable([]);
const fetchCart = () => {
    cart.set(JSON.parse(stored) || [])
}
fetchCart();