import { FC, memo, useCallback, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { DeleteIcon, MinusIcon } from '@chakra-ui/icons';
import { Button, Flex, ScaleFade, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react';
import { useQuizzesStore } from 'store/quizzes';
import { SortFieldType } from 'types/sort';
import { AppDialog } from 'components/UI/AppDialog/AppDialog';
import { sortField } from '@/constants/sort';
import { SortToggle } from './SortToggle';

export const TableHeader: FC = memo(() => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const resetSelectedList = useQuizzesStore((state) => state.resetSelectedList);
	const selectedQuizzes = useQuizzesStore((state) => state.selectedQuizzes);
	const isSelecting = useQuizzesStore((state) => state.isSelecting);
	const removeSelectedList = useQuizzesStore((state) => state.removeSelectedList);
	const [acitveField, setActiveField] = useState<SortFieldType | null>(null);
	const location = useLocation();

	const handleRemove = useCallback(() => {
		removeSelectedList();
		onClose();
	}, []);

	const onChangeActiveField = useCallback((field: SortFieldType) => {
		setActiveField(field);
	}, []);

	return (
		<Thead>
			<Tr>
				{location.pathname === '/' && (
					<Th p='10px 10px'>
						<ScaleFade in={isSelecting}>
							<Button
								fontWeight='extrabold'
								variant='outline'
								size='xs'
								p='0 2px'
								mr='5px'
								color='blue.400'
								borderColor='blue.400'
								borderWidth='2px'
								disabled={!selectedQuizzes.length}
								onClick={resetSelectedList}
							>
								<MinusIcon />
							</Button>
							<AppDialog
								isOpen={isOpen}
								headerText={'Delete selected quizzes'}
								bodyText={
									"Are you sure? You can't undo this action afterwards."
								}
								actionText={'Delete'}
								actionHandler={handleRemove}
								onClose={onClose}
							>
								<Button
									fontWeight='extrabold'
									variant='outline'
									size='xs'
									p='0 2px'
									color='red.400'
									borderColor='red.400'
									borderWidth='2px'
									disabled={!selectedQuizzes.length}
									onClick={onOpen}
								>
									<DeleteIcon />
								</Button>
							</AppDialog>
						</ScaleFade>
					</Th>
				)}
				<Th>
					<SortToggle
						text='Name'
						sortField={sortField.name}
						activeField={acitveField}
						onChangeActiveField={onChangeActiveField}
					/>
				</Th>
				<Th>
					<SortToggle
						text='Date'
						sortField={sortField.date}
						activeField={acitveField}
						onChangeActiveField={onChangeActiveField}
					/>
				</Th>
				<Th isNumeric>Questions</Th>
				<Th isNumeric>Number of participants</Th>
				<Th>
					{location.pathname === '/' ? <Flex justifyContent='center'>Action</Flex> : 'Author'}
				</Th>
			</Tr>
		</Thead>
	);
});