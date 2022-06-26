import axios from 'axios';
import { writable } from 'svelte/store';

export const customer = writable([]);

const url = 'https://test-be-jawa.herokuapp.com/api/customers';


export const fetchcustomer = async () => {
	try {
		const res = await axios.get(url);
		const body = await res.data;
		customer.set(body);
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
export const updateCustomer = async (customer) => {
	try {
		await axios.put(url + '/' + customer.id, customer);
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