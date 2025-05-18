import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { StrictMode } from 'react';

//StylesMain
import '@styles/main.scss';

//BootstrapJS
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

//i18n
import './i18n';

//Redux
import { Provider } from 'react-redux';
import { store, persistor } from '@/stores/index.jsx';
import { PersistGate } from 'redux-persist/integration/react';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <App />
            </PersistGate>
        </Provider>
    </StrictMode>
);
