import type { FC } from 'react';
import { Box } from '@chakra-ui/react';
import { PublicQuizzesTable } from 'entities/Quiz';
import { SearchBar } from 'features/SearchQuizzes';
import { memo } from 'react';
import { Page } from 'widgets/Page';

const PublicQuizzesPage: FC = memo(() => {
	return (
		<Page>
			<Box w='80%' my='15px'>
				<SearchBar />
			</Box>
			<PublicQuizzesTable />
		</Page>
	);
});

export default PublicQuizzesPage;
