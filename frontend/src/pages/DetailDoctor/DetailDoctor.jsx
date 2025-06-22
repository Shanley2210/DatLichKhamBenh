import Header from '@components/Header/Header';
import styles from './DetailDoctor.module.scss';
import Footer from '@components/Footer/Footer';
import MainLayout from '@layouts/MainLayout/MainLayout';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchDetailInfoDoctor } from '@stores/doctorSlice';
import Schedule from '@components/Schedule/Schedule';
import { useTranslation } from 'react-i18next';
import MedicalExamAddress from '@components/MedicalExamAddress/MedicalExamAddress';
import ProfileDoctor from '@components/ProfileDoctor/ProfileDoctor';

function DetailDoctor() {
    const { id } = useParams();
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { detailInfo } = useSelector((state) => state.doctor);

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
                        <ProfileDoctor doctorId={id} />

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
