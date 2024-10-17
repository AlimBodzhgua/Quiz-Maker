import { FC, memo } from 'react';
import { List } from '@chakra-ui/react';
import { useCurrentTest } from '@/store/currentTest';
import { QuestionItem } from './QuestionItem';

export const QuestionsList: FC = memo(() => {
	const questions = useCurrentTest((state) => state.questions);
	const isLoading = useCurrentTest((state) => state.isLoading);

	if (isLoading) {
		<h1>Loading ....</h1>
	}

	return (
		<List>
			{questions && questions.map((question) => (
				<QuestionItem question={question} key={question._id} />
			))}
		</List>
	);
});
