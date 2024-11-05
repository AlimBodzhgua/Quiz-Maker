import { FC, memo, ReactNode } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface SortableItemProps {
	id: number | string;
	children: ReactNode;
}

export const SortableItem: FC<SortableItemProps> = memo((props) => {
	const { children, id } = props;
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
	} = useSortable({ id: id });

	const style = {
		transform: CSS.Translate.toString(transform),
		transition,
	};

	return (
		<div
			ref={setNodeRef}
			style={style}
			{...attributes}
			{...listeners}
		>
			{children}
		</div>
	);
})