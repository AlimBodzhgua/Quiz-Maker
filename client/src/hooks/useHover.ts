import { useState } from 'react';

interface HoverProps {
	onMouseEnter: () => void;
	onMouseLeave: () => void;
}

export const useHover = (): [boolean, HoverProps] => {
	const [isHover, setIsHover] = useState<boolean>(false);

	const hoverProps: HoverProps = {
		onMouseEnter: () => setIsHover(true),
		onMouseLeave: () => setIsHover(false),
	}

	return [isHover, hoverProps];
}