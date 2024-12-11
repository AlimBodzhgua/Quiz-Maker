import { useUserStore } from '@/store/user';
import { FC, ReactNode, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { AppRoutes } from './routes';

interface AuthRequireProps {
	children: ReactNode;
}

export const AuthRequire: FC<AuthRequireProps> = ({ children }) => {
	const user = useUserStore((state) => state.user);
	const [authMounted, setAuthMounted] = useState<boolean>(false);
	//const isLoading = useUserStore((state) => state.isLoading);

	useEffect(() => {
		console.log('AUTH_REQUIRE')
		setAuthMounted(true);
	}, []);


	if (!user && authMounted) {
		return <Navigate to={AppRoutes.LOGIN} />
	}

	return children;
}