import { FC, memo, ReactNode } from 'react';
import { Flex } from '@chakra-ui/react';

interface PageProps {
	children: ReactNode;
}

export const Page: FC<PageProps> = memo(({children}) => {
	return (
		<Flex justify='center' align='center' direction='column' w='100%' height='100%'>
			{children}
		</Flex>
	)
});