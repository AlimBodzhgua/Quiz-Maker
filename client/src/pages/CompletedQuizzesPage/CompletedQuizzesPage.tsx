import { FC, memo } from 'react';
import { Heading } from '@chakra-ui/react';
import { Page } from 'components/UI/Page/Page';
import { CompletedQuizzesList } from 'components/CompletedQuizzesList';

const CompletedQuizzesPage: FC = memo(() => {

	return (
		<Page centered>
			<Heading m='12px 0'>Completed quizzes</Heading>
			<CompletedQuizzesList />
		</Page>
	)
});

export default CompletedQuizzesPage;