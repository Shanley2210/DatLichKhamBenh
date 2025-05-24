import styles from './Header.module.scss';
import { IoMenu } from 'react-icons/io5';
import logo from '@/assets/icons/logo.svg';
import LanguageDropdown from '@components/LanguageDropdown/LanguageDropdown';
import { useTranslation } from 'react-i18next';

function Header() {
    const { t } = useTranslation();
    return (
        <div className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <div className={styles.leftContent}>
                    <IoMenu />
                    <div className={styles.headerLogo}>
                        <img src={logo} alt='logo' />
                    </div>
                </div>

                <div className={styles.centerContent}>
                    <div className={styles.childContent}>
                        <div>
                            <strong>{t('header.specialty')}</strong>
                        </div>
                        <div>{t('header.searchSpecialty')}</div>
                    </div>

                    <div className={styles.childContent}>
                        <div>
                            <strong>{t('header.healthcareFacility')}</strong>
                        </div>
                        <div>{t('header.choose')}</div>
                    </div>

                    <div className={styles.childContent}>
                        <div>
                            <strong>{t('header.doctor')}</strong>
                        </div>
                        <div>{t('header.chooseDoctor')}</div>
                    </div>

                    <div className={styles.childContent}>
                        <div>
                            <strong>{t('header.medicalPackage')}</strong>
                        </div>
                        <div>{t('header.general')}</div>
                    </div>
                </div>

                <div className={styles.rightContent}>
                    <LanguageDropdown />
                </div>
            </div>
        </div>
    );
}

export default Header;
