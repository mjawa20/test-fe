import axios from 'axios';
import { writable } from 'svelte/store';

export const sales = writable([]);

export const fetchSales = async () => {
	try {
		const res = await axios.get(`http://127.0.0.1:8000/api/sales`);
		const body = await res.data;
		sales.set(body.data);
	} catch (error) {
		console.error(error.response);
	}
};
export const postSales = async (newSales, kode) => {
	try {
		const data = {
			transaksi_kode: kode,
			data: newSales,
		}
		await axios.post(`http://127.0.0.1:8000/api/sales`, JSON.stringify(data));
	} catch (error) {
		console.error(error.response);
	}
};