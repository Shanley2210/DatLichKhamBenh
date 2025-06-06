import { Suspense, useEffect, useRef } from 'react';
import ScrollToTop from '@contexts/ScrollToTop';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import routers from '@/router/router';
import { ToastProvider } from '@contexts/ToastProvider';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Scrollbars from 'react-custom-scrollbars-2';
import LanguageProvider from '@contexts/LanguageProvider';
import LoadingPage from '@containers/LoadingPage/LoadingPage';

function App() {
    const selectedLanguage = useSelector(
        (state) => state.language.selectedLanguage
    );
    const { i18n } = useTranslation();
    const scrollRef = useRef();

    useEffect(() => {
        i18n.changeLanguage(selectedLanguage);
    }, [selectedLanguage]);

    return (
        <>
            <ToastProvider>
                <BrowserRouter>
                    <Scrollbars
                        ref={scrollRef}
                        style={{ width: '100vw', height: '100vh' }}
                    >
                        <Suspense fallback={<LoadingPage />}>
                            <ScrollToTop scrollRef={scrollRef} />
                            <LanguageProvider />
                            <Routes>
                                {routers.map((item, index) => (
                                    <Route
                                        path={item.path}
                                        element={<item.component />}
                                        key={index}
                                    />
                                ))}
                            </Routes>
                        </Suspense>
                    </Scrollbars>
                </BrowserRouter>
            </ToastProvider>
        </>
    );
}

export default App;
