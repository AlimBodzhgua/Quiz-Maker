import type { FC } from 'react';
import { Button, Heading, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { AppRoutes } from 'shared/constants';
import { Page } from 'widgets/Page';

export const NotFoundPage: FC = () => {
	return (
		<Page centered>
			<Heading mb='15px'>404 Page not Found</Heading>
			<Text mb='25px'>Sorry we can&apos;t find the page your looking for.</Text>
			<Button as={Link} to={AppRoutes.USER_QUIZZES} colorScheme='purple'>
				Home Page
			</Button>
		</Page>
	);
};
