import { useState } from 'react';

type HoverProps = {
	onMouseEnter: () => void;
	onMouseLeave: () => void;
};

type HoverReturn = {
	isHover: boolean;
	hoverProps: HoverProps;
};

export const useHover = (): HoverReturn => {
	const [isHover, setIsHover] = useState<boolean>(false);

	const hoverProps: HoverProps = {
		onMouseEnter: () => setIsHover(true),
		onMouseLeave: () => setIsHover(false),
	};

	return { isHover, hoverProps };
};
