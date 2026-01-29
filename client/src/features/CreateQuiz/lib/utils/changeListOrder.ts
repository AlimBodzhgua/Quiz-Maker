import type { UniqueIdentifier } from '@dnd-kit/core/dist/types';
import type { AnswerForm, QuestionForm } from 'entities/Quiz';
import { arrayMove } from '@dnd-kit/sortable';

export const changeListOrder = <T extends AnswerForm | QuestionForm>(
	list: T[],
	activeId: UniqueIdentifier,
	overId: UniqueIdentifier,
): T[] => {
	const newIndex = list.findIndex((listItem) => listItem._id === activeId);
	const oldIndex = list.findIndex((listItem) => listItem._id === overId);

	const updatedArray = arrayMove(list, oldIndex, newIndex).map((listItem, index) => {
		return { ...listItem, order: index + 1 };
	});

	return updatedArray;
};
