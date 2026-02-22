import type { FC } from 'react';
import type { SortFieldType } from '../../model/types';
import { Th, Thead, Tr } from '@chakra-ui/react';
import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { sortField } from 'shared/constants';
import { ColumnToggleSort } from './ColumnToggleSort';

export const PublicQuizzesTableHeader: FC = memo(() => {
	const { t } = useTranslation();
	const [activeField, setActiveField] = useState<SortFieldType | null>(null);

	const onChangeActiveField = useCallback((field: SortFieldType) => {
		setActiveField(field);
	}, []);

	return (
		<Thead>
			<Tr>
				<Th>
					<ColumnToggleSort
						text='Name'
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
				<Th>{t('Author')}</Th>
			</Tr>
		</Thead>
	);
});
