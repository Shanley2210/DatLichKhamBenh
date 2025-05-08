import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import cls from 'classnames';
import styles from './UserModal.module.scss';
import { useContext, useState } from 'react';
import { ToastContext } from '@contexts/ToastProvider';
import { updateUser } from '@services/userService';

function EditUserModal({
    show,
    setShow,
    fetchAllUsers,
    editUser,
    setEditUser
}) {
    const { container, input, boxName } = styles;

    const { toast } = useContext(ToastContext);

    const checkValidateInput = () => {
        let arrInput = [
            'email',
            'firstName',
            'lastName',
            'address',
            'phoneNumber',
            'image'
        ];

        let isValid = true;

        for (let i = 0; i < arrInput.length; i++) {
            if (!editUser[arrInput[i]]) {
                isValid = false;
                toast.error('Missing parameter: ' + arrInput[i]);
                break;
            }
        }

        return isValid;
    };

    const handleEditUser = async () => {
        const isValid = checkValidateInput();
        if (!isValid) return;

        const dataEdit = {
            id: editUser.id,
            firstName: editUser.firstName,
            lastName: editUser.lastName,
            address: editUser.address,
            phoneNumber: editUser.phoneNumber,
            image: editUser.image,
            gender: editUser.gender,
            roleId: editUser.roleId
        };

        console.log(dataEdit);

        const res = await updateUser(dataEdit);

        if (res && res.data.errCode === 0) {
            setShow(false);
            toast.success(res.data.message);
            fetchAllUsers();
        } else {
            toast.error(res.data.errMessage);
        }
    };

    return (
        <>
            <Modal show={show} onHide={() => setShow(false)} size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title>Edit User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className={cls(container)}>
                        <label>
                            <input
                                required
                                type='email'
                                className={cls(input)}
                                value={editUser.email}
                                disabled
                            />
                        </label>

                        <div className={cls(boxName)}>
                            <label>
                                <input
                                    required
                                    type='text'
                                    className={cls(input)}
                                    value={editUser.firstName}
                                    onChange={(e) =>
                                        setEditUser({
                                            ...editUser,
                                            firstName: e.target.value
                                        })
                                    }
                                />
                                <span>First Name</span>
                            </label>

                            <label>
                                <input
                                    required
                                    type='text'
                                    className={cls(input)}
                                    value={editUser.lastName}
                                    onChange={(e) =>
                                        setEditUser({
                                            ...editUser,
                                            lastName: e.target.value
                                        })
                                    }
                                />
                                <span>Last Name</span>
                            </label>
                        </div>

                        <label>
                            <input
                                required
                                type='text'
                                className={cls(input)}
                                value={editUser.address}
                                onChange={(e) =>
                                    setEditUser({
                                        ...editUser,
                                        address: e.target.value
                                    })
                                }
                            />
                            <span>Address</span>
                        </label>

                        <label>
                            <input
                                required
                                type='number'
                                className={cls(input)}
                                value={editUser.phoneNumber}
                                onChange={(e) =>
                                    setEditUser({
                                        ...editUser,
                                        phoneNumber: e.target.value
                                    })
                                }
                            />
                            <span>Phone Number</span>
                        </label>

                        <label>
                            <input
                                required
                                type='text'
                                className={cls(input)}
                                value={editUser.image}
                                onChange={(e) =>
                                    setEditUser({
                                        ...editUser,
                                        image: e.target.value
                                    })
                                }
                            />
                            <span>Image</span>
                        </label>

                        <div className={cls(boxName)}>
                            <label>
                                <select
                                    id='gender'
                                    name='gender'
                                    className={cls(input)}
                                    value={editUser.gender}
                                    onChange={(e) =>
                                        setEditUser({
                                            ...editUser,
                                            gender: e.target.value
                                        })
                                    }
                                >
                                    <option value='1'>Male</option>
                                    <option value='0'>Female</option>
                                </select>
                                <span>Gender</span>
                            </label>

                            <label>
                                <select
                                    id='roleId'
                                    name='roleId'
                                    className={cls(input)}
                                    value={editUser.roleId}
                                    onChange={(e) =>
                                        setEditUser({
                                            ...editUser,
                                            roleId: e.target.value
                                        })
                                    }
                                >
                                    <option value='R1'>Admin</option>
                                    <option value='R2'>Doctor</option>
                                    <option value='R3'>Patient</option>
                                </select>
                                <span>Role</span>
                            </label>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={() => setShow(false)}>
                        Close
                    </Button>
                    <Button variant='primary' onClick={handleEditUser}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default EditUserModal;
