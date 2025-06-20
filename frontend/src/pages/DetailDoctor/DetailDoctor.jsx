import Header from '@components/Header/Header';
import styles from './DetailDoctor.module.scss';
import Footer from '@components/Footer/Footer';
import cls from 'classnames';
import MainLayout from '@layouts/MainLayout/MainLayout';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchDetailInfoDoctor } from '@stores/doctorSlice';
import { bufferToBase64Url } from '@utils/commonUtils';
import Schedule from '@components/Schedule/Schedule';
import { useTranslation } from 'react-i18next';
import MedicalExamAddress from '@components/MedicalExamAddress/MedicalExamAddress';

function DetailDoctor() {
    const { id } = useParams();
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { detailInfo } = useSelector((state) => state.doctor);
    const { selectedLanguage } = useSelector((state) => state.language);

    useEffect(() => {
        dispatch(fetchDetailInfoDoctor(id));
    }, [dispatch, id]);

    return (
        <>
            <Header />
            <div className={styles.containerDetail}>
                <MainLayout>
                    <div className={styles.navigatation}>
                        <p>navigate</p>
                    </div>

                    <div className={styles.content}>
                        <div className={styles.doctorInfo}>
                            <div className={styles.avatar}>
                                <img
                                    src={
                                        detailInfo?.image &&
                                        bufferToBase64Url(detailInfo?.image)
                                    }
                                    alt=''
                                />
                            </div>

                            <div className={styles.doctorDescription}>
                                <h3>
                                    {selectedLanguage === 'vi'
                                        ? detailInfo?.positionData.valueVi +
                                          ' - '
                                        : detailInfo?.positionData.valueEn +
                                          ' - '}
                                    {detailInfo?.firstName +
                                        ' ' +
                                        detailInfo?.lastName}
                                </h3>
                                <p
                                    dangerouslySetInnerHTML={{
                                        __html:
                                            (
                                                detailInfo?.markdownData
                                                    ?.description || ''
                                            ).replace(/\n/g, '<br />') ||
                                            t('detaiDoctor.noloading')
                                    }}
                                ></p>
                            </div>
                        </div>

                        <div className={styles.contentSchedule}>
                            <Schedule doctorId={id} />
                            <MedicalExamAddress doctorId={id} />
                        </div>

                        <div className={styles.doctorSchedule}>
                            <p
                                dangerouslySetInnerHTML={{
                                    __html:
                                        detailInfo?.markdownData?.contentHTML ||
                                        t(`detaiDoctor.noloading`)
                                }}
                            ></p>
                        </div>
                    </div>
                </MainLayout>
            </div>
            <Footer />
        </>
    );
}

export default DetailDoctor;
