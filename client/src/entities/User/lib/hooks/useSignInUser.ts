import { useUserStore } from '../../model/store';


export const useSignInUser = () => {
	const signInUser = useUserStore((state) => state.signInUser);
	const status = useUserStore((state) => state.signInStatus);
	const isLoading = status === 'pending';
	const error = status === 'failed';

	return { signInUser, isLoading, error };
};