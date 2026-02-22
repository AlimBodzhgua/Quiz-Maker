import { Button, Flex } from '@chakra-ui/react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import GlobeIcon from './language.svg';

const LanguageValues = {
	ENG: 'en',
	RUS: 'ru',
} as const;

type LanguageType = (typeof LanguageValues)[keyof typeof LanguageValues];

export const LangSwitcher = () => {
	const { i18n } = useTranslation();
	const [language, setLanguage] = useState<LanguageType>(i18n.language as LanguageType);

	const onToggleLanguage = () => {
		const language = i18n.language === 'en' ? 'ru' : 'en';

		i18n.changeLanguage(language);
		setLanguage(language);
	};

	return (
		<Flex
			display='flex'
			justifyContent='center'
			alignItems='center'
			gap='6px'
			bg='#f6f6f6'
			p='3px 10px'
			rounded='md'
		>
			<GlobeIcon />
			<Flex gap='8px' justifyItems='center' alignItems='center'>
				<Button
					type='reset'
					bg={language === LanguageValues.ENG ? 'whiteAlpha.900' : 'inherit'}
					boxShadow={language === LanguageValues.ENG ? 'base' : 'none'}
					color={language === LanguageValues.ENG ? 'blackAlpha.900' : '#616161'}
					fontWeight='medium'
					height='fit-content'
					p='4px'
					rounded='md'
					transition='.2s ease all'
					value='en'
					onClick={onToggleLanguage}
					_hover={{ transform: 'scale(1.1)' }}
				>
					ENG
				</Button>
				<Button
					type='reset'
					bg={language === LanguageValues.RUS ? 'whiteAlpha.900' : 'inherit'}
					boxShadow={language === LanguageValues.RUS ? 'base' : 'none'}
					color={language === LanguageValues.RUS ? 'blackAlpha.900' : '#616161'}
					fontWeight='medium'
					height='max-content'
					p='4px'
					rounded='md'
					transition='.2s ease all'
					onClick={onToggleLanguage}
					_hover={{ transform: 'scale(1.1)' }}
				>
					RUS
				</Button>
			</Flex>
		</Flex>
	);
};
