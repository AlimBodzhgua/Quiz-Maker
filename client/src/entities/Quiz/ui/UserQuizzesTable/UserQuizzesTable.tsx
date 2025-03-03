import { FC, memo } from 'react';
import { Pagination } from 'shared/UI';
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
	const { quizzes, usersPagesAmount } = useQuizzes({
		fetchQuizzesFn: (page) => getUserQuizzes(userId!, page),
	});
	const getUserQuizzesStatus = useQuizzesStore((state) => state.getUserQuizzesStatus);
	const page = useQuizzesStore((state) => state.page);
	const isLoading = getUserQuizzesStatus === 'pending';
	const haveError = getUserQuizzesStatus === 'failed';

	const handlePageChange = (page: number) => {
		getUserQuizzes(userId!, page)
	}

	return (
		<>
			<QuizTable
				quizzes={quizzes}
				isLoading={isLoading}
				haveError={haveError}
				header={<UserQuizzesTableHeader />}
				renderQuizRow={(quiz) => <UserQuizTableRow quiz={quiz} key={quiz._id}/>}
			/>
			<Pagination
				activePage={page}
				pagesAmount={usersPagesAmount}
				onPageChange={handlePageChange}
			/>
		</>
	);
});
