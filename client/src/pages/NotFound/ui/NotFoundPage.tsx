import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Button, Heading, Text } from '@chakra-ui/react';
import { AppRoutes } from 'shared/constants';
import { Page } from 'widgets/Page';

export const NotFoundPage: FC = () => {
	return (
		<Page centered>
			<Heading mb='15px'>404 Page not Found</Heading>
			<Text mb='25px'>Sorry we can&apos;t find the page your looking for.</Text>
			<Button as={Link} to={AppRoutes.MAIN} colorScheme='purple'>
				Home Page
			</Button>
		</Page>
	);
};
