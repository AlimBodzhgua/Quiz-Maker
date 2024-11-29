import { FC, memo, useCallback, useEffect, useState } from 'react';
import { Button, Flex, Td, Tr, useDisclosure } from '@chakra-ui/react';
import { DeleteIcon, InfoOutlineIcon } from '@chakra-ui/icons';
import { getQuizPage } from '@/router/router';
import { QuizService } from '@/services/QuizService';
import { useQuizzesStore } from 'store/quizzes';
import { IQuiz } from 'types/types';
import { Link } from 'react-router-dom';
import { AppDialog } from '../UI/AppDialog/AppDialog';

interface QuizItemProps {
	quizItem: IQuiz;
}

export const QuizItem: FC<QuizItemProps> = memo(({ quizItem }) => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const removeQuiz = useQuizzesStore((state) => state.removeQuiz);
	const [participiants, setParticipiants] = useState<number>(0);
	const formatter = new Intl.DateTimeFormat('en-US', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
	});

	useEffect(() => {
		QuizService.countParticipiants(quizItem._id).then(setParticipiants);
	}, []);

	const handleRemove = useCallback(async () => {
		setIsLoading(true);
		await removeQuiz(quizItem._id);
		onClose();
		setIsLoading(false);
	}, [removeQuiz, onClose]);

	return (
		<Tr opacity={isLoading ? 0.2 : 1} transition={'opacity .4s linear'}>
			<Td>
				<Link to={getQuizPage(quizItem._id)}>{quizItem.title}</Link>
			</Td>
			<Td>{formatter.format(new Date(quizItem.createdAt)).split('/').join('.')}</Td>
			<Td isNumeric>{participiants}</Td>
			<Td>
				<Flex align='center' gap='10px'>
					<Button
						as={Link}
						to={getQuizPage(quizItem._id)}
						variant='unstyled'
						alignContent='center'
						_hover={{ color: 'blue.300' }}
					>
						<InfoOutlineIcon />
					</Button>

					<AppDialog
						isOpen={isOpen}
						headerText={`Delete Quiz: ${quizItem.title}`}
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
