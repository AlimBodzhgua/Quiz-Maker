import type { DragEndEvent } from '@dnd-kit/core';
import type { FC } from 'react';
import { memo, useCallback } from 'react';
import { SortableList } from 'shared/lib/components/SortableList';
import { useCreateQuiz } from '../../../model/store';
import { AddQuestionForm } from '../AddQuestionForm/AddQuestionForm';

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
	);
});
