import axios from 'axios';

const appHeaders = {
	'Content-Type': 'application/json',
};

const $axios = axios.create({
	baseURL: 'http://localhost:4000',
	headers: appHeaders,
});

$axios.interceptors.request.use((config) => {
	const token = localStorage.getItem('authToken');
	config.headers.Authorization = token ? `Bearer ${token}` : '';
	return config;
});

export default $axios;
