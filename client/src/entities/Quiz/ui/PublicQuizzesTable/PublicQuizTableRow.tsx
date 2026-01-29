import type { FC } from 'react';
import type { Quiz } from '../../model/types';
import { Flex, Skeleton, Td, Tr } from '@chakra-ui/react';
import { memo, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getQuizPage } from 'shared/utils';
import { QuestionService } from '../../api/QuestionService';
import { QuizService } from '../../api/QuizService';
import { UserService } from '../../api/UserService';
import { formatterOptions } from '../../lib/options';
import { PrivacyIcons } from '../QuizTable/PrivacyIcons';

interface PublicQuizTableRowProps {
	quiz: Quiz;
}

export const PublicQuizTableRow: FC<PublicQuizTableRowProps> = memo((props) => {
	const { quiz } = props;
	const [authorEmail, setAuthorEmail] = useState<string>('');
	const [participiantsAmount, setParticipiantsAmount] = useState<number>(0);
	const [questionsAmount, setQuestionsAmount] = useState<number>(0);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const formatter = new Intl.DateTimeFormat('en-US', formatterOptions);

	const initQuizExtraData = async () => {
		setIsLoading(true);

		const [participantsAmount, questionsAmount, user] = await Promise.all([
			QuizService.countParticipiants(quiz._id),
			QuestionService.countQuizQuestions(quiz._id),
			UserService.getUserData(quiz.authorId),
		]);

		setParticipiantsAmount(participantsAmount);
		setQuestionsAmount(questionsAmount);
		setAuthorEmail(user.email);

		setIsLoading(false);
	};

	useEffect(() => {
		initQuizExtraData();
	}, []);

	return (
		<Tr>
			<Td>
				<Flex alignItems='center' gap='10px'>
					<Link
						to={getQuizPage(quiz._id)}
						style={{
							maxWidth: '200px',
							textOverflow: 'ellipsis',
							overflow: 'hidden',
						}}
					>
{quiz.title}
     </Link>
					<PrivacyIcons privacy={quiz.privacy} />
				</Flex>
			</Td>
			<Td>{formatter.format(new Date(quiz.createdAt)).split('/').join('.')}</Td>
			<Td isNumeric>
				{isLoading ? <Skeleton height='15px' width='30px' margin='0 0 0 auto' /> : questionsAmount}
			</Td>
			<Td isNumeric>
				{isLoading ? <Skeleton height='15px' width='30px' margin='0 0 0 auto' /> : participiantsAmount}
			</Td>
			<Td>{isLoading ? <Skeleton height='15px' width='120px' /> : authorEmail}</Td>
		</Tr>
	);
});
