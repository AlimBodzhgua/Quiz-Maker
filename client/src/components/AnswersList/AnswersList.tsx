import { IAnswer } from 'types/types';
import { List } from '@chakra-ui/react';
import { FC, memo } from 'react';
import { AnswersItem } from './AnswersItem';

interface AnswerListProps {
	answers: IAnswer[];
}

export const AnswersList: FC<AnswerListProps> = memo(({ answers }) => {

	return (
		<List>
			{answers.length && answers.map((answer) => (
				<AnswersItem answer={answer} key={answer._id}/>
			))}
		</List>
	)
});
