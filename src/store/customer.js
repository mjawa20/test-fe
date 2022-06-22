import axios from 'axios';
import { writable } from 'svelte/store';

export const customer = writable([]);

export const fetchcustomer = async () => {
	try {
		const res = await axios.get(`http://127.0.0.1:8000/api/customer`);
		const body = await res.data;
		customer.set(body.data);
	} catch (error) {
		console.error(error.response);
	}
};
export const fetchCarousel = async (query) => {
	try {
		const res = await axios.get(`/api/carousel/${query}}`);
		const body = await res.data;
		customer.set(body.data);
	} catch (error) {
		console.error(error.response);
	}
};

export const postCarousel = async (newcustomer) => {
	try {
		await axios.post('/api/carousel', newcustomer)
	} catch (error) {
		console.error(error.response);
	}
}

export const deletecarousel = async (id) => {
	try {
		await axios.delete('/api/carousel/' + id)
	} catch (error) {
		console.error(error.response);
	}
}

export const updatecarousel = async (newcarousel) => {
	try {
		await axios.put('/api/carousel/',newcarousel)
	} catch (error) {
		console.error(error.response);
	}
}