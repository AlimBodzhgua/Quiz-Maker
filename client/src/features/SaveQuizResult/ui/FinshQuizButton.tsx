import { FC, memo, useState } from 'react';
import { Button, useToast } from '@chakra-ui/react';
import { useQuizResult } from 'entities/Quiz';

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
		requiredQuestionsAmount,
		correctAnswers,
		incorrectAnswers,
	} = useQuizResult({ minutes, seconds });

	const onFinishQuiz = async () => {
		const answeredQuestionsAmount = correctAnswers + incorrectAnswers;
		
		if (answeredQuestionsAmount >= requiredQuestionsAmount) {
			setIsLoading(true);
			await saveQuizResult()
			setIsLoading(false);

			if (onFinish) onFinish();
		} else {
			toast({
				title: 'You haven\'t answered all the questions.',
				description: `To complete the quiz you need to answer at least ${requiredQuestionsAmount} questions.`,
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