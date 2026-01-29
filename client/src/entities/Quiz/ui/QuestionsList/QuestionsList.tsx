import type { FC } from 'react';
import { Card, CardBody, CardHeader, List, ListItem, Skeleton } from '@chakra-ui/react';
import { memo } from 'react';
import { useCurrentQuiz } from '../../model/store/currentQuiz';
import { QuestionItem } from './QuestionItem';

interface QuestionsListProps {
	isBlured?: boolean;
}

export const QuestionsList: FC<QuestionsListProps> = memo((props) => {
	const { isBlured } = props;
	const questions = useCurrentQuiz((state) => state.questions);
	const status = useCurrentQuiz((state) => state.getCurrentQuizStatus);
	const isLoading = status === 'pending';

	if (isLoading) {
		return (
			<List>
				{Array.from({ length: 4 }).fill(0).map((_, index) => (
					<ListItem m='16px 0' key={index}>
						<Card minW='md' maxW='xl'>
							<CardHeader pb='0'>
								<Skeleton height='25px' />
							</CardHeader>
							<CardBody>
								<Skeleton height='95px' />
							</CardBody>
						</Card>
					</ListItem>
				))}
			</List>
		);
	}

	return (
		<List
			filter={!isBlured ? 'blur(5px)' : 'none'}
			pointerEvents={!isBlured ? 'none' : 'all'}
			transition='.2s filter linear'
		>
			{questions && questions.map((question) => (
				<QuestionItem question={question} key={question._id} />
			))}
		</List>
	);
});
