import { FC, memo, useEffect, useState } from 'react';
import { IAnswer } from 'types/types';
import { Box, Flex, RadioGroup } from '@chakra-ui/react';
import { useCurrentQuiz } from 'store/currentQuiz';
import { RadioButtonItem } from '../RadioButtonQuestion/RadioButtonItem';

interface TrueOrFalseQuestionProps {
	answers: IAnswer[];
	isAnswerSubmit: boolean;
}

export const TrueOrFalseQuestion: FC<TrueOrFalseQuestionProps> = memo((props) => {
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
