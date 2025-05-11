import { IoPersonAddOutline } from 'react-icons/io5';
import styles from './UserManageRedux.module.scss';
import cls from 'classnames';
import { MdOutlineSave } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import { useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    createNewUser,
    fetchAllUsers,
    fetchGender,
    fetchPosititions,
    fetchRoles,
    updateAUser
} from '@stores/adminSlice';
import { FaRegFileImage } from 'react-icons/fa';
import { ToastContext } from '@contexts/ToastProvider';
import TableUser from '@containers/UserManageRedux/TableUser';
import { bufferToBase64Url, getBase64 } from '@utils/commonUtils';
import LoadingText from '@components/LoadingCommon/LoadingCommon';

function UserManageRedux() {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const fileInputRef = useRef(null);

    const { toast } = useContext(ToastContext);

    const { genders, roles, posititions, loading } = useSelector(
        (state) => state.admin
    );
    const { selectedLanguage } = useSelector((state) => state.language);

    const [previewImg, setPreviewImg] = useState(null);
    const [newUser, setNewUser] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        address: '',
        phoneNumber: '',
        gender: 'M',
        role: 'R1',
        position: 'P0',
        image: ''
    });
    const [isEdit, setIsEdit] = useState(false);
    const [userId, setUserId] = useState(null);

    const handleOnChangeImage = async (event) => {
        const data = event.target.files;
        const file = data[0];
        if (file) {
            const base64 = await getBase64(file);
            const objectUrl = URL.createObjectURL(file);

            setPreviewImg(objectUrl);

            setNewUser({ ...newUser, image: base64 });
        }
    };

    const checkValidateInput = () => {
        let isValid = true;

        let arrCheck = [
            { key: 'Email', value: newUser.email },
            { key: 'Password', value: newUser.password },
            { key: 'First name', value: newUser.firstName },
            { key: 'Last name', value: newUser.lastName },
            { key: 'Address', value: newUser.address },
            { key: 'Phone number', value: newUser.phoneNumber },
            { key: 'Gender', value: newUser.gender },
            { key: 'Role', value: newUser.role },
            { key: 'Position', value: newUser.position }
        ];

        arrCheck.forEach((item) => {
            if (!item.value) {
                isValid = false;
                toast.warning('Missing parameter: ' + item.key);
            }
        });

        return isValid;
    };

    const clearInput = () => {
        setNewUser({
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            phoneNumber: '',
            gender: 'M',
            role: 'R1',
            position: 'P0',
            image: ''
        });
        setPreviewImg(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = null;
        }
    };

    const handleSave = async () => {
        if (!checkValidateInput()) return;

        if (!isEdit) {
            const res = await dispatch(createNewUser(newUser));

            if (res.payload.errCode === 1) {
                if (selectedLanguage === 'vi') {
                    toast.error(
                        'Email đã được sử dụng, vui lòng chọn email khác!'
                    );
                } else {
                    toast.error(
                        'Email is already in used, please try another email!'
                    );
                }

                return;
            }

            if (res.payload.errCode === 0) {
                if (selectedLanguage === 'vi') {
                    toast.success('Thêm người dùng mới thành công!');
                } else {
                    toast.success('Add new user successfully!');
                }
            } else {
                if (selectedLanguage === 'vi') {
                    toast.error('Có lỗi khi thêm người dùng!');
                } else {
                    toast.error('There is an error when adding user!');
                }

                return;
            }
        } else {
            const dataEdit = {
                id: userId,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                address: newUser.address,
                phoneNumber: newUser.phoneNumber,
                image: newUser.image,
                gender: newUser.gender,
                roleId: newUser.role,
                positionId: newUser.position
            };
            const res = await dispatch(updateAUser(dataEdit));

            if (res.payload.errCode === 0) {
                if (selectedLanguage === 'vi') {
                    toast.success('Cập nhật người dùng thành công!');
                } else {
                    toast.success('Update user successfully!');
                }
            } else {
                if (selectedLanguage === 'vi') {
                    toast.error('Có lỗi khi cập nhật người dùng!');
                } else {
                    toast.error('There is an error when updating user!');
                }

                return;
            }

            setIsEdit(false);
        }

        clearInput();
        dispatch(fetchAllUsers());
    };

    const handleEditUserFromParent = (user) => {
        setIsEdit(true);
        setNewUser({
            email: user.email,
            password: 'HARDCODE',
            firstName: user.firstName,
            lastName: user.lastName,
            address: user.address,
            phoneNumber: user.phoneNumber,
            gender: user.gender,
            role: user.roleId,
            position: user.positionId,
            image: user.image
        });
        setPreviewImg(bufferToBase64Url(user.image));
        setUserId(user.id);
    };

    useEffect(() => {
        dispatch(fetchGender());
        dispatch(fetchRoles());
        dispatch(fetchPosititions());
    }, [dispatch]);

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
                {t('manageUser.title')}
            </div>

            <div className={cls(styles.btnAdd)}>
                <IoPersonAddOutline />
                {t('manageUser.add')}
            </div>

            <form className={cls(styles.inputContainer, 'row')}>
                <div className={cls(styles.coolinput, 'col-3')}>
                    <label htmlFor='input' className={cls(styles.text)}>
                        {t('manageUser.email')}:
                    </label>
                    <input
                        type='email'
                        placeholder={t('manageUser.email2')}
                        name='input'
                        disabled={isEdit}
                        className={cls(styles.input)}
                        value={newUser.email}
                        onChange={(e) => {
                            setNewUser({
                                ...newUser,
                                email: e.target.value
                            });
                        }}
                    />
                </div>

                <div className={cls(styles.coolinput, 'col-3')}>
                    <label htmlFor='input' className={cls(styles.text)}>
                        {t('manageUser.password')}:
                    </label>
                    <input
                        type='password'
                        autoComplete='currentPassword'
                        placeholder={t('manageUser.password2')}
                        name='input'
                        disabled={isEdit}
                        className={cls(styles.input)}
                        value={newUser.password}
                        onChange={(e) => {
                            setNewUser({
                                ...newUser,
                                password: e.target.value
                            });
                        }}
                    />
                </div>

                <div className={cls(styles.coolinput, 'col-3')}>
                    <label htmlFor='input' className={cls(styles.text)}>
                        {t('manageUser.firtName')}:
                    </label>
                    <input
                        type='text'
                        placeholder={t('manageUser.firtName2')}
                        name='input'
                        className={cls(styles.input)}
                        value={newUser.firstName}
                        onChange={(e) => {
                            setNewUser({
                                ...newUser,
                                firstName: e.target.value
                            });
                        }}
                    />
                </div>

                <div className={cls(styles.coolinput, 'col-3')}>
                    <label htmlFor='input' className={cls(styles.text)}>
                        {t('manageUser.lastName')}:
                    </label>
                    <input
                        type='text'
                        placeholder={t('manageUser.lastName2')}
                        name='input'
                        className={cls(styles.input)}
                        value={newUser.lastName}
                        onChange={(e) => {
                            setNewUser({
                                ...newUser,
                                lastName: e.target.value
                            });
                        }}
                    />
                </div>

                <div className={cls(styles.coolinput, 'col-3')}>
                    <label htmlFor='input' className={cls(styles.text)}>
                        {t('manageUser.phone')}:
                    </label>
                    <input
                        type='text'
                        placeholder={t('manageUser.phone2')}
                        name='input'
                        className={cls(styles.input)}
                        value={newUser.phoneNumber}
                        onChange={(e) => {
                            setNewUser({
                                ...newUser,
                                phoneNumber: e.target.value
                            });
                        }}
                    />
                </div>

                <div className={cls(styles.coolinput, 'col-9')}>
                    <label htmlFor='input' className={cls(styles.text)}>
                        {t('manageUser.address')}:
                    </label>
                    <input
                        type='text'
                        placeholder={t('manageUser.address2')}
                        name='input'
                        className={cls(styles.input)}
                        value={newUser.address}
                        onChange={(e) => {
                            setNewUser({
                                ...newUser,
                                address: e.target.value
                            });
                        }}
                    />
                </div>

                <div className={cls('col-3', 'mt-3')}>
                    <label
                        className={cls(styles.custumFileUpload)}
                        htmlFor='file'
                    >
                        {previewImg ? (
                            <img src={previewImg} alt='preview' />
                        ) : (
                            <>
                                <div className={cls(styles.icon)}>
                                    <FaRegFileImage />
                                </div>
                                <div className={cls(styles.text)}>
                                    <span>{t('manageUser.image2')}</span>
                                </div>
                            </>
                        )}
                        <input
                            type='file'
                            id='file'
                            ref={fileInputRef}
                            onChange={(e) => {
                                handleOnChangeImage(e);
                            }}
                        />
                    </label>
                </div>

                <div className={cls(styles.coolinput, 'col-2')}>
                    <label htmlFor='input' className={cls(styles.text)}>
                        {t('manageUser.gender')}:
                    </label>
                    <select
                        className={cls(styles.input)}
                        value={newUser.gender}
                        onChange={(e) => {
                            setNewUser({
                                ...newUser,
                                gender: e.target.value
                            });
                        }}
                    >
                        {loading ? (
                            <option>Loading gender...</option>
                        ) : (
                            genders &&
                            genders.length > 0 &&
                            genders.map((item) => (
                                <option key={item.id} value={item.key}>
                                    {selectedLanguage === 'vi'
                                        ? item.valueVi
                                        : item.valueEn}
                                </option>
                            ))
                        )}
                    </select>
                </div>

                <div className={cls(styles.coolinput, 'col-2')}>
                    <label htmlFor='input' className={cls(styles.text)}>
                        {t('manageUser.role')}:
                    </label>
                    <select
                        className={cls(styles.input)}
                        value={newUser.role}
                        onChange={(e) => {
                            setNewUser({
                                ...newUser,
                                role: e.target.value
                            });
                        }}
                    >
                        {loading ? (
                            <option>Loading roles...</option>
                        ) : (
                            roles &&
                            roles.length > 0 &&
                            roles.map((item) => (
                                <option key={item.id} value={item.key}>
                                    {selectedLanguage === 'vi'
                                        ? item.valueVi
                                        : item.valueEn}
                                </option>
                            ))
                        )}
                    </select>
                </div>

                <div className={cls(styles.coolinput, 'col-2')}>
                    <label htmlFor='input' className={cls(styles.text)}>
                        {t('manageUser.position')}:
                    </label>
                    <select
                        className={cls(styles.input)}
                        value={newUser.position}
                        onChange={(e) =>
                            setNewUser({
                                ...newUser,
                                position: e.target.value
                            })
                        }
                    >
                        {loading ? (
                            <option>Loading posititions...</option>
                        ) : (
                            posititions &&
                            posititions.length > 0 &&
                            posititions.map((item) => (
                                <option key={item.id} value={item.key}>
                                    {selectedLanguage === 'vi'
                                        ? item.valueVi
                                        : item.valueEn}
                                </option>
                            ))
                        )}
                    </select>
                </div>

                <div className={cls(styles.inputContainer, 'col-12')}>
                    <button
                        className={cls(styles.button, {
                            [styles.edit]: isEdit
                        })}
                        type='button'
                        onClick={handleSave}
                    >
                        {loading ? (
                            <LoadingText />
                        ) : (
                            <>
                                <MdOutlineSave />
                                <p className={cls(styles.text)}>
                                    {isEdit
                                        ? t('manageUser.edit')
                                        : t('manageUser.save')}
                                </p>
                            </>
                        )}
                    </button>
                </div>
            </form>

            <TableUser
                setIsEdit={setIsEdit}
                editProps={handleEditUserFromParent}
            />
        </div>
    );
}

export default UserManageRedux;
