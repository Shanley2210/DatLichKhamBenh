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
import { fetchMethods, fetchPrices, fetchProvinces } from '@stores/adminSlice';

function DoctorManage() {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const { toast } = useContext(ToastContext);

    const { allDoctors } = useSelector((state) => state.doctor);
    const { selectedLanguage } = useSelector((state) => state.language);
    const { prices } = useSelector((state) => state.admin);
    const { payments } = useSelector((state) => state.admin);
    const { provinces } = useSelector((state) => state.admin);

    const [doctorDesc, setDoctorDesc] = useState('');
    const [contentMarkDown, setContentMarkDown] = useState('');
    const [contentHTML, setContentHTML] = useState('');
    const [isUpdate, setIsUpdate] = useState(false);
    const [doctorOptions, setDoctorOptions] = useState([]);
    const [options, setOptions] = useState({
        price: [],
        payment: [],
        province: []
    });

    const [doctorSelected, setDoctorSelected] = useState(null);
    const [selects, setSelects] = useState({
        price: null,
        payment: null,
        province: null
    });
    const [clinicName, setClinicName] = useState('');
    const [clinicAddress, setClinicAddress] = useState('');
    const [note, setNote] = useState('');

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
                const markdown = res.payload.markdownData;
                const info = res.payload.doctorInfoData;
                if (markdown || info) {
                    setContentMarkDown(markdown.contentMarkdown || '');
                    setDoctorDesc(markdown.description || '');
                    setContentHTML(markdown.contentHTML || '');

                    setClinicName(info.nameClinic || '');
                    setClinicAddress(info.addressClinic || '');
                    setNote(info.note || '');
                    setSelects({
                        price: options.price.find(
                            (p) => p.value === info.priceTypeData.key
                        ),
                        payment: options.payment.find(
                            (p) => p.value === info.paymentTypeData.key
                        ),
                        province: options.province.find(
                            (p) => p.value === info.provinceTypeData.key
                        )
                    });
                    setIsUpdate(true);
                } else {
                    setContentMarkDown('');
                    setDoctorDesc('');
                    setContentHTML('');
                    setIsUpdate(false);

                    setClinicName('');
                    setClinicAddress('');
                    setNote('');
                    setSelects({
                        price: null,
                        payment: null,
                        province: null
                    });
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
                action: 'CREATE',

                selectedPrice: selects.price ? selects.price.value : null,
                selectedPayment: selects.payment ? selects.payment.value : null,
                selectedProvince: selects.province
                    ? selects.province.value
                    : null,
                nameClinic: clinicName,
                addressClinic: clinicAddress,
                note: note
            };

            if (
                !dataSave.doctorId ||
                !dataSave.description ||
                !dataSave.contentHTML ||
                !dataSave.contentMarkdown ||
                !dataSave.selectedPrice ||
                !dataSave.selectedPayment ||
                !dataSave.selectedProvince ||
                !dataSave.nameClinic ||
                !dataSave.addressClinic ||
                !dataSave.note
            ) {
                if (selectedLanguage === 'vi') {
                    toast.error('Vui lòng điền đầy đủ thông tin');
                } else {
                    toast.error('Please fill in all information');
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
                        if (isUpdate) toast.error('Lỗi khi sửa mô tả bác sĩ!');
                        else toast.error('Lỗi khi thêm mô tả bác sĩ!');
                    } else {
                        if (isUpdate)
                            toast.error('Error when update description!');
                        else toast.error('Error when add description!');
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
                action: 'EDIT',

                selectedPrice: selects.price ? selects.price.value : null,
                selectedPayment: selects.payment ? selects.payment.value : null,
                selectedProvince: selects.province
                    ? selects.province.value
                    : null,
                nameClinic: clinicName,
                addressClinic: clinicAddress,
                note: note
            };

            if (
                !dataUpdate.doctorId ||
                !dataUpdate.description ||
                !dataUpdate.contentHTML ||
                !dataUpdate.contentMarkdown ||
                !dataUpdate.selectedPrice ||
                !dataUpdate.selectedPayment ||
                !dataUpdate.selectedProvince ||
                !dataUpdate.nameClinic ||
                !dataUpdate.addressClinic ||
                !dataUpdate.note
            ) {
                if (selectedLanguage === 'vi') {
                    toast.error('Vui lòng điền đầy đủ thông tin');
                } else {
                    toast.error('Please fill in all information');
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
                        toast.error('Lỗi khi sửa mô tả bác sĩ!');
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
        dispatch(fetchPrices());
        dispatch(fetchMethods());
        dispatch(fetchProvinces());
    }, [dispatch]);

    useEffect(() => {
        listDoctors();
    }, [allDoctors]);

    useEffect(() => {
        if (prices.length > 0 && payments.length > 0 && provinces.length > 0) {
            setOptions({
                price: prices.map((p) => ({
                    label:
                        selectedLanguage === 'vi'
                            ? p.valueVi + ' VND'
                            : p.valueEn + ' USD',
                    value: p.key
                })),
                payment: payments.map((p) => ({
                    label: selectedLanguage === 'vi' ? p.valueVi : p.valueEn,
                    value: p.key
                })),
                province: provinces.map((p) => ({
                    label: selectedLanguage === 'vi' ? p.valueVi : p.valueEn,
                    value: p.key
                }))
            });
        }
    }, [prices, payments, provinces, selectedLanguage]);

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

            <div className='row g-4 mt-3'>
                <div className='col-md-4'>
                    <label className='form-label fw-semibold'>
                        {t('manageDoctor.price')}
                    </label>
                    <Select
                        options={options.price}
                        value={selects.price}
                        onChange={(selected) =>
                            setSelects((prev) => ({ ...prev, price: selected }))
                        }
                        placeholder={t('manageDoctor.price2')}
                    />
                </div>

                <div className='col-md-4'>
                    <label className='form-label fw-semibold'>
                        {t('manageDoctor.methodPayment')}
                    </label>
                    <Select
                        options={options.payment}
                        value={selects.payment}
                        onChange={(selected) =>
                            setSelects((prev) => ({
                                ...prev,
                                payment: selected
                            }))
                        }
                        placeholder={t('manageDoctor.methodPayment2')}
                    />
                </div>

                <div className='col-md-4'>
                    <label className='form-label fw-semibold'>
                        {t('manageDoctor.province')}
                    </label>
                    <Select
                        options={options.province}
                        value={selects.province}
                        onChange={(selected) =>
                            setSelects((prev) => ({
                                ...prev,
                                province: selected
                            }))
                        }
                        placeholder={t('manageDoctor.province2')}
                    />
                </div>

                <div className='col-md-4'>
                    <label className='form-label fw-semibold'>
                        {t('manageDoctor.clinicName')}
                    </label>
                    <input
                        type='text'
                        className='form-control'
                        placeholder={t('manageDoctor.clinicName2')}
                        value={clinicName}
                        onChange={(e) => setClinicName(e.target.value)}
                    />
                </div>

                <div className='col-md-8'>
                    <label className='form-label fw-semibold'>
                        {t('manageDoctor.clinicAddress')}
                    </label>
                    <input
                        type='text'
                        className='form-control'
                        placeholder={t('manageDoctor.clinicAddress2')}
                        value={clinicAddress}
                        onChange={(e) => setClinicAddress(e.target.value)}
                    />
                </div>

                <div className='col-md-8'>
                    <label className='form-label fw-semibold'>
                        {t('manageDoctor.note')}
                    </label>
                    <textarea
                        className='form-control'
                        rows={8}
                        placeholder={t('manageDoctor.note2')}
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                    ></textarea>
                </div>
            </div>

            <div className='mt-4'>
                <label className='form-label fw-semibold'>
                    {t('manageDoctor.delInfo')}
                </label>
                <Editor
                    contentMarkDown={contentMarkDown}
                    contentHTML={contentHTML}
                    setContentHTML={setContentHTML}
                    setContentMarkDown={setContentMarkDown}
                />
            </div>

            <SaveButton
                click={handleSubmit}
                title={
                    isUpdate ? t('manageDoctor.edit') : t('manageDoctor.save')
                }
            />
        </div>
    );
}

export default DoctorManage;
