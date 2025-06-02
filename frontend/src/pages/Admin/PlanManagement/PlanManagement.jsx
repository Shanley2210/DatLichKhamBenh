import { useTranslation } from 'react-i18next';
import styles from './PlanManagement.module.scss';
import cls from 'classnames';
import Select from 'react-select';
import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContext } from '@contexts/ToastProvider';
import {
    fetchAllDoctors,
    fetchMedicalAppointmentPlan,
    fetchScheduleByDate
} from '@stores/doctorSlice';
import DatePicker from 'react-datepicker';
import { vi, enUS } from 'date-fns/locale';
import SaveButton from '@components/SaveButton/SaveButton';
import { fetchTime } from '@stores/adminSlice';
import { startOfDay } from 'date-fns';

function PlanManagement({ roleId, id }) {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const { toast } = useContext(ToastContext);

    const { allDoctors } = useSelector((state) => state.doctor);
    const { selectedLanguage } = useSelector((state) => state.language);
    const { time } = useSelector((state) => state.admin);
    const { schedule } = useSelector((state) => state.doctor);

    const [doctorOptions, setDoctorOptions] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [selectedTimes, setSelectedTimes] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);

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
        setSelectedDoctor(selectedOption);
    };

    const handleDateSelect = (date) => {
        const startOfDayDate = startOfDay(date);
        const timestamp = startOfDayDate.getTime();
        setSelectedDate(timestamp);
    };

    const handleSelectTime = (item) => {
        const isSelected = selectedTimes.some((t) => t.id === item.id);
        if (isSelected) {
            setSelectedTimes(selectedTimes.filter((t) => t.id !== item.id));
        } else {
            setSelectedTimes(
                [...selectedTimes, { id: item.id, timeType: item.key }].sort(
                    (a, b) => {
                        const numA = parseInt(a.timeType.replace('T', ''));
                        const numB = parseInt(b.timeType.replace('T', ''));
                        return numA - numB;
                    }
                )
            );
        }
    };

    const handleSave = async () => {
        if (!selectedDoctor) {
            if (selectedLanguage === 'vi') {
                toast.error('Vui lòng chọn bác sĩ!');
            } else {
                toast.error('Please select a doctor!');
            }
            return;
        } else if (!selectedDate) {
            if (selectedLanguage === 'vi') {
                toast.error('Vui lòng chọn ngày!');
            } else {
                toast.error('Please select a date!');
            }
            return;
        } else if (selectedTimes.length === 0) {
            if (selectedLanguage === 'vi') {
                toast.error('Vui lòng chọn giờ!');
            } else {
                toast.error('Please select a time!');
            }
            return;
        } else {
            const arrPlan = [];
            selectedTimes.map((item) => {
                arrPlan.push({
                    doctorId: selectedDoctor.value,
                    date: selectedDate,
                    time: item.timeType
                });
            });

            const res = await dispatch(fetchMedicalAppointmentPlan(arrPlan));

            if (res.payload.errCode === 0) {
                if (selectedLanguage === 'vi') {
                    toast.success('Thêm lịch khám thành công!');
                } else {
                    toast.success('Add plan successfully!');
                }
            } else {
                if (selectedLanguage === 'vi') {
                    toast.error('Có lỗi khi thêm lịch khám!');
                } else {
                    toast.error('Error when add plan!');
                }
            }
        }
    };

    useEffect(() => {
        dispatch(fetchAllDoctors());
        dispatch(fetchTime());
        dispatch(
            fetchScheduleByDate({
                doctorId: selectedDoctor?.value,
                date: selectedDate
            })
        );
    }, [dispatch, selectedDoctor, selectedDate]);

    useEffect(() => {
        listDoctors();
    }, [allDoctors]);

    useEffect(() => {
        if (schedule && schedule.length > 0) {
            const selectedTimes = schedule.map((item) => ({
                id: item.id,
                timeType: item.timeType
            }));
            setSelectedTimes(selectedTimes);
        }
    }, [schedule]);

    return (
        <div className={styles.planContainer}>
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
                {t('managePlan.title')}
            </div>

            <div className={cls('container')}>
                <div className={cls(styles.content, 'row')}>
                    <div className={cls('col-3')}>
                        <label className={cls('form-label')}>
                            {t('managePlan.selectDoctor')}
                        </label>
                        <Select
                            options={doctorOptions}
                            onChange={handleChangeDoctor}
                            placeholder={t('managePlan.select2')}
                        />
                    </div>
                    <div className={cls(styles.date, 'col-2', 'ms-3')}>
                        <label className={cls('form-label')}>
                            {t('managePlan.selectDate')}:
                        </label>
                        <DatePicker
                            selected={startDate}
                            onSelect={handleDateSelect}
                            onChange={(date) => setStartDate(date)}
                            dateFormat='dd/MM/yyyy'
                            locale={selectedLanguage === 'vi' ? vi : enUS}
                            className={cls('form-control')}
                            minDate={new Date()}
                        />
                    </div>
                    <div className={cls(styles.pickHour)}>
                        {time.map((item) => {
                            const isSelected = selectedTimes.some(
                                (t) => t.timeType === item.key
                            );
                            return (
                                <button
                                    key={item.id}
                                    className={cls(styles.buttonTime, {
                                        [styles.active]: isSelected
                                    })}
                                    onClick={() => {
                                        handleSelectTime(item);
                                    }}
                                >
                                    {selectedLanguage === 'vi'
                                        ? item.valueVi
                                        : item.valueEn}
                                </button>
                            );
                        })}
                    </div>

                    <SaveButton
                        title={t('managePlan.save')}
                        click={handleSave}
                    />
                </div>
            </div>
        </div>
    );
}

export default PlanManagement;
