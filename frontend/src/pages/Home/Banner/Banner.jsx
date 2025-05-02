import ComprehensiveService from '@components/ComprehensiveService/ComprehensiveService';
import styles from './Banner.module.scss';
import { dataCService } from './constants';
import { useTranslation } from 'react-i18next';

function Banner() {
    const { t } = useTranslation();
    const dataS = dataCService(t);

    return (
        <div className={styles.bannerContainer}>
            <div className={styles.title1}>{t('banner.title')}</div>
            <div className={styles.title2}>{t('banner.description')}</div>
            <div className={styles.options}>
                <div className={styles.optionLeft}>
                    {dataS.slice(0, 5).map((item, index) => (
                        <ComprehensiveService
                            key={index}
                            icon={item.icon}
                            title={item.title}
                        />
                    ))}
                </div>
                <div className={styles.optionRight}>
                    {dataS.slice(5, 10).map((item, index) => (
                        <ComprehensiveService
                            key={index}
                            icon={item.icon}
                            title={item.title}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Banner;
