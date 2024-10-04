import { Flex } from '@chakra-ui/react';
import { FC, memo, ReactNode } from 'react';

interface PageProps {
	children: ReactNode;
}

export const Page: FC<PageProps> = memo(({children}) => {
	return (
		<Flex justify='center' align='center' w='100%' height='100%'>
			{children}
		</Flex>
	)
});