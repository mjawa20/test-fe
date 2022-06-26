import axios from 'axios';
import { writable } from 'svelte/store';

export const barang = writable([]);

const url = 'https://7090-114-142-173-3.ap.ngrok.io/api/barang';

export const fetchbarang = async () => {
	try {
		const res = await axios.get(url);
		const body = await res.data;
		barang.set(body);
	} catch (error) {
		console.error(error.response);
	}
};

export const postBarang = async (newBarang) => {
	try {
		await axios.post(url, newBarang)
	} catch (error) {
		console.error(error.response);
	}
}

export const deletebarang = async (id) => {
	try {
		await axios.delete(url + '/' + id);
	} catch (error) {
		console.error(error.response);
	}
}
// export const fetchbarang = async (query) => {
// 	try {
// 		const res = await axios.get(`/api/barang/${query}}`);
// 		const body = await res.data;
// 		customer.set(body.data);
// 	} catch (error) {
// 		console.error(error.response);
// 	}
// };



export const updateBarang = async (barang) => {
	try {
		await axios.put(url + '/' + barang.id, barang);
	} catch (error) {
		console.error(error.response);
	}
}