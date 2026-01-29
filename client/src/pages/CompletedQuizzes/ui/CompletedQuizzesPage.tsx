import type { FC } from 'react';
import { Heading } from '@chakra-ui/react';
import { CompletedQuizzesList } from 'entities/CompletedQuiz';
import { memo } from 'react';
import { Page } from 'widgets/Page';

const CompletedQuizzesPage: FC = memo(() => {
	return (
		<Page>
			<Heading
				m='12px 0'
				fontWeight='medium'
				color='blue.400'
			>
				Completed quizzes
			</Heading>
			<CompletedQuizzesList />
		</Page>
	);
});

export default CompletedQuizzesPage;
