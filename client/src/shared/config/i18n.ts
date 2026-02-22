import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import en from '../../../public/locales/en/translation.json';
import ru from '../../../public/locales/ru/translation.json';

i18next
	.use(initReactI18next)
	.use(LanguageDetector)
	.init({
		fallbackLng: 'en',

		debug: false,
		interpolation: { escapeValue: false },

		resources: {
			en: { translation: en },
			ru: { translation: ru },
		},
	});
