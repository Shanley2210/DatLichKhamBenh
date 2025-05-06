import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setLanguage } from '@/stores/languageSlice';

function LanguageProvider() {
    const dispatch = useDispatch();

    useEffect(() => {
        const handleStorageChange = (event) => {
            if (event.key === 'persist:root') {
                try {
                    const persisted = JSON.parse(event.newValue);
                    const languageState = JSON.parse(persisted.language);
                    dispatch(setLanguage(languageState.selectedLanguage));
                } catch (error) {
                    console.error('Lỗi parsing storage:', error);
                }
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [dispatch]);

    return null;
}

export default LanguageProvider;
