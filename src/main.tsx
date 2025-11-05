import { createRoot } from 'react-dom/client';
import { App } from './App';
import { QueryClientProvider } from './providers/QueryClientProvider';

const rootElement = document.getElementById('root');
if (rootElement == null) {
	throw new Error('Root Element Not Found');
}

createRoot(rootElement).render(
	<QueryClientProvider>
		<App />
	</QueryClientProvider>
);
