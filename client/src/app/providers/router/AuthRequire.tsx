import { FC, ReactNode, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { AppRoutes } from 'shared/constants';
import { useInitUser } from 'entities/User';

interface AuthRequireProps {
	children: ReactNode;
}

export const AuthRequire: FC<AuthRequireProps> = ({ children }) => {
	const isAuthorized = useInitUser();
	const [authMounted, setAuthMounted] = useState<boolean>(false);

	useEffect(() => {
		setAuthMounted(true);
	}, []);

	if (!isAuthorized && authMounted) {
		console.log('Navgiate')
		return <Navigate to={AppRoutes.LOGIN} />
	}

	return children;
}