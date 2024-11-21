import { FC, memo } from 'react';
import { Card, CardBody, CardHeader, List, ListItem, Skeleton } from '@chakra-ui/react';
import { useCurrentTest } from '@/store/currentTest';
import { QuestionItem } from './QuestionItem';

export const QuestionsList: FC = memo(() => {
	const questions = useCurrentTest((state) => state.questions);
	const isLoading = useCurrentTest((state) => state.isLoading);

	if (isLoading) {
		return (
			<List>
				{Array(4).fill(0).map((_, index) => (
					<ListItem m='16px 0' key={index}>
						<Card minW='md' maxW='xl'>
							<CardHeader pb='0'>
								<Skeleton height='25px'/>
							</CardHeader>
							<CardBody>
								<Skeleton height='95px'/>
							</CardBody>
						</Card>
					</ListItem>
				))}
			</List>
		)
	}

	return (
		<List>
			{questions && questions.map((question) => (
				<QuestionItem question={question} key={question._id} />
			))}
		</List>
	);
});
