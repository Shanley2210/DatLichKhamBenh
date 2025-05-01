import UserManage from '@pages/Admin/UserManage';
import { useEffect, useState } from 'react';
import styles from './Admin.module.scss';
import MainLayout from '@layouts/MainLayout/MainLayout';

function Admin() {
    const { viewStyles, hoverStyles } = styles;

    const [view, setView] = useState(() => {
        return localStorage.getItem('adminView') || '0';
    });

    useEffect(() => {
        localStorage.setItem('adminView', view);
    }, [view]);

    return (
        <>
            <div className={viewStyles}>
                <div onClick={() => setView('0')} className={hoverStyles}>
                    Admin
                </div>
                <div onClick={() => setView('1')} className={hoverStyles}>
                    User Mangae
                </div>
            </div>

            <MainLayout>
                {view === '0' && <div>Admin</div>}
                {view === '1' && <UserManage />}
            </MainLayout>
        </>
    );
}

export default Admin;
