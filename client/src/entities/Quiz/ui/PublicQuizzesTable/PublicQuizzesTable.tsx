import { FC, memo } from 'react';
import { useQuizzesStore } from '../../model/store/quizzes';
import { useQuizzes } from '../../lib/hooks/useQuizzes';
import { PublicQuizTableRow } from './PublicQuizTableRow';
import { PublicQuizzesTableHeader } from '../TableHeader/PublicQuizzesTableHeader';
import { QuizTable } from '../QuizTable/QuizTable';

export const PublicQuizzesTable: FC = memo(() => {
	const getPublicQuizzes = useQuizzesStore((state) => state.getPublicQuizzes);
	const { quizzes, isLoading } = useQuizzes({ fetchQuizzesFn: getPublicQuizzes });
	
	return (
		<QuizTable
			quizzes={quizzes}
			isLoading={isLoading}
			header={<PublicQuizzesTableHeader />}
			renderQuizRow={(quiz) => <PublicQuizTableRow quiz={quiz} key={quiz._id}/>}
		/>
	);
});