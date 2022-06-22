import axios from 'axios';
import { writable } from 'svelte/store';

export const transaksi = writable([]);

export const fetchtransaksi = async () => {
	try {
		const res = await axios.get(`http://127.0.0.1:8000/api/transaksi`);
		const body = await res.data;
		transaksi.set(body.data);
	} catch (error) {
		console.error(error.response);
	}
};