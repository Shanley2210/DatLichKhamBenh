import { useTranslation } from 'react-i18next';
import styles from './NotFound.module.scss';
import { useNavigate } from 'react-router-dom';

function NotFound() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <div className={styles.notFound}>
            <div className={styles.content}>
                <h1>{t('notFound.title')}</h1>
                <p>{t('notFound.description')}</p>
                <div
                    className={styles.homeButton}
                    onClick={() => navigate('/')}
                >
                    {t('notFound.button')}
                </div>
            </div>
        </div>
    );
}

export default NotFound;
