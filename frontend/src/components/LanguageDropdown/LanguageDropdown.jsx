import { useState } from 'react';
import styles from './LanguageDropdown.module.scss';
import { IoMdArrowDropdown } from 'react-icons/io';
import VietNamese from '@icons/Vietnamese.svg';
import English from '@icons/English.svg';

import { useDispatch, useSelector } from 'react-redux';
import { setLanguage } from '@/stores/languageSlice';

function LanguageDropdown() {
    const dispatch = useDispatch();
    const selectedLanguage = useSelector(
        (state) => state.language.selectedLanguage
    );

    const [open, setOpen] = useState(false);

    const toggleDropdown = () => setOpen(!open);

    const handleSelect = (lang) => {
        dispatch(setLanguage(lang));
        setOpen(false);
    };

    return (
        <div className={styles.dropdownContainer}>
            <div className={styles.dropdownToggle} onClick={toggleDropdown}>
                {selectedLanguage === 'vi' ? 'Tiếng Việt' : 'English'}{' '}
                <IoMdArrowDropdown />
            </div>
            {open && (
                <div className={styles.dropdownMenu}>
                    <div
                        className={styles.dropdownItem}
                        onClick={() => handleSelect('vi')}
                    >
                        <img
                            src={VietNamese}
                            style={{ width: '22px' }}
                            className={styles.iconFlag}
                        />
                        Tiếng Việt
                    </div>
                    <div
                        className={styles.dropdownItem}
                        onClick={() => handleSelect('en')}
                    >
                        <img
                            src={English}
                            style={{ width: '20px' }}
                            className={styles.iconFlag}
                        />{' '}
                        English
                    </div>
                </div>
            )}
        </div>
    );
}

export default LanguageDropdown;
