import { FC, memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Checkbox, Flex, ScaleFade, Td, Tr, useDisclosure } from '@chakra-ui/react';
import { DeleteIcon, InfoOutlineIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import { getQuizPage } from 'shared/utils/utils';
import { AppDialog } from 'shared/UI';
import { QuestionService } from '../../api/QuestionService';
import { QuizService } from '../../api/QuizService';
import { useQuizzesStore } from '../../model/store/quizzes';
import { Quiz } from '../../model/types';
import { formatterOptions } from '../../lib/options';

interface MyQuizTableRowProps {
	quiz: Quiz;
}

export const MyQuizTableRow: FC<MyQuizTableRowProps> = memo(({ quiz }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [participiantsAmount, setParticipiantsAmount] = useState<number>(0);
	const [questionsAmount, setQuestionsAmount] = useState<number>(0);
	
	const isSelecting = useQuizzesStore((state) => state.isSelecting);
	const selectQuiz = useQuizzesStore((state) => state.selectQuiz);
	const deselectQuiz = useQuizzesStore((state) => state.deselectQuiz);
	const removeQuiz = useQuizzesStore((state) => state.removeQuiz);
	const selectedQuizzes = useQuizzesStore(state => state.selectedQuizzes);
	const isQuizSelected = useMemo(() => selectedQuizzes.includes(quiz._id), [selectedQuizzes, quiz._id]);

	const formatter = new Intl.DateTimeFormat('en-US', formatterOptions);

	const initQuizExtraData = async () => {
		const [participantsAmount, questionsAmount] = await Promise.all([
			QuizService.countParticipiants(quiz._id),
			QuestionService.countQuizQuestions(quiz._id),
		]);

		setParticipiantsAmount(participantsAmount);
		setQuestionsAmount(questionsAmount);
	};

	useEffect(() => {
		initQuizExtraData();
	}, []);

	const toggleSelect = () => {
		if (isQuizSelected) {
			deselectQuiz(quiz._id);
		} else {
			selectQuiz(quiz._id);
		}
	};

	const handleRemove = useCallback(async () => {
		setIsLoading(true);
		await removeQuiz(quiz._id);
		onClose();
		setIsLoading(false);
	}, [removeQuiz, onClose]);

	return (
		<Tr opacity={isLoading ? 0.2 : 1} transition={'opacity .4s linear'}>
			<Td pr='0px' pl='-1px' w='20px'>
				<ScaleFade in={isSelecting}>
					<Checkbox
						pointerEvents={isSelecting ? 'all' : 'none'}
						onChange={toggleSelect}
						isChecked={isQuizSelected}
						borderRadius='base'
						size='lg'
					/>
				</ScaleFade>
			</Td>
			<Td>
				<Link to={getQuizPage(quiz._id)}>{quiz.title}</Link>
			</Td>
			<Td>{formatter.format(new Date(quiz.createdAt)).split('/').join('.')}</Td>
			<Td isNumeric>{questionsAmount}</Td>
			<Td isNumeric>{participiantsAmount}</Td>
			<Td>
				<Flex align='center' gap='10px' justifyContent='center'>
					<Button
						as={Link}
						to={getQuizPage(quiz._id)}
						variant='unstyled'
						alignContent='center'
						_hover={{ color: 'blue.300' }}
					>
						<InfoOutlineIcon />
					</Button>

					<AppDialog
						isOpen={isOpen}
						headerText={`Delete Quiz: ${quiz.title}`}
						bodyText={'Are you sure? You can\'t undo this action afterwards.'}
						actionText={'Delete'}
						actionHandler={handleRemove}
						onClose={onClose}
					>
						<Button
							variant='unstyled'
							_hover={{ color: 'red.300' }}
							onClick={onOpen}
						>
							<DeleteIcon />
						</Button>
					</AppDialog>
				</Flex>
			</Td>
		</Tr>
	);
});
