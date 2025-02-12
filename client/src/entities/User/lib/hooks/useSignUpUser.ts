import { useUserStore } from '../../model/store';


export const useSignUpUser = () => {
	const signUpUser = useUserStore((state) => state.signUpUser);
	const status = useUserStore((state) => state.signUpStatus);
	const isLoading = status === 'pending';
	const error = status === 'failed';

	return { signUpUser, isLoading, error };
};