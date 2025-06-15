import { useEffect, useState } from 'react';
import styles from './MedicalExamAddress.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExtraInfoDoctor } from '@stores/doctorSlice';
import { useTranslation } from 'react-i18next';

function MedicalExamAddress({ doctorId }) {
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const { extraInfo } = useSelector((state) => state.doctor);
    const { selectedLanguage } = useSelector((state) => state.language);

    const [detailPrice, setDetailPrice] = useState(false);

    useEffect(() => {
        dispatch(fetchExtraInfoDoctor(doctorId));
    }, [dispatch, doctorId]);

    return (
        <div className={styles.addressContainer}>
            <div className={styles.contentUp}>
                <h3 className={styles.titleAddress}>
                    {t('extraInfo.address')}
                </h3>
                <p className={styles.nameClinic}>{extraInfo?.nameClinic}</p>
                <p className={styles.detaiAddress}>
                    {extraInfo?.addressClinic}
                </p>
            </div>

            <div className={styles.contentDown}>
                {detailPrice ? (
                    <div className={styles.priceDetail}>
                        <h3>{t('extraInfo.price')}</h3>
                        <div className={styles.contentPrice}>
                            <div className={styles.priceDescription}>
                                <p className={styles.titlePrice}>
                                    {t('extraInfo.price')}
                                </p>
                                <p className={styles.note}>{extraInfo?.note}</p>
                            </div>
                            <div className={styles.price}>
                                {selectedLanguage === 'vi'
                                    ? new Intl.NumberFormat('vi-VN', {
                                          style: 'currency',
                                          currency: 'VND'
                                      }).format(
                                          extraInfo?.priceTypeData?.valueVi
                                      )
                                    : new Intl.NumberFormat('en-US', {
                                          style: 'currency',
                                          currency: 'USD'
                                      }).format(
                                          extraInfo?.priceTypeData?.valueEn
                                      )}
                            </div>
                        </div>

                        <div className={styles.contentPayment}>
                            {t('extraInfo.method')}
                            {selectedLanguage === 'vi'
                                ? extraInfo?.paymentTypeData?.valueVi
                                : extraInfo?.paymentTypeData?.valueEn}
                        </div>

                        <span onClick={() => setDetailPrice(false)}>
                            {t('extraInfo.hide')}
                        </span>
                    </div>
                ) : (
                    <div className={styles.priceNoDetail}>
                        <h3>{t('extraInfo.price')}</h3>
                        <p>
                            {selectedLanguage === 'vi'
                                ? new Intl.NumberFormat('vi-VN', {
                                      style: 'currency',
                                      currency: 'VND'
                                  }).format(extraInfo?.priceTypeData?.valueVi)
                                : new Intl.NumberFormat('en-US', {
                                      style: 'currency',
                                      currency: 'USD'
                                  }).format(extraInfo?.priceTypeData?.valueEn)}
                        </p>
                        <span onClick={() => setDetailPrice(true)}>
                            {t('extraInfo.view')}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}

export default MedicalExamAddress;
