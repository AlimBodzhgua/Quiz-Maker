import { IUser } from 'src/types/types';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface UserState {
	user: IUser | null;

	isLoading: boolean;
	error?: string | undefined;
}

interface UserAction {
	login: () => void;
	register: () => void;
}

export const useUserStore = create<UserAction & UserState>()(
	devtools((set) => ({
		user: null,
		isLoading: false,
		errur: undefined,

		login: () => set((state) => ({ user: null }), false, 'login'),
		register: () => set((state) => ({ user: null }), false, 'register'),
	}))
);
  