import { FC, useEffect, useState, memo } from 'react';
import { Link } from 'react-router-dom';
import { Td, Tr } from '@chakra-ui/react';
import { formatterOptions } from '@/constants/options';
import { getQuizPage } from '@/router/router';
import { QuestionService } from '@/services/QuestionService';
import { QuizService } from '@/services/QuizService';
import { UserService } from '@/services/UserService';
import { IQuiz } from 'types/types';

interface QuizItemProps {
	quiz: IQuiz;
}

export const QuizItem: FC<QuizItemProps> = memo((props) => {
	const { quiz } = props;
	const [authorEmail, setAuthorEmail] = useState<string>('');
	const [participiantsAmount, setParticipiantsAmount] = useState<number>(0);
	const [questionsAmount, setQuestionsAmount] = useState<number>(0);
	const formatter = new Intl.DateTimeFormat('en-US', formatterOptions);

	useEffect(() => {
		UserService.getUserData(quiz.authorId).then((data) => setAuthorEmail(data.email));
		QuizService.countParticipiants(quiz._id).then(setParticipiantsAmount);
		QuestionService.countQuizQuestions(quiz._id).then(setQuestionsAmount);
	}, []);

	return (
		<Tr>
			<Td>
				<Link to={getQuizPage(quiz._id)}>{quiz.title}</Link>
			</Td>
			<Td>{formatter.format(new Date(quiz.createdAt)).split('/').join('.')}</Td>
			<Td isNumeric>{questionsAmount}</Td>
			<Td isNumeric>{participiantsAmount}</Td>
			<Td>{authorEmail}</Td>
		</Tr>
	);
});
