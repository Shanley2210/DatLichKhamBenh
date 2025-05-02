import { Suspense } from 'react';
import ScrollToTop from '@contexts/ScrollToTop';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import routers from '@/router/router';
import { ToastProvider } from '@contexts/ToastProvider';
import { LanguageProvider } from '@contexts/LanguageProvider';

function App() {
    return (
        <>
            <LanguageProvider>
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
            </LanguageProvider>
        </>
    );
}

export default App;
