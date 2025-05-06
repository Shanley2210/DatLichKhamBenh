import UserManage from '@pages/Admin/UserManage';
import { useEffect, useState } from 'react';
import styles from './Admin.module.scss';
import AdminSidebar from '@components/AdminSidebar/AdminSidebar';
import AdminHeader from '@pages/Admin/AdminHeader/AdminHeader';
import Cookies from 'js-cookie';
import NotFound from '@containers/NotFound/NotFound';
import UserManageRedux from '@pages/Admin/UserManageRedux';

function Admin() {
    const [view, setView] = useState(() => {
        return localStorage.getItem('adminView') || '0';
    });
    const [user, setUser] = useState(null);

    useEffect(() => {
        const rawCookie = Cookies.get('user');
        if (rawCookie) {
            try {
                const parsedUser = JSON.parse(decodeURIComponent(rawCookie));
                setUser(parsedUser);
            } catch (err) {
                console.error('Lỗi khi đọc cookie user:', err);
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('adminView', view);
    }, [view]);

    return (
        <>
            {user ? (
                <div className={styles.adminContainer}>
                    <div>
                        <AdminSidebar view={view} setView={setView} />
                    </div>

                    <div className={styles.adminContent}>
                        <AdminHeader />
                        {view === '1' && <UserManage />}
                        {view === '2' && <UserManageRedux />}
                    </div>
                </div>
            ) : (
                <NotFound />
            )}
        </>
    );
}

export default Admin;
