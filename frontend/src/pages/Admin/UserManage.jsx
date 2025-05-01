import { deleteUser, getAllUser } from '@services/userService';
import styles from './Admin.module.scss';
import cls from 'classnames';
import { useContext, useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { LiaUserEditSolid } from 'react-icons/lia';
import { AiOutlineUserDelete } from 'react-icons/ai';
import { IoPersonAddOutline } from 'react-icons/io5';
import { ToastContext } from '@contexts/ToastProvider';
import ConfirmToast from '@components/ConfirmToast/ConfirmToast';
import AddUserModal from '@containers/UserManage/AddUserModal';
import EditUserModal from '@containers/UserManage/EditUserModal';

function UserManage() {
    const { userContainer, title, actionStyles, btnAdd } = styles;

    const { toast } = useContext(ToastContext);

    const [allUsers, setAllUsers] = useState([]);
    const [showModalAdd, setShowModalAdd] = useState(false);
    const [showModalEdit, setShowModalEdit] = useState(false);
    const [editUser, setEditUser] = useState({});

    const fetchAllUsers = async () => {
        const res = await getAllUser('ALL');
        setAllUsers(res.users);
    };

    const handleDeleteUser = (id) => {
        toast(
            <ConfirmToast
                message='Bạn có muốn xóa người dùng này?'
                onYes={async () => {
                    await deleteUser(id)
                        .then((res) => {
                            if (res.errCode === 0) {
                                console.log(res);
                                toast.dismiss();
                                toast.success(res.message);
                                fetchAllUsers();
                            } else {
                                toast.error(res.errMessage);
                                fetchAllUsers();
                            }
                        })
                        .catch((err) => {
                            toast.error('Lỗi xóa người dùng.');
                            console.log(err);
                        });
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

    const handleEditUser = (user) => {
        setShowModalEdit(true);
        setEditUser(user);
    };

    useEffect(() => {
        fetchAllUsers();
    }, []);

    return (
        <div className={userContainer}>
            <div
                className={cls(
                    title,
                    'text-center',
                    'fw-bold',
                    'mb-3',
                    'mt-3',
                    'text-primary'
                )}
            >
                MANAGE USER
            </div>
            <div className={cls(btnAdd)} onClick={() => setShowModalAdd(true)}>
                <IoPersonAddOutline />
                Add new user
            </div>
            <div>
                <Table striped>
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Phone Number</th>
                            <th>Address</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allUsers.map((user) => (
                            <tr key={user.id}>
                                <td>{user.email}</td>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.phoneNumber}</td>
                                <td>{user.address}</td>
                                <td className={cls(actionStyles)}>
                                    <LiaUserEditSolid
                                        onClick={() => handleEditUser(user)}
                                    />{' '}
                                    <AiOutlineUserDelete
                                        onClick={() => {
                                            handleDeleteUser(user.id);
                                        }}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
            <AddUserModal
                show={showModalAdd}
                setShow={setShowModalAdd}
                fetchAllUsers={fetchAllUsers}
            />
            <EditUserModal
                show={showModalEdit}
                setShow={setShowModalEdit}
                fetchAllUsers={fetchAllUsers}
                editUser={editUser}
                setEditUser={setEditUser}
            />
        </div>
    );
}

export default UserManage;
