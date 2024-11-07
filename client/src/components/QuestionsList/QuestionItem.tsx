import { FC, memo, useEffect, useMemo, useState } from 'react';
import { Card, CardBody, CardHeader, Skeleton, Flex, Heading, ListItem, Text } from '@chakra-ui/react';
import { IAnswer, IQuestion, QuestionType } from 'types/types';
import { useCurrentTest } from 'store/currentTest';
import { CheckBoxQuestion } from '../QuestionTypes/CheckBoxQuestion';
import { RadioButtonQuestion } from '../QuestionTypes/RadioButtonQuestion';
import { InputQuestion } from '../QuestionTypes/InputQuestion';
import { TrueOrFalseQuestion } from '../QuestionTypes/TrueOrFalseQuestion';

interface QuestionItemProps {
	question: IQuestion;
}

export const QuestionItem: FC<QuestionItemProps> = memo(({ question }) => {
	const currentTest = useCurrentTest((state) => state.test);
	const fetchAnswers = useCurrentTest((state) => state.fetchQuestionsAnswers);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [answers, setAnswers] = useState<IAnswer[]>([]);

	useEffect(() => {
		setIsLoading(true);
		if (currentTest) {
			fetchAnswers(currentTest._id, question._id)
				.then((data) => setAnswers(data!))
				.then(() => setIsLoading(false))
		}
	}, []);


	const mapStateToQuestionType: Record<QuestionType, JSX.Element> = useMemo(() => ({
		multipleAnswer: <CheckBoxQuestion answers={answers} />,
		oneAnswer: <RadioButtonQuestion answers={answers} />,
		inputAnswer: <InputQuestion answers={answers} />,
		trueOrFalse: <TrueOrFalseQuestion answers={answers} />,	
	} as const), [answers])

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
			</Card>
		</ListItem>
	)
});
