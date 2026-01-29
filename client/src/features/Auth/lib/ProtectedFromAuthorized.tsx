import type { FC, ReactNode } from 'react';
import { useUserStore } from 'entities/User';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface ProtectedFromAuthorizedProps {
	children: ReactNode;
}

export const ProtectedFromAuthorized: FC<ProtectedFromAuthorizedProps> = ({ children }) => {
	const navigate = useNavigate();
	const isAuthenticated = useUserStore((state) => state.user);

	useEffect(() => {
		if (isAuthenticated) {
			navigate('/public-quizzes');
		}
	}, [isAuthenticated, navigate]);

	return children;
};
