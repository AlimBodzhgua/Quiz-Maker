import { Quiz } from 'entities/Quiz';
import { useEffect, useState } from 'react';
import { getQueryParam } from 'shared/utils';

type QuizAccessParams = {
	quiz: Quiz | null;
	userId?: string;
};

export const useQuizAccess = ({ quiz, userId }: QuizAccessParams) => {
	const [havePermission, setHavePermission] = useState<boolean>(true);
	const [isOpenPasswordDialog, setIsOpenPasswordDialog] = useState<boolean>(false);
	const [correctPassword, setCorrectPassword] = useState<string | undefined>();

	useEffect(() => {
		if (quiz && userId) {
			const isQuizAuthor = quiz.authorId === userId;

			if (quiz.privacy.type === 'publicProtected') {
				setCorrectPassword(quiz.privacy.password);
				setIsOpenPasswordDialog(true);
			} else if (quiz.privacy.type === 'restrictedUsers') {
				const havePermission = quiz.privacy.userIds.includes(userId);

				havePermission || isQuizAuthor ? setHavePermission(true) : setHavePermission(false); 
			} else if (quiz.privacy.type === 'privateLink') {
				const token = getQueryParam('token');
				
				if ((token.length && token === quiz.privacy.token) || isQuizAuthor) {
					setHavePermission(true);
				} else {
					setHavePermission(false);
				}
			} else if (quiz.privacy.type === 'linkProtected') {
				const token = getQueryParam('token');
				
				if ((token.length && token === quiz.privacy.token) || isQuizAuthor) {
					setHavePermission(true)
					setCorrectPassword(quiz.privacy.password);
					setIsOpenPasswordDialog(true);
				} else {
					setHavePermission(false);
				}
			}
		}
	}, [quiz, userId]);

	const closePasswordDialog = () => {
		setIsOpenPasswordDialog(false);
	};

	return {
		havePermission,
		isOpenPasswordDialog,
		correctPassword,
		closePasswordDialog,
	};
}