import type { FC } from 'react';
import { memo } from 'react';
import { Pagination } from 'shared/UI';
import { useQuizzes } from '../../lib/hooks/useQuizzes';
import { useQuizzesStore } from '../../model/store/quizzes';
import { QuizTable } from '../QuizTable/QuizTable';
import { UserQuizzesTableHeader } from '../TableHeader/UserQuizzesTableHeader';
import { UserQuizTableRow } from './UserQuizTableRow';

interface UserQuizzesTableProps {
	userId: string;
}

export const UserQuizzesTable: FC<UserQuizzesTableProps> = memo(({ userId }) => {
	const getUserQuizzes = useQuizzesStore((state) => state.getUserQuizzes);
	const { quizzes, usersPagesAmount } = useQuizzes({ type: 'users', userId });
	const getUserQuizzesStatus = useQuizzesStore((state) => state.getUserQuizzesStatus);
	const page = useQuizzesStore((state) => state.page);
	const isLoading = getUserQuizzesStatus === 'pending';
	const haveError = getUserQuizzesStatus === 'failed';

	const handlePageChange = (page: number) => {
		getUserQuizzes(userId!, page);
	};

	return (
		<>
			<QuizTable
				quizzes={quizzes}
				isLoading={isLoading}
				haveError={haveError}
				header={<UserQuizzesTableHeader />}
				renderQuizRow={(quiz) => <UserQuizTableRow quiz={quiz} key={quiz._id} />}
			/>
			{(!haveError && !!quizzes.length) && (
				<Pagination
					activePage={page}
					pagesAmount={usersPagesAmount}
					onPageChange={handlePageChange}
				/>
			)}
		</>
	);
});
