import { FC, memo } from 'react';
import { Box } from '@chakra-ui/react';
import { PublicQuizTable } from 'components/PublicQuizTable/PublicQuizTable';
import { SearchBar } from 'components/SearchBar/SearchBar';


const PublicQuizzesPage: FC = memo(() => {

	return (
		<Box w='80%' p='25px 0'>
			<SearchBar />
			<PublicQuizTable />
		</Box>
	);
});

export default PublicQuizzesPage;