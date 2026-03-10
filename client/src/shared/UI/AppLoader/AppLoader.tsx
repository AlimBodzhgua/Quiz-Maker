import type { FC } from 'react';

import { Flex, Heading, Spinner } from '@chakra-ui/react';
import { memo } from 'react';

export const AppLoader: FC = memo(() => {
	return (
		<Flex
			direction='column'
			alignItems='center'
			position='absolute'
			height='100vh'
			left='45%'
			transform='translate(45%, 50%)'
		>
			<Spinner color='bg.blue' mb='10px' size='lg' />
			<Heading size='md' color='bg.blue'>
				Loading...
			</Heading>
		</Flex>
	);
});
