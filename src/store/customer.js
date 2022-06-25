import axios from 'axios';
import { writable } from 'svelte/store';

export const customer = writable([]);

const url = 'https://test-jawa.000webhostapp.com/api/customer';


export const fetchcustomer = async () => {
	try {
		const res = await axios.get(url);
		const body = await res.data;
		customer.set(body.data);
	} catch (error) {
		console.error(error.response);
	}
};

export const postCustomer = async (newcustomer) => {
	try {
		await axios.post(url, newcustomer);
	} catch (error) {
		console.error(error.response);
	}
}

export const deleteCustomer = async (id) => {
	try {
		await axios.delete(url + '/' + id)
	} catch (error) {
		console.error(error.response);
	}
}

export const getCustomerById = async (id) => {
	try {
		const res = await axios.get(url + '/' + id)
		const data = await res.data;
		return res.data.data;

	} catch (error) {
		console.error(error.response);
	}
}