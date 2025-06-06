import styles from './AdminSidebar.module.scss';
import logo from '@/assets/icons/logo.svg';
import { useTranslation } from 'react-i18next';
import { IoIosLogOut } from 'react-icons/io';
import { FaClinicMedical, FaUsers } from 'react-icons/fa';
import { MdLocalHospital } from 'react-icons/md';
import { BsFillFileEarmarkPostFill } from 'react-icons/bs';
import cls from 'classnames';
import { handleLogout } from '@services/authService';
import Cookies from 'js-cookie';
import { useContext } from 'react';
import { ToastContext } from '@contexts/ToastProvider';
import { useNavigate } from 'react-router-dom';
import { bufferToBase64Url } from '@utils/commonUtils';
import { FaUserDoctor } from 'react-icons/fa6';
import { GrPlan } from 'react-icons/gr';

function AdminSidebar({ userData, view, setView }) {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const { toast } = useContext(ToastContext);

    const logout = async () => {
        await handleLogout(Cookies.get('refreshToken'))
            .then((res) => {
                console.log(res);
                if (res.data.errCode === 0) {
                    toast.success(res.data.message);

                    Cookies.remove('token');
                    Cookies.remove('refreshToken');

                    navigate('/');
                } else {
                    toast.error(res.data.errMessage);
                }
            })
            .catch((err) => {
                toast.error(err.response.data.errMessage);
            });
    };

    return (
        <div className={styles.input}>
            <img src={logo} alt='' />

            {/* User */}
            {userData.roleId === 'R1' && (
                <button
                    className={cls(styles.value, {
                        [styles.active]: view === '1'
                    })}
                    onClick={() => setView('1')}
                >
                    <FaUsers /> {t('adminSidebar.user')}
                </button>
            )}

            {/* User Redux */}
            {userData.roleId === 'R1' && (
                <button
                    className={cls(styles.value, {
                        [styles.active]: view === '2'
                    })}
                    onClick={() => setView('2')}
                >
                    <FaUsers /> {t('adminSidebar.user2')}
                </button>
            )}

            {/* Doctor */}
            {userData.roleId === 'R1' && (
                <button
                    className={cls(styles.value, {
                        [styles.active]: view === '3'
                    })}
                    onClick={() => setView('3')}
                >
                    <FaUserDoctor /> {t('adminSidebar.doctor')}
                </button>
            )}

            {/* Clinic */}
            {userData.roleId === 'R1' && (
                <button
                    className={cls(styles.value, {
                        [styles.active]: view === '4'
                    })}
                    onClick={() => setView('4')}
                >
                    <FaClinicMedical /> {t('adminSidebar.clinic')}
                </button>
            )}

            {/* Specialty  */}
            {userData.roleId === 'R1' && (
                <button
                    className={cls(styles.value, {
                        [styles.active]: view === '5'
                    })}
                    onClick={() => setView('5')}
                >
                    <MdLocalHospital /> {t('adminSidebar.specialty')}
                </button>
            )}

            {/* Post */}
            {userData.roleId === 'R1' && (
                <button
                    className={cls(styles.value, {
                        [styles.active]: view === '6'
                    })}
                    onClick={() => setView('6')}
                >
                    <BsFillFileEarmarkPostFill />
                    {t('adminSidebar.post')}
                </button>
            )}

            {/* Plan */}
            {(userData.roleId === 'R1' || userData.roleId === 'R2') && (
                <button
                    className={cls(styles.value, {
                        [styles.active]: view === '7'
                    })}
                    onClick={() => setView('7')}
                >
                    <GrPlan />
                    {t('adminSidebar.plan')}
                </button>
            )}

            <div className={styles.account}>
                <div>
                    <img src={bufferToBase64Url(userData.image)} alt='' />
                    <span>
                        {userData && userData.firstName
                            ? userData.firstName
                            : ''}{' '}
                        {userData && userData.lastName ? userData.lastName : ''}
                    </span>
                </div>
                <button className={styles.value} onClick={logout}>
                    <IoIosLogOut />
                    Log out
                </button>
            </div>
        </div>
    );
}

export default AdminSidebar;
