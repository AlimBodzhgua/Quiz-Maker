import { FC, memo, ReactNode } from 'react';
import { Flex } from '@chakra-ui/react';

interface PageProps {
	children: ReactNode;
	centered?: boolean;
}

export const Page: FC<PageProps> = memo((props) => {
	const { centered, children } = props;

	return (
		<Flex
			justify={centered ? 'center' : 'flex-start'}
			align='center'
			direction='column'
			h='100%'
			w='100%'
		>
			{children}
		</Flex>
	);
});
