import { FC, memo } from 'react';
import { Pagination } from 'shared/UI';
import { useQuizzesStore } from '../../model/store/quizzes';
import { useQuizzes } from '../../lib/hooks/useQuizzes';
import { PublicQuizzesTableHeader } from '../TableHeader/PublicQuizzesTableHeader';
import { QuizTable } from '../QuizTable/QuizTable';
import { PublicQuizTableRow } from './PublicQuizTableRow';

export const PublicQuizzesTable: FC = memo(() => {
	const getPublicQuizzes = useQuizzesStore((state) => state.getPublicQuizzes);
	const { quizzes, publicPagesAmount } = useQuizzes({ type: 'public' });
	const getPublicQiuzzesStatus = useQuizzesStore((state) => state.getPublicQuizzesStaus);
	const page = useQuizzesStore((state) => state.page);
	const isLoading = getPublicQiuzzesStatus === 'pending';
	const haveError = getPublicQiuzzesStatus === 'failed';

	return (
		<>
			<QuizTable
				quizzes={quizzes}
				isLoading={isLoading}
				haveError={haveError}
				header={<PublicQuizzesTableHeader />}
				renderQuizRow={(quiz) => <PublicQuizTableRow quiz={quiz} key={quiz._id} />}
			/>
			{(!haveError && quizzes.length) && (
				<Pagination
					activePage={page}
					pagesAmount={publicPagesAmount}
					onPageChange={getPublicQuizzes}
				/>
			)}
		</>
	);
});
