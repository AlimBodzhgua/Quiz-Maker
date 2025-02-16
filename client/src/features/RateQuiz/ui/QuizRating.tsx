import { Flex } from '@chakra-ui/icons';
import { RatingStar } from 'entities/Rating';
import { FC, memo, useCallback, useState } from 'react';
import { RATING_STARS } from '../model/constants';
import { QuizRatingService } from '../api/QuizRatingService';

interface QuizRatingProps {
	quizId: string;
};

export const QuizRating: FC<QuizRatingProps> = memo(({ quizId }) => {
	const [isHover, setIsHover] = useState<boolean>(false)
	const [hoveredStar, setHoveredStar] = useState<number>(0);

	const [selectedStar, setSelectedStar] = useState<number>(0);
	const [isRated, setIsRated] = useState<boolean>(false);

	const onRate = (starNumber: number) => {
		if (selectedStar === starNumber) {
			setIsRated(false);
			setSelectedStar(0);
			setHoveredStar(0);
		} else {
			QuizRatingService.rate(quizId, starNumber);
			setIsRated(true);
			setSelectedStar(starNumber);
		}
	}

	const onToggleHover = useCallback(() => {
		setIsHover((prev) => !prev);
	}, []);

	return (
		<Flex gap='5px'>
			{RATING_STARS.map((starNumber) => (
				<RatingStar
					key={starNumber}
					starNumber={starNumber}
					onStarClick={onRate}
					setHoveredStar={setHoveredStar}
					onToggleHover={onToggleHover}
					isHover={isHover}
					hoveredStar={hoveredStar}
					isRated={isRated}
					selectedStar={selectedStar}
				/>
			))}
		</Flex>
	);
});