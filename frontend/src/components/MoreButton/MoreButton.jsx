import { useTranslation } from 'react-i18next';
import styles from './MoreButton.module.scss';

function MoreButton() {
    const { container } = styles;
    const { t } = useTranslation();
    return (
        <div className={container}>
            <button>
                <span>{t('homePage.more')}</span>
            </button>
        </div>
    );
}

export default MoreButton;
