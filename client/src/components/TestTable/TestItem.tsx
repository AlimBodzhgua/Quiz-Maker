import { FC, memo } from 'react';
import { Button, Flex, Td, Tr } from '@chakra-ui/react';
import { DeleteIcon, InfoOutlineIcon } from '@chakra-ui/icons';
import { ITest } from 'types/types';
import { Link } from 'react-router-dom';
import { useTestsStore } from 'src/store/tests';

interface TestItemProps {
	testItem: ITest;
}

export const getTestPage = (id: string) => `/test/${id}`

export const TestItem: FC<TestItemProps> = memo(({ testItem }) => {
	const removeTest = useTestsStore((state) => state.removeTest);
	const formatter = new Intl.DateTimeFormat('en-US')

	const handleRemove = () => {
		removeTest(testItem._id);
	}

	return (
		<Tr>
			<Td>
				<Link to={getTestPage(testItem._id)}>
					{testItem.title}
				</Link>
			</Td>
			<Td>{formatter.format(new Date(testItem.createdAt))}</Td>
			<Td isNumeric>5</Td>
			<Td>
				<Flex align='center' gap='10px'>
					<Button variant='unstyled' _hover={{ color: 'blue.300' }}>
						<InfoOutlineIcon />
					</Button>
					<Button
						variant='unstyled'
						_hover={{ color: 'red.300' }}
						onClick={handleRemove}
					>
						<DeleteIcon />
					</Button>
				</Flex>
			</Td>
		</Tr>
	);
});
