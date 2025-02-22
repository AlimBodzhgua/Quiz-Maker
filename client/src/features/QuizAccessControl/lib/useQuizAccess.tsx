import { Quiz } from 'entities/Quiz';
import { useEffect, useState } from 'react';

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
			if (quiz.privacy.type === 'publicProtected') {
				setCorrectPassword(quiz.privacy.password);
				setIsOpenPasswordDialog(true);
			} else if (quiz.privacy.type === 'restrictedUsers') {
				const isQuizOwner = quiz.authorId === userId 
				const havePermission = quiz.privacy.userIds.includes(userId);
				havePermission || isQuizOwner ? setHavePermission(true) : setHavePermission(false); 
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