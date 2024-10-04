import { FC, memo } from 'react';
import { TestItem } from './TestItem';
import { Table, TableContainer, Tbody, Th, Thead, Tr } from '@chakra-ui/react';

export const TestTable: FC = memo(() => {
	return (
		<TableContainer>
			<Table variant='simple' colorScheme='teal'>
				<Thead>
					<Tr>
						<Th>Name</Th>
						<Th>Date Created</Th>
						<Th isNumeric>Number of participants</Th>
						<Th>Action</Th>
					</Tr>
				</Thead>
				<Tbody>
					<TestItem />
				</Tbody>
			</Table>
		</TableContainer>
	);
});