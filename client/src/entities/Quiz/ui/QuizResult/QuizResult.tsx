import { Box, Divider, Flex, Heading, Text } from '@chakra-ui/react';
import { useCurrentQuiz } from 'entities/Quiz/model/store/currentQuiz';
import { FC, memo, ReactNode } from 'react';
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
	const correct = useCurrentQuiz((state) => state.correctAnswers);
	const incorrect = useCurrentQuiz((state) => state.incorrectAnswers);
	const questinsAmount = useCurrentQuiz((state) => state.questions)?.length;
	const quiz = useCurrentQuiz((state) => state.quiz);

	return (
		<Box bgColor='#ffff' borderRadius='base' padding='10px 14px'>
			<Flex justifyContent='space-between'>
				<Heading size='md' mb='12px' color='gray.700'>
					Your Result
				</Heading>
				<PrintButton />
			</Flex>
			<Flex
				justifyContent='space-between'
				bgColor='rgb(249, 249, 249)'
				border='1px solid #e8e8e8'
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
					<Text fontWeight='bold' color='gray.500'>Quiz ID</Text>
					<Text>{quiz?._id}</Text>
				</Flex>
				<Flex w='45%' justifyContent='space-between'>
					<Text fontWeight='bold' color='gray.500'>Quiz Name</Text>
					<Text>{quiz?.title}</Text>
				</Flex>
			</Flex>
			<Divider m='8px 0' />

			<Flex
				justifyContent='space-between'
				bgColor='rgb(249, 249, 249)'
				border='1px solid #e8e8e8'
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
					<Text fontWeight='bold' color='gray.500'>User ID</Text>
					<Text>{userId}</Text>
				</Flex>
				<Flex w='45%' justifyContent='space-between'>
					<Text fontWeight='bold' color='gray.500'>User Email</Text>
					<Text>{userEmail}</Text>
				</Flex>
			</Flex>
			<Divider m='8px 0' />

			<Flex
				justifyContent='space-between'
				bgColor='rgb(249, 249, 249)'
				border='1px solid #e8e8e8'
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
					<Text fontWeight='bold' color='gray.500'>Total quesetions</Text>
					<Text>{questinsAmount}</Text>
				</Flex>
				<Flex w='45%' justifyContent='space-between'>
					<Text fontWeight='bold' color='gray.500'>Score</Text>
					<Text>
						{correct}/{questinsAmount}
					</Text>
				</Flex>
			</Flex>
			<Divider m='8px 0' />

			<Flex
				justifyContent='space-between'
				bgColor='rgb(249, 249, 249)'
				border='1px solid #e8e8e8'
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
					<Text fontWeight='bold'>Correct Answers</Text>
					<Text>{correct}</Text>
				</Flex>
				<Flex w='45%' justifyContent='space-between' color='red.400'>
					<Text fontWeight='bold'>Incorrect Answers</Text>
					<Text>{incorrect}</Text>
				</Flex>
			</Flex>
			<Divider m='8px 0' />
			{(quiz && renderQuizRating) && (
				<Flex
					alignItems='center'
					direction='column'
					border='1px solid #e8e8e8'
					bgColor='rgb(249, 249, 249)'
					borderRadius='base'
					padding='10px'
					gap='12px'
					m='16px 0'
				>
					<Heading size='md' fontWeight='medium'>How do you rate this quiz?</Heading>
					{renderQuizRating({quizId: quiz._id})}
				</Flex>
			)}
		</Box>
	);
});