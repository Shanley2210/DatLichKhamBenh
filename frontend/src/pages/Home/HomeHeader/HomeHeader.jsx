import styles from './HomeHeader.module.scss';
import { IoMenu } from 'react-icons/io5';
import logo from '@icons/logo.svg';
import { FaClockRotateLeft } from 'react-icons/fa6';
import { PiHandshakeFill } from 'react-icons/pi';
import Search from '@components/Search/Search';
import { useState } from 'react';
import cls from 'classnames';
import LanguageDropdown from '@components/LanguageDropdown/LanguageDropdown';
import { useTranslation } from 'react-i18next';

function HomeHeader() {
    const { t } = useTranslation();

    const [active, setActive] = useState(0);

    return (
        <div className={styles.homeHeaderContainer}>
            <div className={styles.homeHeaderContent}>
                <div className={styles.leftContent}>
                    <IoMenu />
                    <div className={styles.headerLogo}>
                        <img src={logo} alt='logo' />
                    </div>
                </div>

                <div className={styles.centerContent}>
                    <div
                        onClick={() => setActive(0)}
                        className={cls(styles.childContent, {
                            [styles.isActive]: active === 0
                        })}
                    >
                        {t('homeHeader.all')}
                    </div>
                    <div
                        onClick={() => setActive(1)}
                        className={cls(styles.childContent, {
                            [styles.isActive]: active === 1
                        })}
                    >
                        {t('homeHeader.home')}
                    </div>
                    <div
                        onClick={() => setActive(2)}
                        className={cls(styles.childContent, {
                            [styles.isActive]: active === 2
                        })}
                    >
                        {t('homeHeader.hospital')}
                    </div>
                    <div
                        onClick={() => setActive(3)}
                        className={cls(styles.childContent, {
                            [styles.isActive]: active === 3
                        })}
                    >
                        {t('homeHeader.healthy')}
                    </div>
                    <div>
                        <Search placeholder={t('homeHeader.search')} />
                    </div>
                </div>

                <div className={styles.rightContent}>
                    <div className={styles.childContentRight}>
                        <div className={styles.language}>
                            <LanguageDropdown />
                        </div>
                    </div>

                    <div className={styles.childContentRight}>
                        <div>
                            <PiHandshakeFill />
                        </div>
                        <div>{t('homeHeader.partner')}</div>
                    </div>
                    <div className={styles.childContentRight}>
                        <div>
                            <FaClockRotateLeft />
                        </div>
                        <div>{t('homeHeader.appointment')}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomeHeader;
