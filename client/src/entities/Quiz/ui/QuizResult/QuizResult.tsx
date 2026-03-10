import type { FC, ReactNode } from 'react';
import { DownloadIcon } from '@chakra-ui/icons';
import { Box, Button, Divider, Flex, Heading, Text } from '@chakra-ui/react';
import { useCurrentQuiz } from 'entities/Quiz/model/store/currentQuiz';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Margin, usePDF } from 'react-to-pdf';
import { PrintButton } from 'shared/UI';

type QuizRatingParams = {
	quizId: string;
};

interface QuizResultProps {
	userId: string;
	userEmail: string;
	renderQuizRating?: (params: QuizRatingParams) => ReactNode;
}

export const QuizResult: FC<QuizResultProps> = memo((props) => {
	const {
		userId,
		userEmail,
		renderQuizRating,
	} = props;
	const { t } = useTranslation();
	const correct = useCurrentQuiz((state) => state.correctAnswers);
	const incorrect = useCurrentQuiz((state) => state.incorrectAnswers);
	const questionsAmount = useCurrentQuiz((state) => state.questions)?.length;
	const quiz = useCurrentQuiz((state) => state.quiz);
	const { toPDF, targetRef } = usePDF({
		filename: 'result.pdf',
		page: {
			margin: Margin.SMALL,
		},
	});

	const onDownloadPDF = () => {
		const elementsToHide = document.querySelectorAll<HTMLDivElement>('#hide-in-pdf');

		elementsToHide.forEach((element) => {
			element.style.opacity = '0';
		});

		toPDF();

		elementsToHide.forEach((element) => {
			element.style.opacity = '1';
		});
	};

	return (
		<Box
			bgColor='bg.secondary'
			borderRadius='base'
			padding='10px 14px'
			ref={targetRef}
		>
			<Flex justifyContent='space-between' alignItems='center'>
				<Heading size='md' mb='12px' color='gray.700'>
					{t('quiz_result.title')}
				</Heading>
				<Flex alignItems='center' gap='8px' id='hide-in-pdf'>
					<Button
						size='sm'
						variant='unstyled'
						onClick={onDownloadPDF}
						_hover={{ transform: 'scale(1.1)' }}
					>
						<DownloadIcon fontSize='18px' />
					</Button>
					<PrintButton />
				</Flex>
			</Flex>
			<Flex
				justifyContent='space-between'
				bgColor='bg.white'
				border='1px solid'
				borderColor='border.white'
				borderRadius='base'
				p='4px 10px'
			>
				<Flex
					w='50%'
					justifyContent='space-between'
					borderRight='1px solid'
					borderColor='gray.200'
					paddingRight='5%'
				>
					<Text fontWeight='bold' color='gray.500'>{t('quiz_result.user_id')}</Text>
					<Text>{quiz?._id}</Text>
				</Flex>
				<Flex w='45%' justifyContent='space-between'>
					<Text fontWeight='bold' color='gray.500'>{t('quiz_result.quiz_name')}</Text>
					<Text>{quiz?.title}</Text>
				</Flex>
			</Flex>
			<Divider m='8px 0' />

			<Flex
				justifyContent='space-between'
				bgColor='bg.white'
				border='1px solid'
				borderColor='border.white'
				borderRadius='base'
				p='4px 10px'
			>
				<Flex
					w='50%'
					justifyContent='space-between'
					borderRight='1px solid'
					borderColor='gray.200'
					paddingRight='5%'
				>
					<Text fontWeight='bold' color='gray.500'>{t('quiz_result.user_id')}</Text>
					<Text>{userId}</Text>
				</Flex>
				<Flex w='45%' justifyContent='space-between'>
					<Text fontWeight='bold' color='gray.500'>{t('quiz_result.user_email')}</Text>
					<Text>{userEmail}</Text>
				</Flex>
			</Flex>
			<Divider m='8px 0' />

			<Flex
				justifyContent='space-between'
				bgColor='bg.white'
				border='1px solid'
				borderColor='border.white'
				borderRadius='base'
				p='4px 10px'
			>
				<Flex
					w='50%'
					justifyContent='space-between'
					borderRight='1px solid'
					borderColor='gray.200'
					paddingRight='5%'
				>
					<Text fontWeight='bold' color='gray.500'>{t('quiz_result.total_questions')}</Text>
					<Text>{questionsAmount}</Text>
				</Flex>
				<Flex w='45%' justifyContent='space-between'>
					<Text fontWeight='bold' color='gray.500'>{t('quiz_result.score')}</Text>
					<Text>
						{correct}
						/
						{questionsAmount}
					</Text>
				</Flex>
			</Flex>
			<Divider m='8px 0' />

			<Flex
				justifyContent='space-between'
				bgColor='bg.white'
				border='1px solid'
				borderColor='border.white'
				borderRadius='base'
				p='4px 10px'
			>
				<Flex
					w='50%'
					justifyContent='space-between'
					borderRight='1px solid'
					borderColor='gray.200'
					paddingRight='5%'
					color='green.400'
				>
					<Text fontWeight='bold'>{t('quiz_result.correct_answers')}</Text>
					<Text>{correct}</Text>
				</Flex>
				<Flex w='45%' justifyContent='space-between' color='red.400'>
					<Text fontWeight='bold'>{t('quiz_result.incorrect_answers')}</Text>
					<Text>{incorrect}</Text>
				</Flex>
			</Flex>
			<Divider m='8px 0' />
			{(quiz && renderQuizRating) && (
				<Flex
					alignItems='center'
					direction='column'
					border='1px solid'
					borderColor='border.white'
					borderRadius='base'
					bgColor='bg.white'
					padding='10px'
					gap='12px'
					m='16px 0'
					id='hide-in-pdf'
				>
					<Heading size='md' fontWeight='medium'>{t('quiz_result.rate')}</Heading>
					{renderQuizRating({ quizId: quiz._id })}
				</Flex>
			)}
		</Box>
	);
});
