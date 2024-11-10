import { FC, memo, useCallback, useState } from 'react';
import { Button, Flex, Td, Tr, useDisclosure } from '@chakra-ui/react';
import { DeleteIcon, InfoOutlineIcon } from '@chakra-ui/icons';
import { getTestPage } from '@/router/router';
import { useTestsStore } from 'store/tests';
import { ITest } from 'types/types';
import { Link } from 'react-router-dom';
import { AppDialog } from '../UI/AppDialog/AppDialog';

interface TestItemProps {
	testItem: ITest;
}

export const TestItem: FC<TestItemProps> = memo(({ testItem }) => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const removeTest = useTestsStore((state) => state.removeTest);
	const formatter = new Intl.DateTimeFormat('en-US', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
	});

	const handleRemove = useCallback(async () => {
		setIsLoading(true);
		await removeTest(testItem._id);
		onClose();
		setIsLoading(false);
	}, [removeTest, onClose]);

	return (
		<Tr opacity={isLoading ? 0.2 : 1} transition={'opacity .4s linear'}>
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

					<AppDialog
						isOpen={isOpen}
						headerText={`Delete Test: ${testItem.title}`}
						bodyText={`Are you sure? You can't undo this action afterwards.`}
						actionText={'Delete'}
						actionHandler={handleRemove}
						onClose={onClose}
					>
						<Button
							variant='unstyled'
							_hover={{ color: 'red.300' }}
							onClick={onOpen}
						>
							<DeleteIcon />
						</Button>
					</AppDialog>
				</Flex>
			</Td>
		</Tr>
	);
});
