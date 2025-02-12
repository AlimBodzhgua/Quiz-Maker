import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { QuizService } from '../../api/QuizService';
import { useQuizzesStore } from '../../model/store/quizzes';
import { Quiz } from '../../model/types';
import { SortDirectionType, SortFieldType } from '../../model/types';

type useQuizzesProps = {
	fetchQuizzesFn: () => Promise<Quiz[]>;
};

type UseQuizzesResult = {
	quizzes: Quiz[];
};

export const useQuizzes = ({ fetchQuizzesFn }: useQuizzesProps): UseQuizzesResult => {
	const sortedAndFilteredQuizzes = useQuizzesStore((state) => state.sortedAndFilteredQuizzes);
	const setSortedAndFilteredQuizzes = useQuizzesStore((state) => state.setSortedAndFilteredQuizzes);
	const [searchParams] = useSearchParams();
	
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

	return { quizzes: sortedAndFilteredQuizzes };
}