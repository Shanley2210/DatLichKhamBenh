import { useContext, useState } from 'react';
import styles from './LanguageDropdown.module.scss';
import { IoMdArrowDropdown } from 'react-icons/io';
import VietNamese from '@icons/Vietnamese.svg';
import English from '@icons/English.svg';
import { LanguageContext } from '@contexts/LanguageProvider';

function LanguageDropdown() {
    const { selectedLanguage, setSelectedLanguage } =
        useContext(LanguageContext);

    const [open, setOpen] = useState(false);

    const toggleDropdown = () => setOpen(!open);

    const handleSelect = (lang) => {
        setSelectedLanguage(lang);
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
