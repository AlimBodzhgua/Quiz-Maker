import { FC, memo, useEffect, useState } from 'react';
import { Box, Flex, RadioGroup } from '@chakra-ui/react';
import { RadioButtonItem } from './RadioButtonItem';
import { Answer } from '../../../model/types';
import { useCurrentQuiz } from '../../../model/store/currentQuiz';

interface RadioButtonAnswersProps {
	answers: Answer[];
	isAnswerSubmit: boolean;
}

export const RadioButtonAnswers: FC<RadioButtonAnswersProps> = memo(({answers, isAnswerSubmit}) => {
	const [selectedAnswer, setSelectedAnswers] = useState<string>('');
	const questionAnswer = useCurrentQuiz((state) => state.questionAnswer);

	useEffect(() => {
		if (isAnswerSubmit) {
			const splittedAnswer = selectedAnswer.split(':');
		
			if (splittedAnswer[1] === 'true') {
				questionAnswer(true);
			} else questionAnswer(false);
		}
	}, [isAnswerSubmit]);

	const onChange = (value: string) => {
		setSelectedAnswers(value);
	};

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