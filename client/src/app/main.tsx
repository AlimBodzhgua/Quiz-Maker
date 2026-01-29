import { ChakraProvider } from '@chakra-ui/react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { ErrorBoundary } from './providers/ErrorBoundary/ErrorBoundary';
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
