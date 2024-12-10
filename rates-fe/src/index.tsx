import { AuthProvider } from './context/AuthContext';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <AuthProvider>
    <App />
  </AuthProvider>,
);
