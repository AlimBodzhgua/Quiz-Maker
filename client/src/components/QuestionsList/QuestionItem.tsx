import { FC, memo, useEffect, useMemo, useState } from 'react';
import { IAnswer, IQuestion, QuestionType } from 'types/types';
import { useCurrentQuiz } from '@/store/currentQuiz';
import {
	Card,
	CardBody,
	CardHeader,
	Skeleton,
	Flex,
	Heading,
	ListItem,
	Text,
	CardFooter,
	Button,
} from '@chakra-ui/react';
import {
	TrueOrFalseQuestion,
	RadioButtonQuestion,
	InputQuestion,
	CheckBoxQuestion,
} from 'components/QuestionTypes';

interface QuestionItemProps {
	question: IQuestion;
}

export const QuestionItem: FC<QuestionItemProps> = memo(({ question }) => {
	const currentQuiz = useCurrentQuiz((state) => state.quiz);
	const fetchAnswers = useCurrentQuiz((state) => state.fetchQuestionsAnswers);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [answers, setAnswers] = useState<IAnswer[]>([]);
	const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

	useEffect(() => {
		setIsLoading(true);
		if (currentQuiz) {
			fetchAnswers(currentQuiz._id, question._id)
				.then((data) => setAnswers(data!))
				.then(() => setIsLoading(false))
		}
	}, []);


	const mapStateToQuestionType: Record<QuestionType, JSX.Element> = useMemo(() => ({
		multipleAnswer: <CheckBoxQuestion answers={answers} isAnswerSubmit={isSubmitted}/>,
		oneAnswer: <RadioButtonQuestion answers={answers} isAnswerSubmit={isSubmitted}/>,
		inputAnswer: <InputQuestion answers={answers} isAnswerSubmit={isSubmitted}/>,
		trueOrFalse: <TrueOrFalseQuestion answers={answers} isAnswerSubmit={isSubmitted}/>,	
	} as const), [answers, isSubmitted])

	const onSubmit = () => {
		setIsSubmitted(true);
	}

	if (isLoading) {
		return (
			<ListItem m='16px 0'>
				<Card minW='md' maxW='xl'>
					<CardHeader pb='0'>
					<Flex align='center'>
						<Text size='lg' mr='6px'>{`${question.order})`}</Text>
						<Heading size='md' as='h4'>{question.description}</Heading>
					</Flex>
					</CardHeader>
					<CardBody>
						<Skeleton height='72px'/>
					</CardBody>
				</Card>
			</ListItem>
		)
	}

	
	return (
		<ListItem m='16px 0'>
			<Card minW='md' maxW='xl'>
				<CardHeader pb='0'>
					<Flex align='center'>
						<Text size='lg' mr='6px'>{`${question.order})`}</Text>
						<Heading size='md' as='h4'>{question.description}</Heading>
					</Flex>
				</CardHeader>
				<CardBody>
					{mapStateToQuestionType[question.type]}
				</CardBody>
				<CardFooter justify='flex-end' pt='0'>
					<Button
						size='sm'
						onClick={onSubmit}
						disabled={isSubmitted}
					>Submit Answer</Button>
				</CardFooter>
			</Card>
		</ListItem>
	)
});
