import { IoPersonAddOutline } from 'react-icons/io5';
import styles from './UserManageRedux.module.scss';
import cls from 'classnames';
import { MdOutlineSave } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGender, fetchPosititions, fetchRoles } from '@stores/adminSlice';
import { FaRegFileImage } from 'react-icons/fa';

function UserManageRedux() {
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const { genders, roles, posititions, loading } = useSelector(
        (state) => state.admin
    );
    const { selectedLanguage } = useSelector((state) => state.language);

    const [previewImg, setPreviewImg] = useState(null);

    const handleOnChangeImage = (event) => {
        const data = event.target.files;
        const file = data[0];
        const objectUrl = URL.createObjectURL(file);

        setPreviewImg(objectUrl);
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
                        className={cls(styles.input)}
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
                        className={cls(styles.input)}
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
                    <select className={cls(styles.input)}>
                        {loading ? (
                            <option>Loading gender...</option>
                        ) : (
                            genders &&
                            genders.length > 0 &&
                            genders.map((item) => (
                                <option key={item.id}>
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
                    <select className={cls(styles.input)}>
                        {loading ? (
                            <option>Loading roles...</option>
                        ) : (
                            roles &&
                            roles.length > 0 &&
                            roles.map((item) => (
                                <option key={item.id}>
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
                    <select className={cls(styles.input)}>
                        {loading ? (
                            <option>Loading posititions...</option>
                        ) : (
                            posititions &&
                            posititions.length > 0 &&
                            posititions.map((item) => (
                                <option key={item.id}>
                                    {selectedLanguage === 'vi'
                                        ? item.valueVi
                                        : item.valueEn}
                                </option>
                            ))
                        )}
                    </select>
                </div>

                <div className={cls(styles.inputContainer, 'col-12')}>
                    <button className={cls(styles.button)}>
                        <MdOutlineSave />
                        <p className={cls(styles.text)}>
                            {t('manageUser.save')}
                        </p>
                    </button>
                </div>
            </form>
        </div>
    );
}

export default UserManageRedux;
