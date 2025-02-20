import { FC, memo } from 'react';
import { SortableList } from 'shared/lib/components/SortableList';
import { AddAnswerForm } from '../../AddAnswerForm/AddAnswerForm';
import { AnswerForm } from 'entities/Quiz';
import { DragEndEvent } from '@dnd-kit/core';

interface AnswersListProps {
	answers: AnswerForm[];
    onDragEnd: (e: DragEndEvent) => void;
    onChangeValue: (answerId: string, value: string) => void;
    onChangeIsCorrect: (answerId: string) => void;
    onDeleteAnswer: (answerId: string) => void;
    isSaved: boolean;
}

export const AnswersList: FC<AnswersListProps> = memo((props) => {
	const {
		answers,
		onDragEnd,
		onChangeValue,
		onChangeIsCorrect,
		onDeleteAnswer,
		isSaved,
	} = props;

	return (
		<SortableList
			items={answers.map((answer) => answer._id)}
			onDragEnd={onDragEnd}
		>
			{answers.map((answer) => (
				<AddAnswerForm
					key={answer._id}
					answer={answer}
					onChangeValue={onChangeValue}
					onChangeIsCorrect={onChangeIsCorrect}
					onDeleteAnswer={onDeleteAnswer}
					isSaved={isSaved}
				/>
			))}
		</SortableList>
	);
});