import { useCallback } from 'react';
import { useUserStore } from '../../model/store';

export const useInitUser = () => {
	const initUser = useUserStore((state) => state.initUser);
	const user = useUserStore((state) => state.user);
	const isAuthorized = !!user;
	const status = useUserStore((state) => state.initUserStatus);
	const isLoading = status === 'pending';
	const error = status === 'failed';

	const initUserAuth = useCallback(() => {
		const token = localStorage.getItem('authToken');

		if (token) {
			initUser();
		}
	}, [initUser]);

	return { initUserAuth, isLoading, error, isAuthorized };
};
