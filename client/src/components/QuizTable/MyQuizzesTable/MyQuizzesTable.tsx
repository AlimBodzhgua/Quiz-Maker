import { FC, memo } from 'react';
import { useQuizzesStore } from 'store/quizzes';
import { useUserStore } from 'store/user';
import { useQuizzes } from '@/hooks/useQuizzes';
import { MyQuizTableRow } from './MyQuizTableRow';
import { MyQuizzesTableHeader } from '../TableHeader/MyQuizzesTableHeader';
import { QuizTable } from '../QuizTable/QuizTable';

export const MyQuizzesTable: FC = memo(() => {
	const userId = useUserStore((state) => state.user?._id);
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
