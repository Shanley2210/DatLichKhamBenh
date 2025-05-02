import { Suspense, useEffect } from 'react';
import ScrollToTop from '@contexts/ScrollToTop';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import routers from '@/router/router';
import { ToastProvider } from '@contexts/ToastProvider';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

function App() {
    const selectedLanguage = useSelector(
        (state) => state.language.selectedLanguage
    );
    const { i18n } = useTranslation();

    useEffect(() => {
        i18n.changeLanguage(selectedLanguage);
    }, [selectedLanguage]);

    return (
        <>
            <ToastProvider>
                <BrowserRouter>
                    <Suspense fallback={<div>Loading...</div>}>
                        <ScrollToTop />
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
                </BrowserRouter>
            </ToastProvider>
        </>
    );
}

export default App;
