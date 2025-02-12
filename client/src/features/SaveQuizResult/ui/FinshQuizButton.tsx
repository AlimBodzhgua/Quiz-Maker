import { Button, useToast } from '@chakra-ui/react';
import { useQuizResult } from 'entities/Quiz';
import { FC, memo, useState } from 'react';

interface FinishQuizButtonProps {
	minutes: number;
	seconds: number;
	onFinish?: () => void;
}

export const FinishQuizButton: FC<FinishQuizButtonProps> = memo((props) => {
	const { minutes, seconds, onFinish } = props;
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const toast = useToast();
	const {
		saveQuizResult,
		correctAnswers,
		incorrectAnswers,
		questionsAmount,
	} = useQuizResult({ minutes, seconds });

	const onFinishQuiz = async () => {
		const answeredQuestionsAmount = correctAnswers + incorrectAnswers;
		if (onFinish) onFinish();

		if (answeredQuestionsAmount === questionsAmount) {
			setIsLoading(true);
			await saveQuizResult()
			setIsLoading(false);
			
		} else {
			toast({
				title: 'You haven\'t answered all the questions.',
				description: `To complete the quiz you need to answer all ${questionsAmount} questions.`,
				status: 'error',
				position: 'top',
				duration: 5000,
				isClosable: true,
			});
		}
	}


	return (
		<Button
			onClick={onFinishQuiz}
			isLoading={isLoading}
			colorScheme='cyan'
			color='white'
			size='lg'
		>
			Finish Quiz
		</Button>
	)
});