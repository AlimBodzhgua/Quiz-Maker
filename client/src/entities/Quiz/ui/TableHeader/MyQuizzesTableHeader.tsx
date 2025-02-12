import { FC, memo, useCallback, useState } from 'react';
import { DeleteIcon, MinusIcon } from '@chakra-ui/icons';
import { Button, Flex, ScaleFade, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react';
import { sortField } from 'shared/constants/sort';
import { AppDialog } from 'shared/UI';
import { useQuizzesStore } from '../../model/store/quizzes';
import { SortFieldType } from '../../model/types';
import { ColumnToggleSort } from './ColumnToggleSort';


export const MyQuizzesTableHeader: FC = memo(() => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const resetSelectedList = useQuizzesStore((state) => state.resetSelectedList);
	const selectedQuizzes = useQuizzesStore((state) => state.selectedQuizzes);
	const isSelecting = useQuizzesStore((state) => state.isSelecting);
	const removeSelectedList = useQuizzesStore((state) => state.removeSelectedList);
	const [acitveField, setActiveField] = useState<SortFieldType | null>(null);

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
								'Are you sure? You can\'t undo this action afterwards.'
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
				<Th>
					<ColumnToggleSort
						text='Name'
						sortField={sortField.name}
						activeField={acitveField}
						onChangeActiveField={onChangeActiveField}
					/>
				</Th>
				<Th>
					<ColumnToggleSort
						text='Date'
						sortField={sortField.date}
						activeField={acitveField}
						onChangeActiveField={onChangeActiveField}
					/>
				</Th>
				<Th isNumeric>Questions</Th>
				<Th isNumeric>Number of participants</Th>
				<Th><Flex justifyContent='center'>Action</Flex></Th>
			</Tr>
		</Thead>
	);
});