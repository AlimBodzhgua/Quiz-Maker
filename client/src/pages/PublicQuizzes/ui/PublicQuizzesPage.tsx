import { FC, memo } from 'react';
import { Flex } from '@chakra-ui/react';
import { SearchBar } from 'features/SearchQuizzes';
import { PublicQuizzesTable } from 'entities/Quiz';

const PublicQuizzesPage: FC = memo(() => {

	return (
		<Flex
			w='80%'
			p='25px 0'
			direction='column'
			gap='14px'
		>
			<SearchBar />
			<PublicQuizzesTable />
		</Flex>
	);
});

export default PublicQuizzesPage;