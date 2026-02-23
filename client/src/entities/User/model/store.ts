import type { User } from './types';
import $axios from 'shared/api/axios';
import { AUTH_LOCALSTORAGE_KEY } from 'shared/constants';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface UserState {
	user: User | null;
	error?: string;
	_mounted: boolean;

	signInStatus: 'idle' | 'pending' | 'success' | 'failed';
	signUpStatus: 'idle' | 'pending' | 'success' | 'failed';
	initUserStatus: 'idle' | 'pending' | 'success' | 'failed';
}

interface UserAction {
	signInUser: (email: string, password: string) => Promise<void>;
	signUpUser: (email: string, password: string) => Promise<void>;
	resetStatuses: () => void;
	signOutUser: () => void;
	initUser: () => void;
}

export const useUserStore = create<UserAction & UserState>()(
	devtools((set) => ({
		user: null,
		signInStatus: 'idle',
		signUpStatus: 'idle',
		initUserStatus: 'idle',
		_mounted: false,

		signOutUser: () => {
			set({ user: null }, false, 'signOut');
			localStorage.removeItem(AUTH_LOCALSTORAGE_KEY);
		},

		resetStatuses: () => {
			set({
				signInStatus: 'idle',
				signUpStatus: 'idle',
				initUserStatus: 'idle',
			});
		},

		initUser: async () => {
			set({ initUserStatus: 'pending' }, false, 'initUserPending');

			try {
				const response = await $axios.get<User>('/users/auth/me');

				const user = {
					_id: response.data._id,
					email: response.data.email,
					token: response.data.token,
				};

				localStorage.setItem(AUTH_LOCALSTORAGE_KEY, user.token);

				set({ user, _mounted: true, initUserStatus: 'success' }, false, 'initUserSuccess');
			} catch (err) {
				const errorMsg = err instanceof Error ? err.message : 'initUser error';

				set({ initUserStatus: 'failed', error: errorMsg }, false, 'initUserFailed');
			} finally {
				set({ _mounted: true }, false, 'initUserMounted');
			}
		},

		signInUser: async (email, password) => {
			set({ signInStatus: 'pending' }, false, 'signInUserPending');

			try {
				const response = await $axios.post<User>('/users/login', { email, password });
				const user = {
					_id: response.data._id,
					email: response.data.email,
					token: response.data.token,
				};

				localStorage.setItem(AUTH_LOCALSTORAGE_KEY, user.token);

				set({ user, signInStatus: 'success' }, false, 'signInUserSuccess');
			} catch (err) {
				const errorMsg = err instanceof Error ? err.message : 'signin error';

				set({ signInStatus: 'failed', error: errorMsg }, false, 'signInUserFailed');
			}
		},

		signUpUser: async (email, password) => {
			set({ signUpStatus: 'pending' }, false, 'signUpPending');

			try {
				const response = await $axios.post<User>('/users/registration', {
					email,
					password,
				});

				const user = {
					_id: response.data._id,
					email: response.data.email,
					token: response.data.token,
				};

				localStorage.setItem(AUTH_LOCALSTORAGE_KEY, user.token);

				set({ user, signUpStatus: 'success' }, false, 'signUpSuccess');
			} catch (err) {
				const errorMsg = err instanceof Error ? err.message : 'signin error';

				set({ signUpStatus: 'failed', error: errorMsg }, false, 'signUpFailed');
			}
		},
	})),
);
