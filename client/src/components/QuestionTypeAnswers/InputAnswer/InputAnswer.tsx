import { FC, memo, useEffect, useRef, useState } from 'react';
import { IAnswer } from 'types/types';
import { getDataMatchedAnswer } from '@/utils/utils';
import { Box, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { useCurrentQuiz } from 'store/currentQuiz';

interface InputAnswerProps {
	answers: IAnswer[];
	isAnswerSubmit: boolean;
}

export const InputAnswer: FC<InputAnswerProps> = memo((props) => {
	const { answers, isAnswerSubmit } = props;
	const inputRef = useRef<HTMLInputElement | null>(null)
	const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean>(false);
	const questionAnswer = useCurrentQuiz((state) => state.questionAnswer);

	useEffect(() => {
		if (answers.length && isAnswerSubmit) {
			if (answers[0].value === inputRef.current?.value) {
				setIsAnswerCorrect(true);
				questionAnswer(true);
			} else {
				setIsAnswerCorrect(false);
				questionAnswer(false);
			}
		}
	}, [isAnswerSubmit]);

	return (
		<Box pl='16px'>
			<InputGroup>
				<Input
					bgColor={isAnswerSubmit ? getDataMatchedAnswer(isAnswerCorrect).color : 'none'}
					color={isAnswerSubmit ? '#fff' : 'black'}
					placeholder='Enter your answer here...'
					ref={inputRef}
				/>
				<InputRightElement>
					{isAnswerSubmit && getDataMatchedAnswer(isAnswerCorrect).icon}
				</InputRightElement>
			</InputGroup>
		</Box>
	)
})