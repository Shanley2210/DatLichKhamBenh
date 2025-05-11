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
import ConfirmToast from '@components/ConfirmToast/ConfirmToast';
import { bufferToBase64Url } from '@utils/commonUtils';
import LoadingText from '@components/LoadingCommon/LoadingCommon';

function TableUser({ editProps, setIsEdit }) {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const { user, loading, error } = useSelector((state) => state.admin);
    const { selectedLanguage } = useSelector((state) => state.language);

    const handleEditUser = (user) => {
        editProps(user);
    };

    const handleDeleteUser = async (id) => {
        toast(
            <ConfirmToast
                message='Bạn có muốn xóa người dùng này?'
                onYes={async () => {
                    const res = await dispatch(deleteAUser(id));

                    toast.dismiss();

                    if (res.payload.errCode === 2) {
                        if (selectedLanguage === 'vi') {
                            toast.error('Người dùng không tồn tại');
                        } else {
                            toast.error(`The user isn't exist`);
                        }
                        return;
                    }

                    if (selectedLanguage === 'vi') {
                        toast.success('Xóa người dùng thành công!');
                    } else {
                        toast.success('Delete user successfully!');
                    }
                    dispatch(fetchAllUsers());
                    setIsEdit(false);
                }}
                onNo={() => {
                    toast.dismiss();
                    toast.info('Đã hủy thao tác.');
                }}
            />,
            {
                position: 'top-center',
                autoClose: false,
                closeOnClick: false,
                closeButton: false
            }
        );
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
            {loading ? (
                <LoadingText />
            ) : (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th
                                className={cls(
                                    styles.imageHeader,
                                    'text-center'
                                )}
                            >
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
                            <th className='text-center'>
                                {t('tableUser.action')}
                            </th>
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
                                                src={bufferToBase64Url(
                                                    user.image
                                                )}
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
                                            <LiaUserEditSolid
                                                onClick={() => {
                                                    handleEditUser(user);
                                                }}
                                            />{' '}
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
            )}
        </div>
    );
}

export default TableUser;
