import { StarIcon } from '@chakra-ui/icons';
import { FC, memo } from 'react';

interface RatingStarProps {
	starNumber: number;
	selectedStar: number;
	hoveredStar: number;
	isHover: boolean;
	isRated: boolean;

	onToggleHover: () => void;
	setHoveredStar: (starNumber: number) => void; 
	onStarClick: (starNumber: number) => void;
}

export const RatingStar: FC<RatingStarProps> = memo((props) => {
	const {
		starNumber,
		selectedStar,
		hoveredStar,
		isRated,
		isHover,
		setHoveredStar,
		onToggleHover,
		onStarClick,
	} = props;
	
	const isStarLessThenSelectedOrHavered = starNumber <= hoveredStar || starNumber <= selectedStar;
	const isRatingHoveredOrRated = isHover || isRated;

	const onMouseEnter = () => {
		onToggleHover();
		setHoveredStar(starNumber);
	};

	const onMouseLeave = () => {
		onToggleHover();
		setHoveredStar(0);
	};

	const handleClick = () => {
		onStarClick(starNumber);
	};

	return (
		<StarIcon
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
			onClick={handleClick}
			_hover={{ cursor: 'pointer' }}
			color={(isStarLessThenSelectedOrHavered) && (isRatingHoveredOrRated) ? 'orange' : 'black'}
		/>
	)
})
