import { FC } from 'react';
import { Skeleton, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';


export const TableSkeleton: FC = () => {
	return (
		<TableContainer>
			<Table variant='simple'>
				<Thead>
					<Tr>
						<Th><Skeleton height='20px'/></Th>
						<Th><Skeleton height='20px'/></Th>
						<Th><Skeleton height='20px'/></Th>
						<Th><Skeleton height='20px'/></Th>
					</Tr>
				</Thead>
				<Tbody>
					{Array(12).fill(0).map((_, index) => (
						<Tr key={index}>
							<Td colSpan={4}><Skeleton height='20px'/></Td>
						</Tr>
					))}
				</Tbody>
			</Table>
		</TableContainer>
	)
}