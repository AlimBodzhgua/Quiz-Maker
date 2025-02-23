import { FC, memo, useEffect, useMemo, useState } from 'react';
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
	Tooltip,
	Box,
} from '@chakra-ui/react';
import {
	CheckBoxAnswers,
	InputAnswer,
	RadioButtonAnswers,
	TrueOrFalseAnswers,
} from '../QuestionTypeAnswers';
import { Answer, Question, QuestionType } from '../../model/types';
import { useCurrentQuiz } from '../../model/store/currentQuiz';
import { AnswersService } from '../../api/AnswersService';
import RequiredIcon from '../../assets/required.svg';

interface QuestionItemProps {
	question: Question;
}

export const QuestionItem: FC<QuestionItemProps> = memo(({ question }) => {
	const currentQuiz = useCurrentQuiz((state) => state.quiz);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [answers, setAnswers] = useState<Answer[]>([]);
	const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

	const initAnswrers = async () => {
		if (currentQuiz) {
			setIsLoading(true);
			const answers = await AnswersService.fetchQuestionAnswers(currentQuiz._id, question._id);
			setAnswers(answers);
			setIsLoading(false);
		}
	};

	useEffect(() => {
		initAnswrers();
	}, []);

	const mapToQuestionTypeAnswers: Record<QuestionType, JSX.Element> = useMemo(() => ({
		multipleAnswer: <CheckBoxAnswers answers={answers} isAnswerSubmit={isSubmitted}/>,
		oneAnswer: <RadioButtonAnswers answers={answers} isAnswerSubmit={isSubmitted}/>,
		inputAnswer: <InputAnswer answers={answers} isAnswerSubmit={isSubmitted}/>,
		trueOrFalse: <TrueOrFalseAnswers answers={answers} isAnswerSubmit={isSubmitted}/>,	
	} as const), [answers, isSubmitted]);

	const onSubmit = () => {
		setIsSubmitted(true);
	};

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
		);
	}
	
	return (
		<ListItem m='16px 0'>
			<Card minW='md' maxW='xl'>
				<CardHeader pb='0'>
					<Flex align='center'>
						<Text size='lg' mr='6px'>{`${question.order})`}</Text>
						<Heading size='md' as='h4'>{question.description}</Heading>
						{!question.isRequired && (
							<Tooltip hasArrow placement='right-end' label='This question is not required'>
								<Box><RequiredIcon /></Box>
							</Tooltip>
						)}
					</Flex>
				</CardHeader>
				<CardBody>
					{mapToQuestionTypeAnswers[question.type]}
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
