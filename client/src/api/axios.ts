import axios from 'axios';

const appHeaders = {
	'Content-Type': 'application/json',
};

const $axios = axios.create({
	baseURL: import.meta.env.VITE_BASE_URL,
	headers: appHeaders,
});

$axios.interceptors.request.use((config) => {
	const token = localStorage.getItem('authToken');
	config.headers.Authorization = token ? `Bearer ${token}` : '';
	return config;
});

export default $axios;
