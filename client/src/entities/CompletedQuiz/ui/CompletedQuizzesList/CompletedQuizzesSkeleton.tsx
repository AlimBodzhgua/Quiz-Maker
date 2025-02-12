import { FC } from 'react';
import { List, ListItem, Skeleton } from '@chakra-ui/react';

export const CompletedQuizzesSkeleton: FC = () => {
	return (
		<List display='flex' flexWrap='wrap' justifyContent='center' gap='20px'>
			{Array(8)
				.fill(0)
				.map((_, index) => (
					<ListItem m='16px 0' key={index}>
						<Skeleton width='300px' height='195px' />
					</ListItem>
				))}
		</List>
	);
};