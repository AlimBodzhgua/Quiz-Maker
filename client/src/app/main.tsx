import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import { ErrorBoundary } from './providers/ErrorBoundary/ErrorBoundary';
import { App } from './App';
import './styles/index.css';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<ChakraProvider>
			<ErrorBoundary>
				<App />
			</ErrorBoundary>
		</ChakraProvider>
	</StrictMode>,
);
