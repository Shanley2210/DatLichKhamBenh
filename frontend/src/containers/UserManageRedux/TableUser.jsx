import { LiaUserEditSolid } from 'react-icons/lia';
import styles from './UserManageRedux.module.scss';
import Table from 'react-bootstrap/Table';
import { AiOutlineUserDelete } from 'react-icons/ai';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { deleteAUser, fetchAllUsers } from '@stores/adminSlice';
import cls from 'classnames';
import { toast } from 'react-toastify';

function TableUser() {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const { user, loading, error } = useSelector((state) => state.admin);
    const { selectedLanguage } = useSelector((state) => state.language);

    const handleDeleteUser = async (id) => {
        const res = await dispatch(deleteAUser(id));

        if (res.payload.errCode === 2) {
            if (selectedLanguage === 'vi') {
                toast.error('Người dùng không tồn tại');
            } else {
                toast.error(`The user isn't exist`);
            }
            return;
        }

        if (selectedLanguage === 'vi') {
            toast.error('Xóa người dùng thành công!');
        } else {
            toast.error('Delete user successfully!');
        }
        dispatch(fetchAllUsers());
    };

    useEffect(() => {
        dispatch(fetchAllUsers());
    }, [dispatch]);

    const genderMap = {
        M: 'tableUser.male',
        F: 'tableUser.female',
        O: 'tableUser.other'
    };
    const roleMap = {
        R1: 'tableUser.admin',
        R2: 'tableUser.doctor',
        R3: 'tableUser.patient'
    };
    const positionMap = {
        P0: 'tableUser.none',
        P1: 'tableUser.master',
        P2: 'tableUser.PhD',
        P3: 'tableUser.associateProfessor',
        P4: 'tableUser.professor'
    };

    return (
        <div className={styles.tableUserContainer}>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th className={cls(styles.imageHeader, 'text-center')}>
                            {t('tableUser.image')}
                        </th>
                        <th>{t('tableUser.email')}</th>
                        <th>{t('tableUser.firstName')}</th>
                        <th>{t('tableUser.lastName')}</th>
                        <th>{t('tableUser.phone')}</th>
                        <th>{t('tableUser.address')}</th>
                        <th>{t('tableUser.gender')}</th>
                        <th>{t('tableUser.role')}</th>
                        <th>{t('tableUser.position')}</th>
                        <th className='text-center'>{t('tableUser.action')}</th>
                    </tr>
                </thead>
                <tbody>
                    {user.users &&
                        user.users.length > 0 &&
                        user.users.map((user) => {
                            return (
                                <tr key={user.id}>
                                    <td className='text-center'>
                                        <img
                                            className={styles.userImage}
                                            src={user.image}
                                            alt=''
                                        />
                                    </td>
                                    <td>{user.email}</td>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.phoneNumber}</td>
                                    <td>{user.address}</td>
                                    <td>
                                        {t(
                                            genderMap[user.gender] ||
                                                'tableUser.other'
                                        )}
                                    </td>
                                    <td>
                                        {t(
                                            roleMap[user.roleId] ||
                                                'Không xác định'
                                        )}
                                    </td>
                                    <td>
                                        {t(
                                            positionMap[user.positionId] ||
                                                'Không xác định'
                                        )}
                                    </td>
                                    <td
                                        className={cls(
                                            styles.action,
                                            'text-center'
                                        )}
                                    >
                                        <LiaUserEditSolid />{' '}
                                        <AiOutlineUserDelete
                                            onClick={() => {
                                                handleDeleteUser(user.id);
                                            }}
                                        />
                                    </td>
                                </tr>
                            );
                        })}
                </tbody>
            </Table>
        </div>
    );
}

export default TableUser;
