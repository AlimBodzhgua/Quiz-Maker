import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
	initialColorMode: 'light',
	useSystemColorMode: false,
};

export const theme = extendTheme({
	config,
	semanticTokens: {
		colors: {
			bg: {
				primary: { _light: '#ffffff', _dark: '#0e0e10' },
				secondary: { _light: '#f6f6f6', _dark: '#18181a' },
				blue: { _light: '#0E6FE4', _dark: '#0a55b1'},
				green: { _light: '#68AF15', _dark: '#2F855A' },
				red: { _light: '#D30000', _dark: '#9B2C2C'},
				white: { _light: '#f9f9f9', _dark: '#1a202c' },
			},
			border: {
				white: { _light: '#e8e8e8', _dark: '#383838' }, 
			},
			overlay: {
				primary: { _light: '#0000007a', _dark: 'rgba(0, 0, 0, 0.5)' },
			},
			text: {
				primary: { _light: '#000000', _dark: '#0f0f0f' },
				secondary: { _light: '#000000', _dark: '#f9f9f9' },
			},
			blue: {
				200: { default: '#90cdf4', _dark: '#3b82f6'},
				400: { default: '#4299e1', _dark: '#1a202c' },
				500: { default: '#3b82f6', _dark: '#1a202c' },
			},
			cyan: {
				200: { default: '#9DECF9', _dark: '#00A3C4'}
			},
			red: {
				200: { default: '#FEB2B2', _dark: '#d41a1a' },
			},
			blackAlpha: {
				600: { default: '#0000007a', _dark: '#ffffff7a' },
				700: { default: '#000000a3', _dark: '#ffffffa3' },
				800: { default: '#000000cc', _dark: '#ffffffa3'}
			},
			gray: {
				100: { default: '#EDF2F7', _dark: '#616161'},
			}
		},
	},
});
