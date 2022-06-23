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

export const postTransaksi = async (newTransaksi) => {
	try {
		const res = await axios.post(`http://127.0.0.1:8000/api/transaksi`, newTransaksi);
		return res.data;
	} catch (error) {
		console.error(error.response);
	}
};