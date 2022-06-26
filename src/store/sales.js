import axios from 'axios';
import { writable } from 'svelte/store';

export const sales = writable([]);

const url = 'https://7090-114-142-173-3.ap.ngrok.io/api/sales';


export const fetchSales = async () => {
	try {
		const res = await axios.get(url);
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
		await axios.post(url, data);
	} catch (error) {
		console.error(error.response);
	}
};