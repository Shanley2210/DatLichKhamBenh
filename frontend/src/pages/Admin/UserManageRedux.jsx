import { IoPersonAddOutline } from 'react-icons/io5';
import styles from './Admin.module.scss';
import cls from 'classnames';

function UserManageRedux() {
    return (
        <div className={styles.userReduxContainer}>
            <div
                className={cls(
                    styles.title,
                    'text-center',
                    'fw-bold',
                    'mb-3',
                    'mt-3',
                    'text-primary'
                )}
            >
                User Manage Redux
            </div>

            <div className={cls(styles.btnAdd)}>
                <IoPersonAddOutline />
                Add new user
            </div>
        </div>
    );
}

export default UserManageRedux;
