import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { theme } from 'shared/config/theme';
import { App } from './App';
import './styles/index.css';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<ChakraProvider theme={theme}>
			<ColorModeScript initialColorMode={theme.config.initialColorMode} />
			<App />
		</ChakraProvider>
	</StrictMode>,
);
