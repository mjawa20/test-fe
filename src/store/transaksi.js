import axios from 'axios';
import { writable } from 'svelte/store';

export const transaksi = writable([]);

const url = 'https://test-be-jawa.herokuapp.com/api/transaction';


export const fetchtransaksi = async () => {
	try {
		const res = await axios.get(url);
		const body = await res.data;
		transaksi.set(body);
	} catch (error) {
		console.error(error.response);
	}
};

export const postTransaksi = async (newTransaksi) => {
	try {
		const res = await axios.post(url, newTransaksi);
		return res.data;
	} catch (error) {
		console.error(error.response);
	}
};