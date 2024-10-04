import { FC, memo } from 'react';
import { Button, Flex, Td, Tr } from '@chakra-ui/react';
import { DeleteIcon, InfoOutlineIcon } from '@chakra-ui/icons';
import { ITest } from 'types/types';
import { Link } from 'react-router-dom';

interface TestItemProps {
	testItem?: ITest;
}

export const getTestPage = (id: string) => `/test/${id}`

export const TestItem: FC<TestItemProps> = memo(({testItem}) => {

	return (
		<Tr>
			<Td>
				<Link to={getTestPage('1')}>
					Test name
				</Link>
			</Td>
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
