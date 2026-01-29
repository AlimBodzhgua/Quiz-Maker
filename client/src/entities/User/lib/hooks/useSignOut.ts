import { useUserStore } from '../../model/store';

export const useSignOutUser = () => {
	const signOut = useUserStore((state) => state.signOutUser);
	const user = useUserStore((state) => state.user);
	const isAuthorized = !!user;

	return { signOut, isAuthorized };
};
