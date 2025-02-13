import { FC, memo, useState, useEffect } from 'react';
import { Box, CheckboxGroup, Flex } from '@chakra-ui/react';
import { CheckboxItem } from './CheckBoxItem';
import { Answer } from '../../../model/types';
import { useCurrentQuiz } from '../../../model/store/currentQuiz';

interface CheckBoxAnswersProps {
	answers: Answer[];
	isAnswerSubmit: boolean;
}

export const CheckBoxAnswers: FC<CheckBoxAnswersProps> = memo(({answers, isAnswerSubmit}) => {
	const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
	const amountOfCorrect = answers.filter((answer) => answer.isCorrect).length;
	const questionAnswer = useCurrentQuiz((state) => state.questionAnswer);

	useEffect(() => {
		if (isAnswerSubmit) {
			let correctAnswersAmount = 0;

			selectedAnswers.forEach((answer) => {
				const splittedAnswer = answer.split(':');
				if (splittedAnswer[1] === 'true') {
					correctAnswersAmount++;
				} 
			})

			if (correctAnswersAmount === amountOfCorrect) {
				questionAnswer(true);
			} else questionAnswer(false);
		}

	}, [isAnswerSubmit]);

	const onChange = (e: Array<string>) => {
		setSelectedAnswers(e);
	};

	return (
		<Box pl='16px'>
			<CheckboxGroup onChange={onChange} isDisabled={isAnswerSubmit}>
				<Flex direction='column'>
					{answers.map((answer) => (
						<CheckboxItem
							key={answer._id}
							answer={answer}
							isAnswerSubmit={isAnswerSubmit}
						/>
					))}
				</Flex>
			</CheckboxGroup>
		</Box>
	);
})