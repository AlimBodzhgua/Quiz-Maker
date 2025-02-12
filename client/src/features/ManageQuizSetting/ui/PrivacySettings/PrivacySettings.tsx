import { FC, memo, useEffect, useState } from 'react';
import { Flex, Heading, Radio, RadioGroup, Stack, Tooltip } from '@chakra-ui/react';
import { QuestionOutlineIcon } from '@chakra-ui/icons';
import { mapToPrivacyLabelText, mapToPrivacyText, PrivacyValues } from 'shared/constants/privacy';
import { getQueryParam } from 'shared/utils/utils';
import type { Quiz, QuizPrivacy } from 'entities/Quiz';
import { QuizService } from '../../api/QuizService';

interface PrivacySettingProps {
	onUpdate: (quiz: Partial<Quiz>) => Promise<Quiz>;
}

export const PrivacySettings: FC<PrivacySettingProps> = memo(({ onUpdate }) => {
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
		await onUpdate({ privacy: value });
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