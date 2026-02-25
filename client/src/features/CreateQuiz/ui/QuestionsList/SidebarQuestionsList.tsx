import type { QuestionForm } from 'entities/Quiz'
import type { FC } from 'react';

import { Box, Flex, Heading, List } from '@chakra-ui/react';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { QuestionsItem } from './QuestionsItem';

interface SidebarQuestionsListProps {
	questions: QuestionForm[];
}

export const SidebarQuestionsList: FC<SidebarQuestionsListProps> = (props) => {
	const { questions } = props;
	const { t } = useTranslation();
	const placeholderRef = useRef<HTMLDivElement | null>(null);
	const listRef = useRef<HTMLUListElement | null>(null);

	useEffect(() => {
		const observer = new ResizeObserver(() => {
			if (listRef.current){
				listRef.current.style.width = placeholderRef.current?.offsetWidth + 'px';
			}
		});

		if (placeholderRef.current) {
			observer.observe(placeholderRef.current);
		}

		return () => {
			if (placeholderRef.current) {
				observer.unobserve(placeholderRef.current);
			}
		};
	}, []);
	
	return (
		<>
			<Box
				ref={placeholderRef}
				h='0'
				w='100%'
				maxW='240px'
				minW='115px'
				p='10px'
				ml='12px'
				transition='width .2s'
			/>
			<List
				ref={listRef}
				transform={questions.length ? 'translateX(0)' : 'translateX(-100%)'}
				transition='transform .2s'
				display='flex'
				flexDirection='column'
				gap='8px'
				position='fixed'
				left='12px'
				top='97px'
				zIndex='1000'
				height='fit-content'
				p='15px 8px'
				w='100%'
				minW='115px'
				maxW='240px'
				bgColor='#f6f6f6'
				borderRadius='2xl'
			>
				<Flex justifyContent='space-between' alignItems='center' px='5px' mb='3'>
					<Heading size='sm' color='blackAlpha.600'>
						{t('Questions')}
					</Heading>
					<Box fontWeight='bold' color='blackAlpha.600'>
						{questions.length}
					</Box>
				</Flex>
				{questions.map((question) => (
					<QuestionsItem
						key={question._id}
						question={question}
					/>
				))}
			</List>
		</>
	);
}