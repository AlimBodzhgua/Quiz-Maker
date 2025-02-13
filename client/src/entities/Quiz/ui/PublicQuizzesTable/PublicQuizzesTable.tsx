import { FC, memo } from 'react';
import { PublicQuizTableRow } from './PublicQuizTableRow';
import { useQuizzesStore } from '../../model/store/quizzes';
import { useQuizzes } from '../../lib/hooks/useQuizzes';
import { PublicQuizzesTableHeader } from '../TableHeader/PublicQuizzesTableHeader';
import { QuizTable } from '../QuizTable/QuizTable';

export const PublicQuizzesTable: FC = memo(() => {
	const getPublicQuizzes = useQuizzesStore((state) => state.getPublicQuizzes);
	const { quizzes } = useQuizzes({ fetchQuizzesFn: getPublicQuizzes });
	const getPublicQiuzzesStatus = useQuizzesStore((state) => state.getPublicQuizzesStaus);
	const isLoading = getPublicQiuzzesStatus === 'pending';
	
	return (
		<QuizTable
			quizzes={quizzes}
			isLoading={isLoading}
			header={<PublicQuizzesTableHeader />}
			renderQuizRow={(quiz) => <PublicQuizTableRow quiz={quiz} key={quiz._id}/>}
		/>
	);
});