import type { FC } from 'react';
import type { SortFieldType } from '../../model/types';
import { Th, Thead, Tr } from '@chakra-ui/react';
import { memo, useCallback, useState } from 'react';
import { sortField } from 'shared/constants';
import { ColumnToggleSort } from './ColumnToggleSort';

export const PublicQuizzesTableHeader: FC = memo(() => {
	const [acitveField, setActiveField] = useState<SortFieldType | null>(null);

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
				<Th>Author</Th>
			</Tr>
		</Thead>
	);
});
