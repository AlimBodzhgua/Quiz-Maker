import { FC, ReactNode, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { AppRoutes } from 'shared/constants';
import { useUserStore } from 'entities/User';

interface AuthRequireProps {
	children: ReactNode;
}

export const AuthRequire: FC<AuthRequireProps> = ({ children }) => {
	const isAuthorized = useUserStore((state) => state.user);
	const [authMounted, setAuthMounted] = useState<boolean>(false);

	useEffect(() => {
		setAuthMounted(true);
	}, []);

	if (!isAuthorized && authMounted) {
		return <Navigate to={AppRoutes.LOGIN} />
	}

	return children;
}