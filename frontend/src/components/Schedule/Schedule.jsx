import { useTranslation } from 'react-i18next';
import styles from './Schedule.module.scss';
import { addDays, format, startOfDay } from 'date-fns';
import { vi, enGB } from 'date-fns/locale';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchScheduleByDate } from '@stores/doctorSlice';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { FaRegHandPointUp } from 'react-icons/fa';
import ModalBooking from '@containers/DetailDoctor/ModalBooking';

function Schedule({ doctorId }) {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const { selectedLanguage } = useSelector((state) => state.language);
    const { schedule } = useSelector((state) => state.doctor);

    const [locale, setLocale] = useState(selectedLanguage === 'vi' ? vi : enGB);
    const [date, setDate] = useState(() => startOfDay(new Date()).getTime());
    const [showModal, setShowModal] = useState(false);
    const [dataTimeSchedule, setDataTimeSchedule] = useState([]);

    useEffect(() => {
        setLocale(selectedLanguage === 'vi' ? vi : enGB);
    }, [selectedLanguage]);

    const arrDays = [];
    for (let i = 0; i < 7; i++) {
        const dateObj = addDays(new Date(), i);
        const startOfDayDate = startOfDay(dateObj);
        const dateLabel =
            i === 0
                ? `${
                      selectedLanguage === 'vi' ? 'Hôm nay' : 'Today'
                  } - ${format(startOfDayDate, 'dd/MM')}`
                : format(startOfDayDate, 'eeee - dd/MM', {
                      locale: selectedLanguage === 'vi' ? vi : enGB
                  });

        arrDays.push({
            label: dateLabel,
            value: startOfDayDate.getTime()
        });
    }

    const handleOnChangeSelect = async (e) => {
        setDate(e.target.value);
    };

    const handleBooking = (item) => {
        setShowModal(true);
        setDataTimeSchedule(item);
    };

    useEffect(() => {
        if (doctorId) {
            dispatch(fetchScheduleByDate({ doctorId, date }));
        }
    }, [dispatch, doctorId, date]);

    return (
        <>
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
                            <FaRegCalendarAlt /> {t('detaiDoctor.appointment')}
                        </span>
                    </div>

                    <div className={styles.timesContent}>
                        {schedule && schedule.length > 0 ? (
                            schedule.map((item, index) => {
                                return (
                                    <button
                                        key={index}
                                        onClick={() => handleBooking(item)}
                                    >
                                        {selectedLanguage === 'vi'
                                            ? item.timeTypeData.valueVi
                                            : item.timeTypeData.valueEn}
                                    </button>
                                );
                            })
                        ) : (
                            <div className={styles.noAppointment}>
                                {t('detaiDoctor.noAppointment')}
                            </div>
                        )}
                    </div>

                    <div className={styles.textNotes}>
                        {t('detaiDoctor.choose')} <FaRegHandPointUp />{' '}
                        {t('detaiDoctor.chooseDoctor')}
                    </div>
                </div>
            </div>

            <ModalBooking
                show={showModal}
                setShow={setShowModal}
                dataTime={dataTimeSchedule}
            />
        </>
    );
}

export default Schedule;
