import type { FC } from 'react';

import { Flex } from '@chakra-ui/icons';
import { RatingStar } from 'entities/Rating';
import { memo, useCallback, useState } from 'react';

import { QuizRatingService } from '../api/QuizRatingService';
import { RATING_STARS } from '../model/constants';

interface QuizRatingProps {
	quizId: string;
};

export const QuizRating: FC<QuizRatingProps> = memo(({ quizId }) => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isHover, setIsHover] = useState<boolean>(false);
	const [hoveredStar, setHoveredStar] = useState<number>(0);

	const [selectedStar, setSelectedStar] = useState<number>(0);
	const [isRated, setIsRated] = useState<boolean>(false);

	const onRate = async (starNumber: number) => {
		setIsLoading(true);

		if (selectedStar === starNumber) {
			await QuizRatingService.removeRating(quizId);
			setIsRated(false);
			setSelectedStar(0);
			setHoveredStar(0);
		} else {
			await QuizRatingService.rate(quizId, starNumber);
			setIsRated(true);
			setSelectedStar(starNumber);
		}

		setIsLoading(false);
	};

	const onToggleHover = useCallback(() => {
		setIsHover((prev) => !prev);
	}, []);

	return (
		<Flex
			gap='5px'
			pointerEvents={isLoading ? 'none' : 'all'}
			opacity={isLoading ? '.4' : '1'}
			transition='opacity .2s linear'
		>
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
