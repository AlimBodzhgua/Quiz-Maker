import { FC, memo, useEffect, useState } from 'react';
import { Box, Flex, RadioGroup } from '@chakra-ui/react';
import { RadioButtonItem } from '../RadioButtonAnswers/RadioButtonItem';
import { Answer } from '../../../model/types';
import { useCurrentQuiz } from '../../../model/store/currentQuiz';

interface TrueOrFalseAnswersProps {
	answers: Answer[];
	isAnswerSubmit: boolean;
}

export const TrueOrFalseAnswers: FC<TrueOrFalseAnswersProps> = memo((props) => {
	const { answers, isAnswerSubmit } = props;
	const [selectedAnswer, setSelectedAnswer] = useState('');
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
		setSelectedAnswer(value);
	};

	return (
		<Box pl='16px'>
			<RadioGroup
				onChange={onChange}
				isDisabled={isAnswerSubmit}
				name='trueOrFalse'
			>
				<Flex direction='column'>
					{answers.map((answer) => (
						<RadioButtonItem
							answer={answer}
							key={answer._id}
							isAnswerSubmit={isAnswerSubmit}
						/>
					))}
				</Flex>
			</RadioGroup>
		</Box>
	);
});
