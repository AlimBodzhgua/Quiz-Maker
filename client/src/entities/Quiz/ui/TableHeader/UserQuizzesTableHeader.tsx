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
							color='blue.600'
							borderColor='blue.600'
							borderWidth='2px'
							disabled={!selectedQuizzes.length}
							onClick={resetSelectedList}
						>
							<MinusIcon />
						</Button>
						<AppDialog
							isOpen={isOpen}
							header={t('quiz_dialog.delete.selected_quiz.title')}
							body={t('quiz_dialog.delete.confirm_bulk')}
							actionText={t('buttons.delete')}
							actionHandler={handleRemove}
							onClose={onClose}
						>
							<Button
								fontWeight='extrabold'
								variant='outline'
								size='xs'
								p='0 2px'
								color='red.600'
								borderColor='red.600'
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
						text={t('table.header.name')}
						sortField={sortField.name}
						activeField={activeField}
						onChangeActiveField={onChangeActiveField}
					/>
				</Th>
				<Th>
					<ColumnToggleSort
						text={t('table.header.date')}
						sortField={sortField.date}
						activeField={activeField}
						onChangeActiveField={onChangeActiveField}
					/>
				</Th>
				<Th isNumeric>{t('table.header.questions')}</Th>
				<Th isNumeric>{t('table.header.participants')}</Th>
				<Th><Flex justifyContent='center'>{t('table.header.action')}</Flex></Th>
			</Tr>
		</Thead>
	);
});
