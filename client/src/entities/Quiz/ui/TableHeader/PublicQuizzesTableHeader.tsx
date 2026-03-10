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
				<Th>{t('table.header.author')}</Th>
			</Tr>
		</Thead>
	);
});
