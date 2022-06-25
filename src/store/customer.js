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

export const postCustomer = async (newcustomer) => {
	try {
		await axios.post('http://127.0.0.1:8000/api/customer', newcustomer);
	} catch (error) {
		console.error(error.response);
	}
}

export const deleteCustomer = async (id) => {
	try {
		await axios.delete('http://127.0.0.1:8000/api/customer/' + id)
	} catch (error) {
		console.error(error.response);
	}
}

export const getCustomerById = async (id) => {
	try {
		const res = await axios.get('http://127.0.0.1:8000/api/customer/' + id)
		const data = await res.data;
		return res.data.data;

	} catch (error) {
		console.error(error.response);
	}
}