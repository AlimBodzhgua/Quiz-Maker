import type { FC } from 'react';

import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Button, Flex } from '@chakra-ui/react';
import { memo } from 'react';
import { addQueryParam } from 'shared/utils';

interface PaginationProps {
	activePage: number;
	pagesAmount: number;
	onPageChange: (pageNumber: number) => void;
}

export const Pagination: FC<PaginationProps> = memo((props) => {
	const {
		activePage,
		pagesAmount,
		onPageChange,
	} = props;

	const handlePrevClick = () => {
		addQueryParam('page', String(activePage - 1));
		onPageChange(activePage - 1);
	};

	const handlePageClick = (pageNumber: number) => {
		addQueryParam('page', String(pageNumber));
		onPageChange(pageNumber);
	};

	const handleNextClick = () => {
		addQueryParam('page', String(activePage + 1));
		onPageChange(activePage + 1);
	};

	if (pagesAmount <= 1) {
		return null;
	}

	return (
		<Flex
			justifyContent='center'
			alignItems='center'
			p='10px 0'
			gap='8px'
		>
			<Button
				onClick={handlePrevClick}
				disabled={activePage === 1}
				size='sm'
			>
				<ChevronLeftIcon fontSize='18px' />
			</Button>
			<Flex gap='6px'>
				{Array.from({ length: pagesAmount}).fill(0).map((_, index) => (
					<Button
						key={index}
						size='sm'
						colorScheme={activePage === index + 1 ? 'cyan' : 'gray'}
						color={activePage === index + 1 ? '#ffff' : 'gray.500'}
						onClick={() => handlePageClick(index + 1)}
					>
						{index + 1}
					</Button>
				))}
			</Flex>
			<Button
				onClick={handleNextClick}
				disabled={activePage === pagesAmount}
				size='sm'
			>
				<ChevronRightIcon fontSize='18px' />
			</Button>
		</Flex>
	);
});
