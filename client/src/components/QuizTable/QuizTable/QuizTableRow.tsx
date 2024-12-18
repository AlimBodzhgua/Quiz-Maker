import { FC, memo, useCallback, useEffect, useState } from 'react';
import { Button, Checkbox, Flex, ScaleFade, Td, Tr, useDisclosure } from '@chakra-ui/react';
import { DeleteIcon, InfoOutlineIcon } from '@chakra-ui/icons';
import { getQuizPage } from '@/router/router';
import { QuizService } from '@/services/QuizService';
import { useQuizzesStore } from 'store/quizzes';
import { AppDialog } from 'components/UI/AppDialog/AppDialog';
import { IQuiz } from 'types/types';
import { Link } from 'react-router-dom';
import { formatterOptions } from '@/constants/options';
import { QuestionService } from '@/services/QuestionService';

interface QuizTableRowProps {
	quiz: IQuiz;
}

export const QuizTableRow: FC<QuizTableRowProps> = memo(({ quiz }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [participiantsAmount, setParticipiantsAmount] = useState<number>(0);
	const [questionsAmount, setQuestionsAmount] = useState<number>(0);
	const [isSelected, setIsSelected] = useState<boolean>(false);
	
	const isSelecting = useQuizzesStore((state) => state.isSelecting);
	const selectQuiz = useQuizzesStore((state) => state.selectQuiz);
	const deselectQuiz = useQuizzesStore((state) => state.deselectQuiz);
	const removeQuiz = useQuizzesStore((state) => state.removeQuiz);
	const selectedQuizzes = useQuizzesStore((state) => state.selectedQuizzes);
	const isSelectedQuiz = useQuizzesStore((state) => state.isSelected); 

	const formatter = new Intl.DateTimeFormat('en-US', formatterOptions);

	useEffect(() => {
		QuizService.countParticipiants(quiz._id).then(setParticipiantsAmount);
		QuestionService.countQuizQuestions(quiz._id).then(setQuestionsAmount);
	}, []);

	useEffect(() => {
		if (isSelectedQuiz(quiz._id)) {
			setIsSelected(true);
		} else setIsSelected(false);
	}, [selectedQuizzes]);

	const toggleSelect = () => {
		if (isSelected) {
			setIsSelected(false);
			deselectQuiz(quiz._id);
		} else {
			selectQuiz(quiz._id);
			setIsSelected(true);
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
						isChecked={isSelected}
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
