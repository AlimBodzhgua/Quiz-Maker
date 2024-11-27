import { FC, memo, useEffect, useState } from 'react';
import { Box, Flex, RadioGroup } from '@chakra-ui/react';
import { IAnswer } from 'types/types';
import { useCurrentQuiz } from 'store/currentQuiz';
import { RadioButtonItem } from './RadioButtonItem';

interface RadioButtonQuestionProps {
	answers: IAnswer[];
	isAnswerSubmit: boolean;
}

export const RadioButtonQuestion: FC<RadioButtonQuestionProps> = memo(({answers, isAnswerSubmit}) => {
	const [selectedAnswer, setSelectedAnswers] = useState<string>('');
	const questionAnswer = useCurrentQuiz((state) => state.questionAnswer);

	useEffect(() => {
		if (isAnswerSubmit) {
			const splittedAnswer = selectedAnswer.split(':');
		
			if (splittedAnswer[1] === 'true') {
				questionAnswer(true);
			} else questionAnswer(false);
		}
	}, [isAnswerSubmit])

	const onChange = (value: string) => {
		setSelectedAnswers(value);
	}

	return (
		<Box pl='16px'>
			<RadioGroup onChange={onChange} name='oneAnswer' isDisabled={isAnswerSubmit}>
				<Flex direction='column'>
					{answers.map((answer) => (
						<RadioButtonItem
							key={answer._id}
							answer={answer}
							isAnswerSubmit={isAnswerSubmit}
						/>
					))}
				</Flex>
			</RadioGroup>
		</Box>
	);
})