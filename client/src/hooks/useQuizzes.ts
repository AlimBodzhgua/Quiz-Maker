import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuizzesStore } from '@/store/quizzes';
import { SortDirectionType, SortFieldType } from '@/types/sort';
import { IQuiz } from '@/types/types';
import { sortQuizzes } from '@/utils/utils';

type useQuizzesProps = {
	fetchQuizzesFn: () => Promise<IQuiz[]>;
};

type UseQuizzesResult = {
	quizzes: IQuiz[];
	isLoading: boolean;
};

export const useQuizzes = ({ fetchQuizzesFn }: useQuizzesProps): UseQuizzesResult => {
	const sortedAndFilteredQuizzes = useQuizzesStore((state) => state.sortedAndFilteredQuizzes);
	const isLoading = useQuizzesStore((state) => state.isLoading);
	const setSortedAndFilteredQuizzes = useQuizzesStore((state) => state.setSortedAndFilteredQuizzes);
	const [searchParams] = useSearchParams();
	
	const fetchQuizzesAndSort = async () => {
		const quizzes = await fetchQuizzesFn();

		if (searchParams.has('field') || searchParams.has('sort')) {
			const sortValue = searchParams.get('field') as SortFieldType || 'date';
			const sortDirection = searchParams.get('sort') as SortDirectionType;
			const sortedQuizzes = sortQuizzes(quizzes, sortValue, sortDirection);
			setSortedAndFilteredQuizzes(sortedQuizzes);
		}
	}

	useEffect(() => {
		fetchQuizzesAndSort();
	}, []);

	return { quizzes: sortedAndFilteredQuizzes, isLoading };
}