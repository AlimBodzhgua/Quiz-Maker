import type {
	DragCancelEvent,
	DragEndEvent,
	DragMoveEvent,
	DragOverEvent,
	DragStartEvent,
	UniqueIdentifier,
} from '@dnd-kit/core';
import type { FC, ReactNode } from 'react';
import {
	DndContext,
	PointerSensor,
	useSensor,
	useSensors,
} from '@dnd-kit/core';
import { restrictToParentElement } from '@dnd-kit/modifiers';
import { SortableContext } from '@dnd-kit/sortable';
import { memo } from 'react';

interface SortableListProps {
	children: ReactNode;
	items: (UniqueIdentifier | { id: UniqueIdentifier })[];
	onDragEnd?: (e: DragEndEvent) => void;
	onDragCancel?: (e: DragCancelEvent) => void;
	onDragStart?: (e: DragStartEvent) => void;
	onDragOver?: (e: DragOverEvent) => void;
	onDragMove?: (e: DragMoveEvent) => void;
}

export const SortableList: FC<SortableListProps> = memo((props) => {
	const {
		children,
		items,
		onDragEnd,
		onDragCancel,
		onDragStart,
		onDragOver,
		onDragMove,
	} = props;

	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: 8,
			},
		}),
	);

	return (
		<DndContext
			onDragEnd={onDragEnd}
			onDragCancel={onDragCancel}
			onDragStart={onDragStart}
			onDragOver={onDragOver}
			onDragMove={onDragMove}
			sensors={sensors}
			modifiers={[restrictToParentElement]}
		>
			<SortableContext items={items}>
				{children}
			</SortableContext>
		</DndContext>
	);
});
