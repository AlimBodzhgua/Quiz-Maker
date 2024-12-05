import { FC, memo, useCallback } from 'react';
import { DeleteIcon, MinusIcon } from '@chakra-ui/icons';
import { Button, ScaleFade, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react';
import { useQuizzesStore } from 'store/quizzes';
import { AppDialog } from '../UI/AppDialog/AppDialog';

export const TableHeader: FC = memo(() => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const resetSelectedList = useQuizzesStore((state) => state.resetSelectedList);
	const selectedQuizzes = useQuizzesStore((state) => state.selectedQuizzes);
	const isSelecting = useQuizzesStore((state) => state.isSelecting);
	const removeSelectedList = useQuizzesStore((state) => state.removeSelectedList);

	const handleRemove = useCallback(() => {
		removeSelectedList();
		onClose();
	}, []);

	return (
		<Thead>
			<Tr>
				<Th pl='10px'>
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
							bodyText={'Are you sure? You can\'t undo this action afterwards.'}
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
				<Th>Name</Th>
				<Th>Date Created</Th>
				<Th isNumeric>Questions</Th>
				<Th isNumeric>Number of participants</Th>
				<Th>Action</Th>
			</Tr>
		</Thead>
	);
});