import LanguageDropdown from '@components/LanguageDropdown/LanguageDropdown';
import styles from './AdminHeader.module.scss';

function AdminHeader() {
    return (
        <div className={styles.adminHeader}>
            <LanguageDropdown />
        </div>
    );
}

export default AdminHeader;
