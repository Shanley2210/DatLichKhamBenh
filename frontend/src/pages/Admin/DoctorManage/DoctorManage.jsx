import styles from './DoctorManage.module.scss';
import Editor from '@components/Editor/Editor';
import { useTranslation } from 'react-i18next';
import cls from 'classnames';
import Select from 'react-select';
import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchAllDoctors,
    fetchSaveDetailInfoDoctor
} from '@stores/doctorSlice';
import { ToastContext } from '@contexts/ToastProvider';

function DoctorManage() {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const { toast } = useContext(ToastContext);

    const { allDoctors } = useSelector((state) => state.doctor);
    const { selectedLanguage } = useSelector((state) => state.language);

    const [doctorSelected, setDoctorSelected] = useState(null);
    const [doctorDesc, setDoctorDesc] = useState(null);
    const [contentMarkDown, setContentMarkDown] = useState('');
    const [contentHTML, setContentHTML] = useState('');
    const [doctorOptions, setDoctorOptions] = useState([]);

    const listDoctors = () => {
        if (allDoctors && allDoctors.length > 0) {
            const options = allDoctors.map((item) => ({
                value: item.id,
                label: item.firstName + ' ' + item.lastName
            }));
            setDoctorOptions(options);
        }
    };

    const handleSubmit = async () => {
        if (!doctorSelected) {
            toast.error('Vui lòng chọn bác sĩ');
            return;
        }

        const dataSave = {
            doctorId: doctorSelected.value,
            description: doctorDesc,
            contentHTML: contentHTML,
            contentMarkdown: contentMarkDown
        };

        if (!dataSave.description) {
            toast.error('Vui lòng nhập mô tả');
            return;
        }

        if (!dataSave.contentHTML) {
            toast.error('Vui lòng nhập nội dung HTML');
            return;
        }

        if (!dataSave.contentMarkdown) {
            toast.error('Vui lòng nhập nội dung MarkDown');
            return;
        }

        const res = await dispatch(fetchSaveDetailInfoDoctor(dataSave));

        if (res.payload.errCode === 0) {
            if (selectedLanguage === 'vi') {
                toast.success('Thêm mô tả bác sĩ thành công!');
            } else {
                toast.success('Add description successfully!');
            }
        } else {
            if (selectedLanguage === 'vi') {
                toast.success('Thêm mô tả bác sĩ không thành công!');
            } else {
                toast.success('Add description not successfully!');
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
                        Chọn bác sĩ
                    </label>
                    <Select
                        options={doctorOptions}
                        onChange={setDoctorSelected}
                    />
                </div>

                <div className='col-md-8'>
                    <label className='form-label fw-semibold'>
                        Thông tin bác sĩ
                    </label>
                    <textarea
                        className='form-control'
                        rows={8}
                        placeholder='Nhập thông tin mô tả bác sĩ...'
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

            <div className={styles.editorButton}>
                <button onClick={handleSubmit}>
                    <span>Save</span>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 74 74'
                        height={34}
                        width={34}
                    >
                        <circle
                            strokeWidth={3}
                            stroke='black'
                            r='35.5'
                            cy={37}
                            cx={37}
                        />
                        <path
                            fill='black'
                            d='M25 35.5C24.1716 35.5 23.5 36.1716 23.5 37C23.5 37.8284 24.1716 38.5 25 38.5V35.5ZM49.0607 38.0607C49.6464 37.4749 49.6464 36.5251 49.0607 35.9393L39.5147 26.3934C38.9289 25.8076 37.9792 25.8076 37.3934 26.3934C36.8076 26.9792 36.8076 27.9289 37.3934 28.5147L45.8787 37L37.3934 45.4853C36.8076 46.0711 36.8076 47.0208 37.3934 47.6066C37.9792 48.1924 38.9289 48.1924 39.5147 47.6066L49.0607 38.0607ZM25 38.5L48 38.5V35.5L25 35.5V38.5Z'
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
}

export default DoctorManage;
