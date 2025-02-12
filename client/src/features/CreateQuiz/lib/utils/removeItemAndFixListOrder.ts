import type { AnswerForm, QuestionForm } from 'entities/Quiz';

export const removeItemAndFixListOrder = <T extends AnswerForm | QuestionForm>(
	list: T[],
	removeId: string,
): T[] => {
	const removedItem = list.find((listItem) => listItem._id === removeId);
	const filteredList = list.filter((listItem) => listItem._id !== removeId); 
	const updatedList = filteredList.map((listItem) => {
		if (listItem.order > removedItem!.order) {
			return { ...listItem, order: listItem.order - 1 }; 
		}
		return listItem;
	});
	return updatedList;
};