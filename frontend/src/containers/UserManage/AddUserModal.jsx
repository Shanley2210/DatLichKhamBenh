import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import cls from 'classnames';
import styles from './UserModal.module.scss';
import { useContext, useState } from 'react';
import { ToastContext } from '@contexts/ToastProvider';
import { addNewUser } from '@services/userService';

function AddUserModal({ show, setShow, fetchAllUsers }) {
    const { container, input, boxName } = styles;

    const { toast } = useContext(ToastContext);

    const [newUser, setNewUser] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        address: '',
        phoneNumber: '',
        image: '',
        gender: '1',
        roleId: 'R1'
    });

    const checkValidateInput = () => {
        let arrInput = [
            'email',
            'password',
            'firstName',
            'lastName',
            'address',
            'phoneNumber',
            'image',
            'gender',
            'roleId'
        ];

        let isValid = true;

        for (let i = 0; i < arrInput.length; i++) {
            if (!newUser[arrInput[i]]) {
                isValid = false;
                toast.error('Missing parameter: ' + arrInput[i]);
                break;
            }
        }

        return isValid;
    };

    const handleAddNewUser = async () => {
        const isValid = checkValidateInput();
        if (!isValid) return;

        const res = await addNewUser(newUser);

        if (res && res.data.errCode === 0) {
            setShow(false);
            toast.success('Create new user successfully!');
            fetchAllUsers();

            setUserData({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: '',
                phoneNumber: '',
                image: '',
                gender: '1',
                roleId: 'R1'
            });
        } else {
            toast.error(res.data.errMessage);
        }
    };

    return (
        <>
            <Modal show={show} onHide={() => setShow(false)} size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title>Create User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className={cls(container)}>
                        <label>
                            <input
                                required
                                type='email'
                                className={cls(input)}
                                onChange={(e) =>
                                    setNewUser({
                                        ...newUser,
                                        email: e.target.value
                                    })
                                }
                            />
                            <span>Email</span>
                        </label>

                        <label>
                            <input
                                required
                                type='current-password'
                                className={cls(input)}
                                onChange={(e) =>
                                    setNewUser({
                                        ...newUser,
                                        password: e.target.value
                                    })
                                }
                            />
                            <span>Password</span>
                        </label>

                        <div className={cls(boxName)}>
                            <label>
                                <input
                                    required
                                    type='text'
                                    className={cls(input)}
                                    onChange={(e) =>
                                        setNewUser({
                                            ...newUser,
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
                                    onChange={(e) =>
                                        setNewUser({
                                            ...newUser,
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
                                onChange={(e) =>
                                    setNewUser({
                                        ...newUser,
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
                                onChange={(e) =>
                                    setNewUser({
                                        ...newUser,
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
                                onChange={(e) =>
                                    setNewUser({
                                        ...newUser,
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
                                    onChange={(e) =>
                                        setNewUser({
                                            ...newUser,
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
                                    onChange={(e) =>
                                        setNewUser({
                                            ...newUser,
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
                    <Button variant='primary' onClick={handleAddNewUser}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AddUserModal;
