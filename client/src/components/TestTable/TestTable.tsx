import { FC, memo, useEffect } from 'react';
import { Card, CardBody, Heading, Table, TableContainer, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import { useTestsStore } from 'store/tests';
import { TestItem } from './TestItem';
import { TableSkeleton } from './TableSkeleton';

export const TestTable: FC = memo(() => {
	const tests = useTestsStore((state) => state.tests);
	const getTests = useTestsStore((state) => state.getTests);
	const isLoading = useTestsStore((state) => state.isLoading);

	useEffect(() => {
		getTests();
	}, [getTests]);

	if (isLoading) {
		return <TableSkeleton />
	}

	if (!tests.length) {
		return (
			<Card align='center'>
				<CardBody>
					<Heading size='md'>You have not tests yet</Heading>
				</CardBody>
			</Card>
		);
	}

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
					{tests.map((test) => (
						<TestItem testItem={test} key={test._id} />
					))}
				</Tbody>
			</Table>
		</TableContainer>
	);
});
