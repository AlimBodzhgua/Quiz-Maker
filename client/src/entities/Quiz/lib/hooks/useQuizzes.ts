import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { QuizService } from '../../api/QuizService';
import { useQuizzesStore } from '../../model/store/quizzes';
import { Quiz } from '../../model/types';
import { SortDirectionType, SortFieldType } from '../../model/types';

type useQuizzesProps = {
	fetchQuizzesFn: (pageNumber?: number) => Promise<Quiz[]>;
};

type UseQuizzesResult = {
	quizzes: Quiz[];
	publicPagesAmount: number;
	usersPagesAmount: number;
};

export const useQuizzes = ({ fetchQuizzesFn }: useQuizzesProps): UseQuizzesResult => {
	const sortedAndFilteredQuizzes = useQuizzesStore((state) => state.sortedAndFilteredQuizzes);
	const setSortedAndFilteredQuizzes = useQuizzesStore((state) => state.setSortedAndFilteredQuizzes);
	const limit = useQuizzesStore((state) => state.limit);
	const [searchParams] = useSearchParams();
	const [publicPagesAmount, setPublicPagesAmount] = useState<number>(10);
	const [usersPagesAmount, setUsersPagesAmount] = useState<number>(10);
	
	const fetchQuizzesAndSort = async () => {
		const page = searchParams.get('page');
		const quizzes = await fetchQuizzesFn(page ? Number(page) : undefined);

		if (searchParams.has('field') || searchParams.has('sort')) {
			const sortValue = searchParams.get('field') as SortFieldType || 'date';
			const sortDirection = searchParams.get('sort') as SortDirectionType;
			const sortedQuizzes = QuizService.sortQuizzes(quizzes, sortValue, sortDirection);
			setSortedAndFilteredQuizzes(sortedQuizzes);
		}
	}

	useEffect(() => {
		fetchQuizzesAndSort();
		QuizService.getPublicQuizzesPagesAmount(limit).then(setPublicPagesAmount);
		QuizService.getUserQuizzesPagesAmount(limit).then(setUsersPagesAmount);
	}, []);

	return { quizzes: sortedAndFilteredQuizzes, publicPagesAmount, usersPagesAmount };
}