import type { FC } from 'react';
import { memo } from 'react';
import { Pagination } from 'shared/UI';
import { useQuizzes } from '../../lib/hooks/useQuizzes';
import { useQuizzesStore } from '../../model/store/quizzes';
import { QuizTable } from '../QuizTable/QuizTable';
import { PublicQuizzesTableHeader } from '../TableHeader/PublicQuizzesTableHeader';
import { PublicQuizTableRow } from './PublicQuizTableRow';

export const PublicQuizzesTable: FC = memo(() => {
	const getPublicQuizzes = useQuizzesStore((state) => state.getPublicQuizzes);
	const { quizzes, publicPagesAmount } = useQuizzes({ type: 'public' });
	const getPublicQuizzesStatus = useQuizzesStore((state) => state.getPublicQuizzesStatus);
	const page = useQuizzesStore((state) => state.page);
	const isLoading = getPublicQuizzesStatus === 'pending';
	const haveError = getPublicQuizzesStatus === 'failed';

	return (
		<>
			<QuizTable
				quizzes={quizzes}
				isLoading={isLoading}
				haveError={haveError}
				header={<PublicQuizzesTableHeader />}
				renderQuizRow={(quiz) => <PublicQuizTableRow quiz={quiz} key={quiz._id} />}
			/>
			{(!haveError && !!quizzes.length) && (
				<Pagination
					activePage={page}
					pagesAmount={publicPagesAmount}
					onPageChange={getPublicQuizzes}
				/>
			)}
		</>
	);
});
