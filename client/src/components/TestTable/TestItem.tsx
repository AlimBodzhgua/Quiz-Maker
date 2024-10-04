import { FC, memo } from 'react';
import { Button, Flex, Td, Tr } from '@chakra-ui/react';
import { DeleteIcon, InfoOutlineIcon } from '@chakra-ui/icons';
import { ITest } from 'types/types';

interface TestItemProps {
	testItem?: ITest;
}

export const TestItem: FC<TestItemProps> = memo(({testItem}) => {


	return (
		<Tr>
			<Td>Test</Td>
			<Td>03.25.2023</Td>
			<Td isNumeric>5</Td>
			<Td>
				<Flex align='center' gap='10px'>
					<Button variant='unstyled' _hover={{ color: 'blue.300' }}>
						<InfoOutlineIcon />
					</Button>
					<Button variant='unstyled' _hover={{ color: 'red.300' }}>
						<DeleteIcon />
					</Button>
				</Flex>
			</Td>
		</Tr>
	);
});
