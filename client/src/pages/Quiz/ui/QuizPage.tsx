import type { FC } from 'react';

import { DownloadIcon, StarIcon } from '@chakra-ui/icons';
import { Box, Button, Collapse, Flex, Heading, Text, useDisclosure } from '@chakra-ui/react';
import {
	PrivacyDrawer,
	QuestionsList,
	QuizHeader,
	QuizResult,
	useCurrentQuiz,
} from 'entities/Quiz';
import { useUserStore } from 'entities/User';
import {
	PasswordRequireDialog,
	PrivateLinkDialog,
	RestrictedAccessDialog,
	useQuizAccess,
} from 'features/QuizAccessControl';
import { QuizRating } from 'features/RateQuiz';
import { FinishQuizButton } from 'features/SaveQuizResult';
import { useCallback, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Margin, usePDF } from 'react-to-pdf';
import { NoPrint } from 'shared/lib/components/NoPrint';
import { useTimer } from 'shared/lib/hooks';
import { Page } from 'widgets/Page';
import { ShareButton } from 'widgets/ShareButton';

import { getMatchedTimerProps } from '../lib/getMatchedTimerProps';

const QuizPage: FC = () => {
	const { id } = useParams<{ id?: string }>();
	const { isOpen, onToggle } = useDisclosure();
	const location = useLocation();
	const user = useUserStore((state) => state.user);
	const [isStarted, setIsStarted] = useState<boolean>(false);
	const [isPreview, setIsPreview] = useState<boolean>(false);
	const getCurrentQuiz = useCurrentQuiz((state) => state.getCurrentQuiz);
	const resetQuizResult = useCurrentQuiz((state) => state.resetQuizResult);
	const quiz = useCurrentQuiz((state) => state.quiz);
	const correctAnswers = useCurrentQuiz((state) => state.correctAnswers);
	const withTimer = useCurrentQuiz((state) => state.quiz?.withTimer) || false;
	const timerProps = getMatchedTimerProps(quiz?.timerLimit);
	const { minutes, seconds, start, pause } = useTimer(timerProps);
	const { toPDF, targetRef } = usePDF({
		filename: 'quiz.pdf',
		page: {
			margin: Margin.SMALL,
		},
	});

	const {
		havePermission,
		correctPassword,
		isOpenPasswordDialog,
		closePasswordDialog,
	} = useQuizAccess({ quiz, userId: user?._id });

	const initQuiz = async (id: string) => {
		const quiz = await getCurrentQuiz(id);
		if (!quiz?.withTimer) {
			setIsStarted(true);
		}
	};

	useEffect(() => {
		const { hash } = location;

		if (hash === '#PREVIEW') {
			setIsPreview(true);
		}

		initQuiz(id!);

		return () => resetQuizResult();
	}, []);

	const handleStart = () => {
		setIsStarted(true);
		start();
	};

	const handleFinish = useCallback(() => {
		pause();
		onToggle();
	}, [pause, onToggle]);

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
		<Page>
			<Box
				w='75%'
				m='20px 0'
				p='20px'
				bg='linear-gradient(#0E6FE4, #0447CC)'
				borderRadius='base'
				boxShadow='base'
				ref={targetRef}
			>
				{quiz?.privacy?.type === 'publicProtected' && (
					<PasswordRequireDialog
						correctPassword={correctPassword}
						isOpen={isOpenPasswordDialog}
						onClose={closePasswordDialog}
					/>
				)}
				{quiz?.privacy.type === 'restrictedUsers' && (
					<RestrictedAccessDialog havePermission={havePermission} />
				)}
				{quiz?.privacy.type === 'privateLink' && (
					<PrivateLinkDialog isOpen={!havePermission} />
				)}
				{quiz?.privacy.type === 'linkProtected' && (
					<>
						<PrivateLinkDialog isOpen={!havePermission} />
						<PasswordRequireDialog
							correctPassword={correctPassword}
							isOpen={isOpenPasswordDialog}
							onClose={closePasswordDialog}
						/>
					</>
				)}

				<NoPrint>
					<Flex>
						<Flex justifyContent='space-between' alignItems='center' w='100%'>
							<Heading size='lg' fontWeight='medium' color='white'>
								{quiz?.title}
							</Heading>
							<Flex gap='8px' alignItems='center5' id='hide-in-pdf'>
								{quiz && quiz?.authorId === user?._id && (
									<PrivacyDrawer quiz={quiz} />
								)}
								<ShareButton link={window.location.href} />
								<Button
									onClick={onDownloadPDF}
									size='xs'
									alignItems='center'
									variant='unstyled'
									bgColor='#e6007e'
									bgImage='linear-gradient(to right, #ff512f 0%, #dd2476 51%, #ff512f 100%)'
									color='#ffff'
									_hover={{ color: '#dcd9d9' }}
									_active={{ color: 'none' }}
								>
									<DownloadIcon fontSize='15px' />
								</Button>
							</Flex>
						</Flex>
					</Flex>

					<QuizHeader
						isTimerStarted={isStarted}
						minutes={minutes}
						seconds={seconds}
					/>

					{withTimer && (
						<Button
							onClick={handleStart}
							borderRadius='md'
							size='sm'
							m='5px 0'
						>
							Start quiz
						</Button>
					)}

					<QuestionsList isBlured={isStarted} />
				</NoPrint>

				{!isPreview && !isOpen && (
					<Flex gap='16px' mb='16px' id='hide-in-pdf'>
						<FinishQuizButton
							minutes={minutes}
							seconds={seconds}
							onFinish={handleFinish}
						/>
						<Flex alignItems='center' gap='12px' color='white'>
							<Text>{correctAnswers}</Text>
							<StarIcon />
						</Flex>
					</Flex>
				)}
				{user && (
					<Collapse in={isOpen} animateOpacity>
						<QuizResult
							userId={user?._id}
							userEmail={user?.email}
							renderQuizRating={(params) => <QuizRating {...params} />}
						/>
					</Collapse>
				)}
			</Box>
		</Page>
	);
};

export default QuizPage;
