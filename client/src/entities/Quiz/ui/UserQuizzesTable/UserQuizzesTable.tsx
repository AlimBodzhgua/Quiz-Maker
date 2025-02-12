import { FC, memo } from 'react';
import { useQuizzesStore } from '../../model/store/quizzes';
import { MyQuizTableRow } from './UserQuizTableRow';
import { useQuizzes } from '../../lib/hooks/useQuizzes';
import { MyQuizzesTableHeader } from '../TableHeader/MyQuizzesTableHeader';
import { QuizTable } from '../QuizTable/QuizTable';

interface UserQuizzesTableProps {
	userId: string;
}

export const UserQuizzesTable: FC<UserQuizzesTableProps> = memo(({ userId }) => {
	const getUserQuizzes = useQuizzesStore((state) => state.getUserQuizzes);
	const { quizzes, isLoading } = useQuizzes({ fetchQuizzesFn: () => getUserQuizzes(userId!) });

	return (
		<QuizTable
			quizzes={quizzes}
			isLoading={isLoading}
			header={<MyQuizzesTableHeader />}
			renderQuizRow={(quiz) => <MyQuizTableRow quiz={quiz} key={quiz._id}/>}
		/>
	);
});
