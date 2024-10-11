import { FC, memo, useEffect } from 'react';
import { TestItem } from './TestItem';
import { Table, TableContainer, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import { useTestsStore } from 'src/store/tests';

export const TestTable: FC = memo(() => {
	const tests = useTestsStore((state) => state.tests);
	const getTests = useTestsStore((state) => state.getTests);

	useEffect(() => {
		getTests();
	}, [tests])

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
					{tests.length && tests.map((test) => (
						<TestItem testItem={test} key={test._id}/>
					))}
				</Tbody>
			</Table>
		</TableContainer>
	);
});