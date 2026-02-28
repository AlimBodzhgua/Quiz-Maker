import type { FlexProps } from '@chakra-ui/react';
import type { FC, ReactNode } from 'react';
import { Flex } from '@chakra-ui/react';

interface PageProps extends FlexProps {
	children: ReactNode;
	centered?: boolean;
}

export const Page: FC<PageProps> = (props) => {
	const { centered, children } = props;

	return (
		<Flex
			justify={centered ? 'center' : 'flex-start'}
			align='center'
			direction='column'
			bgColor='bg.primary'
			minH='100vh'
			w='100%'
		>
			{children}
		</Flex>
	);
};
