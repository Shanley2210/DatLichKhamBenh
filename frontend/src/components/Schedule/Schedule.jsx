import { useTranslation } from 'react-i18next';
import styles from './Schedule.module.scss';
import { addDays, format, startOfDay } from 'date-fns';
import { vi, enGB } from 'date-fns/locale';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchScheduleByDate } from '@stores/doctorSlice';
import { FaRegCalendarAlt } from 'react-icons/fa';

function Schedule({ doctorId }) {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const { selectedLanguage } = useSelector((state) => state.language);
    const { schedule } = useSelector((state) => state.doctor);

    const [locale, setLocale] = useState(selectedLanguage === 'vi' ? vi : enGB);
    const [date, setDate] = useState(() => startOfDay(new Date()).getTime());

    useEffect(() => {
        setLocale(selectedLanguage === 'vi' ? vi : enGB);
    }, [selectedLanguage]);

    const arrDays = [];
    for (let i = 0; i < 7; i++) {
        const date = addDays(new Date(), i);
        const startOfDayDate = startOfDay(date);
        arrDays.push({
            label: format(startOfDayDate, 'eeee - dd/MM', {
                locale: selectedLanguage === 'vi' ? vi : enGB
            }),
            value: startOfDayDate.getTime()
        });
    }

    const handleOnChangeSelect = async (e) => {
        setDate(e.target.value);
    };

    useEffect(() => {
        if (doctorId) {
            dispatch(fetchScheduleByDate({ doctorId, date }));
        }
    }, [dispatch, doctorId, date]);

    console.log(schedule);

    return (
        <div className={styles.scheduleContainer}>
            <div className={styles.selectDay}>
                <select onChange={(e) => handleOnChangeSelect(e)}>
                    {arrDays &&
                        arrDays.length > 0 &&
                        arrDays.map((item, index) => (
                            <option key={index} value={item.value}>
                                {item.label}
                            </option>
                        ))}
                </select>
            </div>

            <div className={styles.allTimes}>
                <div className={styles.timeText}>
                    <span>
                        <FaRegCalendarAlt /> Lịch Khám
                    </span>
                </div>
                <div className={styles.timesContent}>
                    {schedule && schedule.length > 0 ? (
                        schedule.map((item, index) => {
                            return (
                                <button key={index}>
                                    {selectedLanguage === 'vi'
                                        ? item.timeTypeData.valueVi
                                        : item.timeTypeData.valueEn}
                                </button>
                            );
                        })
                    ) : (
                        <div>Không có lịch hẹn trong thời gian này</div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Schedule;
