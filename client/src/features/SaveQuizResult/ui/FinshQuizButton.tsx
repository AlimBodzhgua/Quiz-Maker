import type { FC } from 'react';
import { Button, useToast } from '@chakra-ui/react';
import { useQuizResult } from 'entities/Quiz';
import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface FinishQuizButtonProps {
	minutes: number;
	seconds: number;
	onFinish?: () => void;
}

export const FinishQuizButton: FC<FinishQuizButtonProps> = memo((props) => {
	const { minutes, seconds, onFinish } = props;
	const { t } = useTranslation();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const toast = useToast();
	const {
		saveQuizResult,
		requiredQuestionsAmount,
		isUserAskedAllRequiredQuestions,
	} = useQuizResult({ minutes, seconds });

	const onFinishQuiz = async () => {
		if (isUserAskedAllRequiredQuestions()) {
			setIsLoading(true);
			await saveQuizResult();
			setIsLoading(false);

			if (onFinish) {
				onFinish();
			}
		} else {
			toast({
				title: t('toasts.finish_quiz.title'),
				description: `To finish the quiz you need to answer at least ${requiredQuestionsAmount} required questions.`,
				status: 'error',
				position: 'top',
				duration: 5000,
				isClosable: true,
			});
		}
	};

	return (
		<Button
			onClick={onFinishQuiz}
			isLoading={isLoading}
			colorScheme='cyan'
			color='white'
			size='md'
		>
			{t('buttons.finish_quiz')}
		</Button>
	);
});
