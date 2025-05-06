import styles from './AdminSidebar.module.scss';
import logo from '@/assets/icons/logo.svg';
import { useTranslation } from 'react-i18next';
import { IoIosLogOut } from 'react-icons/io';
import { FaUsers } from 'react-icons/fa';
import cls from 'classnames';

function AdminSidebar({ view, setView }) {
    const { t } = useTranslation();

    return (
        <div className={styles.input}>
            <img src={logo} alt='' />

            <button
                className={cls(styles.value, { [styles.active]: view === '1' })}
                onClick={() => setView('1')}
            >
                <FaUsers /> {t('adminSidebar.user')}
            </button>
            <button
                className={cls(styles.value, { [styles.active]: view === '2' })}
                onClick={() => setView('2')}
            >
                <FaUsers /> {t('adminSidebar.user2')}
            </button>
            <button className={styles.value}>Appearance</button>
            <button className={styles.value}>Accessibility</button>
            <button className={styles.value}>Notifications</button>

            <div className={styles.account}>
                <div>
                    <img
                        src='https://www.w3schools.com/howto/img_avatar.png'
                        alt=''
                    />
                    <span>Nguyễn Trung Hiếu</span>
                </div>
                <button className={styles.value}>
                    <IoIosLogOut />
                    Log out
                </button>
            </div>
        </div>
    );
}

export default AdminSidebar;
