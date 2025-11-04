import { createRoot } from 'react-dom/client';

const rootElement = document.getElementById('root');
if (rootElement == null) {
	throw new Error('Root Element Not Found');
}

createRoot(rootElement).render(<div>hello world</div>);
