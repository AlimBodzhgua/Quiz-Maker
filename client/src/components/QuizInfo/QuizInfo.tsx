import { FC, Fragment, memo, useEffect, useRef, useState } from 'react';
import { Flex, Text } from '@chakra-ui/react';
import { Timer } from 'components/UI/Timer/Timer';
import { useCurrentQuiz } from 'store/currentQuiz';
import { QuizProgressBar } from '../QuizProgressBar/QuizProgressBar';
import { useThrottle } from '@/hooks/useThrottle';

interface QuizInfoProps {
	isTimerStarted: boolean;
	minutes: number;
	seconds: number;
}

export const QuizInfo: FC<QuizInfoProps> = memo((props) => {
	const { isTimerStarted, minutes, seconds } = props;
	const quiz = useCurrentQuiz((state) => state.quiz);
	const correctAnswers = useCurrentQuiz((state) => state.correctAnswers);
	const incorrectAnswers = useCurrentQuiz((state) => state.incorrectAnswers);
	const questions = useCurrentQuiz((state) => state.questions);
	const infoRef = useRef<HTMLDivElement | null>(null);

	const [isSrolledAfter, setIsSrolledAfter] = useState<boolean>(false);

	useEffect(() => {
		window.addEventListener('scroll', onScroll);

		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	const onScroll = useThrottle(() => {
		console.log('scroll')
		const windowTop = window.scrollY;
		const infoTop = infoRef.current?.offsetTop || 75;

		if (windowTop > infoTop * 2) {
			setIsSrolledAfter(true);
		} else {
			setIsSrolledAfter(false);
		}
	}, 200);

	const infoBar = (
		<Fragment>
			{isTimerStarted ? (
				<Flex
					color='white'
					alignItems='center'
					w='50%'
					m='8px 0'
				>
					<QuizProgressBar
						currentValue={correctAnswers + incorrectAnswers}
						maxValue={questions!.length}
					/>
				</Flex>
			) : (
				<Text
					fontWeight='bold'
					color='white'
					w='30%'
					m='8px 0'
				>
					Total quesetions: {questions?.length}
				</Text>
			)}
			{quiz && quiz.withTimer && <Timer minutes={minutes} seconds={seconds} />}
		</Fragment>
	);

	return (
		<Fragment>
			<Flex justifyContent='space-between' ref={infoRef}>
				{infoBar}
			</Flex>

			<Flex
				ref={infoRef}
				opacity={isSrolledAfter ? '1' : '0'}
				justifyContent='space-between'
				position='fixed'
				top='0'
				zIndex='100'
				w='75%'
				p='5px 20px'
				marginLeft='-20px'
				bg='linear-gradient(#0E6FE4, #0447CC)'
				transition='opacity .2s linear'
			>
				{infoBar}
			</Flex>
		</Fragment>
	);
});