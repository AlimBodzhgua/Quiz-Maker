import { useEffect } from 'react';
import { useUserStore } from '../../model/store';


export const useSignInUser = () => {
	const signInUser = useUserStore((state) => state.signInUser);
	const resetStatuses = useUserStore((state) => state.resetStatuses);
	const status = useUserStore((state) => state.signInStatus);
	const isLoading = status === 'pending';
	const error = status === 'failed';

	useEffect(() => {
		resetStatuses();
	}, []);

	return { signInUser, isLoading, error };
};