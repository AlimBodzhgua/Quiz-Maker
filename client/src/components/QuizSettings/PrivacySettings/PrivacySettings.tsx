import { FC, memo, useEffect, useState } from 'react';
import { Flex, Heading, Radio, RadioGroup, Stack, Tooltip } from '@chakra-ui/react';
import { QuestionOutlineIcon } from '@chakra-ui/icons';
import { mapToPrivacyLabelText, mapToPrivacyText, PrivacyValues } from '@/constants/privacy';
import { QuizService } from '@/services/QuizService';
import { getQueryParam } from '@/utils/utils';
import { useCreateQuiz } from 'store/createQuiz';
import { QuizPrivacy } from 'types/types';


export const PrivacySettings: FC = memo(() => {
	const updateQuiz = useCreateQuiz((state) => state.updateQuiz);
	const [privacy, setPrivacy] = useState<QuizPrivacy>(PrivacyValues.private);
	
	const initQuizPrivacy = async (id: string) => {
		const quiz = await QuizService.getQuiz(id);
		setPrivacy(quiz.privacy);
	};

	useEffect(() => {
		const quizId = getQueryParam('id');
		initQuizPrivacy(quizId);
	}, []);

	const onChangeValue = async (value: QuizPrivacy) => {
		await updateQuiz({ privacy: value });
		setPrivacy(value);
	};

	return (
		<Flex>
			<Heading size='sm' fontWeight='medium' mr='15px'>
				Quiz Privacy
			</Heading>
				<RadioGroup
					colorScheme='blue'
					onChange={onChangeValue}
					value={privacy}
				>
					<Stack direction='column'>
						{Object.values(PrivacyValues).map((privacyValue) => (
							<Flex alignItems='center' key={privacyValue}>
								<Radio value={PrivacyValues[privacyValue]} mr='10px'>
									{mapToPrivacyText[privacyValue]}
								</Radio>
								<Tooltip
									label={mapToPrivacyLabelText[privacyValue]}
									placement='right'
									bgColor='blackAlpha.900'
									maxW='250px'
									hasArrow
								>
									<QuestionOutlineIcon
										color='#b1b1b1'
										fontWeight='bold'
										fontSize='14px'
										_hover={{ cursor: 'pointer' }}
									/>
								</Tooltip>
							</Flex>
						))}
					</Stack>
				</RadioGroup>
		</Flex>
	);
});