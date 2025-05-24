import styles from './DoctorManage.module.scss';
import Editor from '@components/Editor/Editor';
import { useTranslation } from 'react-i18next';
import cls from 'classnames';
import Select from 'react-select';
import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchAllDoctors,
    fetchDetailInfoDoctor,
    fetchSaveDetailInfoDoctor
} from '@stores/doctorSlice';
import { ToastContext } from '@contexts/ToastProvider';
import SaveButton from '@components/SaveButton/SaveButton';

function DoctorManage() {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const { toast } = useContext(ToastContext);

    const { allDoctors } = useSelector((state) => state.doctor);
    const { selectedLanguage } = useSelector((state) => state.language);

    const [doctorSelected, setDoctorSelected] = useState(null);
    const [doctorDesc, setDoctorDesc] = useState('');
    const [contentMarkDown, setContentMarkDown] = useState('');
    const [contentHTML, setContentHTML] = useState('');
    const [doctorOptions, setDoctorOptions] = useState([]);
    const [isUpdate, setIsUpdate] = useState(false);

    const listDoctors = () => {
        if (allDoctors && allDoctors.length > 0) {
            const options = allDoctors.map((item) => ({
                value: item.id,
                label: item.firstName + ' ' + item.lastName
            }));
            setDoctorOptions(options);
        }
    };

    const handleChangeDoctor = async (selectedOption) => {
        setDoctorSelected(selectedOption);

        try {
            const res = await dispatch(
                fetchDetailInfoDoctor(selectedOption.value)
            );

            if (res.payload) {
                if (res.payload.data.data.markdownData) {
                    setContentMarkDown(
                        res.payload.data.data.markdownData.contentMarkdown
                    );
                    setDoctorDesc(
                        res.payload.data.data.markdownData.description
                    );
                    setContentHTML(
                        res.payload.data.data.markdownData.contentHTML
                    );
                    setIsUpdate(true);
                } else {
                    setContentMarkDown('');
                    setDoctorDesc('');
                    setContentHTML('');
                    setIsUpdate(false);
                }
            } else {
                console.error('Không lấy được dữ liệu bác sĩ:', res.error);
            }
        } catch (error) {
            console.error('Lỗi:', error);
        }
    };

    const handleSubmit = async () => {
        if (!doctorSelected) {
            toast.error('Vui lòng chọn bác sĩ');
            return;
        }

        if (!isUpdate) {
            const dataSave = {
                doctorId: doctorSelected.value,
                description: doctorDesc,
                contentHTML: contentHTML,
                contentMarkdown: contentMarkDown,
                action: 'CREATE'
            };

            if (!dataSave.description) {
                if (selectedLanguage === 'vi') {
                    toast.error('Vui lòng nhập mô tả');
                } else {
                    toast.error('Please enter a description');
                }

                return;
            }
            if (!dataSave.contentHTML) {
                if (selectedLanguage === 'vi') {
                    toast.error('Vui lòng nhập nội dung HTML');
                } else {
                    toast.error('Please enter HTML content');
                }

                return;
            }
            if (!dataSave.contentMarkdown) {
                if (selectedLanguage === 'vi') {
                    toast.error('Vui lòng nhập nội dung MarkDown');
                } else {
                    toast.error('Please enter Markdown content');
                }

                return;
            }

            try {
                const res = await dispatch(fetchSaveDetailInfoDoctor(dataSave));

                if (res.payload.errCode === 0) {
                    if (selectedLanguage === 'vi') {
                        if (isUpdate)
                            toast.success('Sửa mô tả bác sĩ thành công!');
                        else toast.success('Thêm mô tả bác sĩ thành công!');
                    } else {
                        if (isUpdate)
                            toast.success('Update description successfully!');
                        else toast.success('Add description successfully!');
                    }
                } else {
                    if (selectedLanguage === 'vi') {
                        if (isUpdate)
                            toast.success('Lỗi khi sửa mô tả bác sĩ!');
                        else toast.success('Lỗi khi thêm mô tả bác sĩ!');
                    } else {
                        if (isUpdate)
                            toast.success('Error when update description!');
                        else toast.success('Error when add description!');
                    }
                }
            } catch (e) {
                console.log('Error:', e);
            }
        } else {
            const dataUpdate = {
                doctorId: doctorSelected.value,
                description: doctorDesc,
                contentHTML: contentHTML,
                contentMarkdown: contentMarkDown,
                action: 'EDIT'
            };

            if (!dataUpdate.description) {
                if (selectedLanguage === 'vi') {
                    toast.error('Vui lòng nhập mô tả');
                } else {
                    toast.error('Please enter a description');
                }

                return;
            }
            if (!dataUpdate.contentHTML) {
                if (selectedLanguage === 'vi') {
                    toast.error('Vui lòng nhập nội dung HTML');
                } else {
                    toast.error('Please enter HTML content');
                }

                return;
            }
            if (!dataUpdate.contentMarkdown) {
                if (selectedLanguage === 'vi') {
                    toast.error('Vui lòng nhập nội dung MarkDown');
                } else {
                    toast.error('Please enter Markdown content');
                }

                return;
            }

            try {
                const res = await dispatch(
                    fetchSaveDetailInfoDoctor(dataUpdate)
                );

                if (res.payload.errCode === 0) {
                    if (selectedLanguage === 'vi') {
                        toast.success('Sửa mô tả bác sĩ thành công!');
                    } else {
                        toast.success('Update description successfully!');
                    }
                } else {
                    if (selectedLanguage === 'vi') {
                        toast.success('Lỗi khi sửa mô tả bác sĩ!');
                    } else {
                        toast.success('Error when update description!');
                    }
                }
            } catch (e) {
                console.log('Error:', e);
            }
        }
    };

    useEffect(() => {
        dispatch(fetchAllDoctors());
    }, [dispatch]);

    useEffect(() => {
        listDoctors();
    }, [allDoctors]);

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
                {t('manageDoctor.title')}
            </div>

            <div className='row g-4'>
                <div className='col-md-4'>
                    <label className='form-label fw-semibold'>
                        {t('manageDoctor.select')}
                    </label>
                    <Select
                        options={doctorOptions}
                        onChange={handleChangeDoctor}
                        placeholder={t('manageDoctor.select2')}
                    />
                </div>

                <div className='col-md-8'>
                    <label className='form-label fw-semibold'>
                        {t('manageDoctor.info')}
                    </label>
                    <textarea
                        className='form-control'
                        rows={8}
                        placeholder={t('manageDoctor.info2')}
                        value={doctorDesc}
                        onChange={(e) => setDoctorDesc(e.target.value)}
                    ></textarea>
                </div>
            </div>

            <div className='mt-4'>
                <Editor
                    contentMarkDown={contentMarkDown}
                    contentHTML={contentHTML}
                    setContentHTML={setContentHTML}
                    setContentMarkDown={setContentMarkDown}
                />
            </div>

            <SaveButton
                handleClick={handleSubmit}
                title={
                    isUpdate ? t('manageDoctor.edit') : t('manageDoctor.save')
                }
            />
        </div>
    );
}

export default DoctorManage;
