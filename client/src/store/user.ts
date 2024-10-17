import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { IUser } from '@/types/types';
import $axios from '@/api/axios';

interface UserState {
	user: IUser | null;

	isLoading: boolean;
	error?: string | undefined;
}

interface UserAction {
	login: (email: string, password: string) => Promise<void>;
	register: (email: string, password: string) => Promise<void>;
	logout: () => void;
	initUser: () => void;
}

export const useUserStore = create<UserAction & UserState>()(
	devtools((set) => ({
		user: null,
		isLoading: false,
		error: undefined,

		logout: () => {
			set({ user: null, error: undefined, isLoading: false }, false, 'logout'),
			localStorage.removeItem('authToken');
		},

		initUser: async () => {
			set({ isLoading: true }, false, 'initUserLoading');

			try {
				const response = await $axios.get<IUser>('/users/auth/me');

				const user = {
					_id: response.data._id,
					email: response.data.email,
					token: response.data.token,
				};

				localStorage.setItem('authToken', user.token);

				set({ isLoading: false, user: user, error: undefined }, false, 'initUser');
			} catch (err) {
				set({ error: JSON.stringify(err) });
			} finally {
				set({ isLoading: false });
			}
		},

		login: async (email, password) => {
			set({ isLoading: true }, false, 'loginLoading');

			try {
				const response = await $axios.post<IUser>('/users/login', { email, password });
				console.log(response);
				const user = {
					_id: response.data._id,
					email: response.data.email,
					token: response.data.token,
				};

				localStorage.setItem('authToken', user.token);

				set({ user, error: undefined }, false, 'login');
				window.location.replace('/');
			} catch (err) {
				set({ error: JSON.stringify(err) }, false, 'loginError');
			} finally {
				set({ isLoading: false });
			}
		},

		register: async (email, password) => {
			set({ isLoading: true }, false, 'registerLoading');

			try {
				const response = await $axios.post<IUser>('/users/registration', {
					email,
					password,
				});

				const user = {
					_id: response.data._id,
					email: response.data.email,
					token: response.data.token,
				};

				localStorage.setItem('authToken', user.token);

				set({ user: user, error: undefined }, false, 'register');
				window.location.replace('/');
			} catch (err) {
				set({ error: JSON.stringify(err) }, false, 'registerError');
			} finally {
				set({ isLoading: false });
			}
		},
	})),
);
