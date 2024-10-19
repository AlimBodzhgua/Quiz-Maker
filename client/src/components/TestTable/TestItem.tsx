import { FC, memo } from 'react';
import { Button, Flex, Td, Tr } from '@chakra-ui/react';
import { DeleteIcon, InfoOutlineIcon } from '@chakra-ui/icons';
import { getTestPage } from '@/router/router';
import { useTestsStore } from 'store/tests';
import { ITest } from 'types/types';
import { Link } from 'react-router-dom';

interface TestItemProps {
	testItem: ITest;
}


export const TestItem: FC<TestItemProps> = memo(({ testItem }) => {
	const removeTest = useTestsStore((state) => state.removeTest);
	const formatter = new Intl.DateTimeFormat('en-US', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
	});

	const handleRemove = () => {
		removeTest(testItem._id);
	};

	return (
		<Tr>
			<Td>
				<Link to={getTestPage(testItem._id)}>{testItem.title}</Link>
			</Td>
			<Td>{formatter.format(new Date(testItem.createdAt)).split('/').join('.')}</Td>
			<Td isNumeric>5</Td>
			<Td>
				<Flex align='center' gap='10px'>
					<Button
						as={Link}
						to={getTestPage(testItem._id)}
						variant='unstyled'
						alignContent='center'
						_hover={{ color: 'blue.300' }}
					>
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
