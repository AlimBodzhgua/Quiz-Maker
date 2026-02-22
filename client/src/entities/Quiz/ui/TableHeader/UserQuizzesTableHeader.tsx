import type { FC } from 'react';
import type { SortFieldType } from '../../model/types';
import { DeleteIcon, MinusIcon } from '@chakra-ui/icons';
import { Button, Flex, ScaleFade, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react';
import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { sortField } from 'shared/constants';
import { AppDialog } from 'shared/UI';
import { useQuizzesStore } from '../../model/store/quizzes';
import { ColumnToggleSort } from './ColumnToggleSort';

export const UserQuizzesTableHeader: FC = memo(() => {
	const { t } = useTranslation();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const resetSelectedList = useQuizzesStore((state) => state.resetSelectedList);
	const selectedQuizzes = useQuizzesStore((state) => state.selectedQuizzes);
	const isSelecting = useQuizzesStore((state) => state.isSelecting);
	const removeSelectedList = useQuizzesStore((state) => state.removeSelectedList);
	const [activeField, setActiveField] = useState<SortFieldType | null>(null);

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
							header={t('Delete selected quizzes')}
							body={t('Are you sure? You can\'t undo this action afterwards.')}
							actionText={t('Delete')}
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
						text={t('Name')}
						sortField={sortField.name}
						activeField={activeField}
						onChangeActiveField={onChangeActiveField}
					/>
				</Th>
				<Th>
					<ColumnToggleSort
						text={t('Date')}
						sortField={sortField.date}
						activeField={activeField}
						onChangeActiveField={onChangeActiveField}
					/>
				</Th>
				<Th isNumeric>{t('Questions')}</Th>
				<Th isNumeric>{t('Number of participants')}</Th>
				<Th><Flex justifyContent='center'>{t('Action')}</Flex></Th>
			</Tr>
		</Thead>
	);
});
