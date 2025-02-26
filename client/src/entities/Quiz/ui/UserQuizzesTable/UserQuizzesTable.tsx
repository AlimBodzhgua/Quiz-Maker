import { FC, memo } from 'react';
import { useQuizzesStore } from '../../model/store/quizzes';
import { UserQuizTableRow } from './UserQuizTableRow';
import { useQuizzes } from '../../lib/hooks/useQuizzes';
import { UserQuizzesTableHeader } from '../TableHeader/UserQuizzesTableHeader';
import { QuizTable } from '../QuizTable/QuizTable';

interface UserQuizzesTableProps {
	userId: string;
}

export const UserQuizzesTable: FC<UserQuizzesTableProps> = memo(({ userId }) => {
	const getUserQuizzes = useQuizzesStore((state) => state.getUserQuizzes);
	const { quizzes } = useQuizzes({ fetchQuizzesFn: () => getUserQuizzes(userId!) });
	const getUserQuizzesStatus = useQuizzesStore((state) => state.getUserQuizzesStatus);
	const isLoading = getUserQuizzesStatus === 'pending';

	return (
		<QuizTable
			quizzes={quizzes}
			isLoading={isLoading}
			header={<UserQuizzesTableHeader />}
			renderQuizRow={(quiz) => <UserQuizTableRow quiz={quiz} key={quiz._id}/>}
		/>
	);
});
