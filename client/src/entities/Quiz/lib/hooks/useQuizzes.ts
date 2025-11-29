import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { QuizService } from '../../api/QuizService';
import { useQuizzesStore } from '../../model/store/quizzes';
import { Quiz } from '../../model/types';
import { SortDirectionType, SortFieldType } from '../../model/types';

type PublicQuizzesProps = {
	type: 'public';
}

type UserQuizzesProps = {
	type: 'users';
	userId: string;
}

type useQuizzesProps = PublicQuizzesProps | UserQuizzesProps;

type UseQuizzesResult = {
	quizzes: Quiz[];
	publicPagesAmount: number;
	usersPagesAmount: number;
};

export const useQuizzes = (props: useQuizzesProps): UseQuizzesResult => {
	const sortedAndFilteredQuizzes = useQuizzesStore((state) => state.sortedAndFilteredQuizzes);
	const getPublicQuizzes = useQuizzesStore((state) => state.getPublicQuizzes);
	const getUserQuizzes = useQuizzesStore((state) => state.getUserQuizzes);
	const setSortedAndFilteredQuizzes = useQuizzesStore((state) => state.setSortedAndFilteredQuizzes);
	const limit = useQuizzesStore((state) => state.limit);
	const [searchParams] = useSearchParams();
	const [publicPagesAmount, setPublicPagesAmount] = useState<number>(10);
	const [usersPagesAmount, setUsersPagesAmount] = useState<number>(10);

	const fetchQuizzesFn = async () => {
		const pageQuery = searchParams.get('page');
		const page = pageQuery ? Number(pageQuery) : undefined;
		let quizzes;

		if (props.type === 'public') {
			const publicPagesAmount = await QuizService.getPublicQuizzesPagesAmount(limit);
			setPublicPagesAmount(publicPagesAmount)

			quizzes = await getPublicQuizzes(page); 
		} else {
			const userPagesAmount = await QuizService.getUserQuizzesPagesAmount(limit);
			setUsersPagesAmount(userPagesAmount)
			
			quizzes = await getUserQuizzes(props.userId, page); 
		}
		return quizzes;
	}

	const fetchQuizzesAndSort = async () => {
		const quizzes = await fetchQuizzesFn();

		if (searchParams.has('field') || searchParams.has('sort')) {
			const sortValue = searchParams.get('field') as SortFieldType || 'date';
			const sortDirection = searchParams.get('sort') as SortDirectionType;
			const sortedQuizzes = QuizService.sortQuizzes(quizzes, sortValue, sortDirection);
			setSortedAndFilteredQuizzes(sortedQuizzes);
		}
	}

	useEffect(() => {
		fetchQuizzesAndSort();
	}, []);

	return { quizzes: sortedAndFilteredQuizzes, publicPagesAmount, usersPagesAmount };
}