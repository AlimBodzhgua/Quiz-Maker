import type { FC } from 'react';
import { CompletedQuizzesList } from 'entities/CompletedQuiz';
import { memo } from 'react';
import { Page } from 'widgets/Page';

const CompletedQuizzesPage: FC = memo(() => {
	return (
		<Page>
			<CompletedQuizzesList />
		</Page>
	);
});

export default CompletedQuizzesPage;
