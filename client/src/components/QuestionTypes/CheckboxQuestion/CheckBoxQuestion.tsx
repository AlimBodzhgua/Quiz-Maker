import { FC, memo, useState, useEffect } from 'react';
import { IAnswer } from '@/types/types';
import { Box, CheckboxGroup, Flex } from '@chakra-ui/react';
import { CheckboxItem } from './CheckBoxItem';
import { useCurrentTest } from '@/store/currentTest';

interface CheckBoxQuestion {
	answers: IAnswer[];
	isAnswerSubmit: boolean;
}
// MultipleAnswer (CheckBox)
export const CheckBoxQuestion: FC<CheckBoxQuestion> = memo(({answers, isAnswerSubmit}) => {
	const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean>(false);
	const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
	const amountOfCorrect = answers.filter((answer) => answer.isCorrect).length;
	const questionAnswer = useCurrentTest((state) => state.questionAnswer);

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

	}, [isAnswerSubmit])

	const onChange = (e: Array<string>) => {
		setSelectedAnswers(e);
	}

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