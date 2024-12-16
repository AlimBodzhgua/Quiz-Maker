import { Flex, Heading, Spinner } from '@chakra-ui/react';
import { FC, memo } from 'react';

export const AppLoader: FC = memo(() => {

	return (
		<Flex
			direction='column'
			alignItems='center'
			position='absolute'
			height='100vh'
			left='45%'
			transform={'translate(45%, 50%)'}
		>
			<Spinner color='blue.500' mb='10px' size='lg' />
			<Heading size='md' color='blue.500'>
				Loading...
			</Heading>
		</Flex>
	);
})