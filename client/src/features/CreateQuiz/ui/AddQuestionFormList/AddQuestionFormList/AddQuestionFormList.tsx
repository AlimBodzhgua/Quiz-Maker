import { FC, memo, useCallback } from 'react';
import { SortableList } from 'shared/lib/components/SortableList';
import { DragEndEvent } from '@dnd-kit/core';
import { AddQuestionForm } from '../AddQuestionForm/AddQuestionForm';
import { useCreateQuiz } from '../../../model/store';

export const AddQuestionFormList: FC = memo(() => {
	const questions = useCreateQuiz((state) => state.questions);
	const questionsDragEnd = useCreateQuiz((state) => state.questionsDragEnd);

	const onQuestionDragEnd = useCallback((e: DragEndEvent) => {
		const { active, over } = e;
		if (active.id !== over!.id) {
			questionsDragEnd(over!.id, active.id);
		}
	}, [questions]);

	return (
		<SortableList
			items={questions.map((question) => question._id)}
			onDragEnd={onQuestionDragEnd}
		>
			{questions.map((question) => (
				<AddQuestionForm
					question={question}
					key={question._id}
				/>
			))}
		</SortableList>
	)
});