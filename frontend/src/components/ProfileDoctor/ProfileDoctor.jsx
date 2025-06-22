import { useDispatch, useSelector } from 'react-redux';
import styles from './ProfileDoctor.module.scss';
import { bufferToBase64Url } from '@utils/commonUtils';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { fetchProfileDoctor } from '@stores/doctorSlice';

function ProfileDoctor({ doctorId, booking = false }) {
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const { profileDoctor } = useSelector((state) => state.doctor);
    const { selectedLanguage } = useSelector((state) => state.language);

    console.log('ProfileDoctor', profileDoctor);

    useEffect(() => {
        dispatch(fetchProfileDoctor(doctorId));
    }, [dispatch, doctorId]);
    return (
        <>
            <div className={styles.doctorInfo}>
                <div className={styles.avatar}>
                    <img
                        src={
                            profileDoctor?.image &&
                            bufferToBase64Url(profileDoctor?.image)
                        }
                        alt=''
                    />
                </div>

                <div className={styles.doctorDescription}>
                    <h3>
                        {selectedLanguage === 'vi'
                            ? profileDoctor?.positionData?.valueVi + ' - '
                            : profileDoctor?.positionData?.valueEn + ' - '}
                        {profileDoctor?.firstName +
                            ' ' +
                            profileDoctor?.lastName}
                    </h3>
                    <p
                        dangerouslySetInnerHTML={{
                            __html:
                                (
                                    profileDoctor?.markdownData?.description ||
                                    ''
                                ).replace(/\n/g, '<br />') ||
                                t('detaiDoctor.noloading')
                        }}
                    ></p>
                </div>
            </div>

            {booking && (
                <div className={styles.price}>
                    Giá khám:{' '}
                    <span>
                        {selectedLanguage === 'vi'
                            ? profileDoctor?.doctorInfoData?.priceTypeData
                                  ?.valueVi + ' VND'
                            : profileDoctor?.doctorInfoData?.priceTypeData
                                  ?.valueEn + ' $'}
                    </span>
                </div>
            )}
        </>
    );
}

export default ProfileDoctor;
