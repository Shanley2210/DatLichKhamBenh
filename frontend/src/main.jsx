import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

//StylesMain
import '@styles/main.scss';

//BootstrapJS
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

//i18n
import './i18n';

//Redux
import { Provider } from 'react-redux';
import { store } from '@/stores/index.jsx';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </StrictMode>
);
