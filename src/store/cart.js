import axios from 'axios';
import { writable } from 'svelte/store';

export const cart = writable([]);




// export const fetchCarousel = async (query) => {
// 	try {
// 		const res = await axios.get(`/api/carousel/${query}}`);
// 		const body = await res.data;
// 		customer.set(body.data);
// 	} catch (error) {
// 		console.error(error.response);
// 	}
// };


// export const deletecarousel = async (id) => {
// 	try {
// 		await axios.delete('/api/carousel/' + id)
// 	} catch (error) {
// 		console.error(error.response);
// 	}
// }

// export const updatecarousel = async (newcarousel) => {
// 	try {
// 		await axios.put('/api/carousel/',newcarousel)
// 	} catch (error) {
// 		console.error(error.response);
// 	}
// }