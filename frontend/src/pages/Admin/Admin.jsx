import UserManage from '@pages/Admin/UserManage/UserManage';
import { useEffect, useState } from 'react';
import styles from './Admin.module.scss';
import AdminSidebar from '@components/AdminSidebar/AdminSidebar';
import AdminHeader from '@pages/Admin/AdminHeader/AdminHeader';
import Cookies from 'js-cookie';
import NotFound from '@containers/NotFound/NotFound';
import UserManageRedux from '@pages/Admin/UserManageRedux/UserManageRedux';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserInfo } from '@stores/userSlice';
import LoadingPage from '@containers/LoadingPage/LoadingPage';

function Admin() {
    const dispatch = useDispatch();
    const { userInfo, loading } = useSelector((state) => state.user);

    const [view, setView] = useState(() => {
        return localStorage.getItem('adminView') || '0';
    });

    useEffect(() => {
        localStorage.setItem('adminView', view);
    }, [view]);

    useEffect(() => {
        dispatch(fetchUserInfo());
    }, [dispatch]);

    return (
        <>
            {loading ? (
                <LoadingPage />
            ) : userInfo?.roleId === 'R1' || userInfo?.roleId === 'R2' ? (
                <div className={styles.adminContainer}>
                    <div>
                        <AdminSidebar
                            userData={userInfo}
                            view={view}
                            setView={setView}
                        />
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
