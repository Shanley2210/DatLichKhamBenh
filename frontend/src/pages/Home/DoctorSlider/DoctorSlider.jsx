import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './DoctorSlider.module.scss';
import MainLayout from '@layouts/MainLayout/MainLayout';
import MoreButton from '@components/MoreButton/MoreButton';
import { NextArrow, PrevArrow } from '@components/Arrow/Arrow';
import { bufferToBase64Url } from '@utils/commonUtils';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

function DoctorSlider({ data }) {
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        arrows: true,
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    const dispath = useDispatch();
    const { t } = useTranslation();
    const navigate = useNavigate();

    const { selectedLanguage } = useSelector((state) => state.language);

    return (
        <MainLayout>
            <div className={styles.sliderContainer}>
                <div className={styles.headerTitle}>
                    <div className={styles.title}>{t('homePage.doctor')}</div>
                    <div>
                        <MoreButton />
                    </div>
                </div>
                <Slider {...settings}>
                    {data &&
                        data.length > 0 &&
                        data?.map((doctor) => (
                            <div
                                key={doctor.id}
                                className={styles.slideItem}
                                onClick={() =>
                                    navigate(`/detail-doctor/${doctor.id}`)
                                }
                            >
                                <img
                                    src={bufferToBase64Url(doctor.image)}
                                    alt={
                                        doctor.firstName + ' ' + doctor.lastName
                                    }
                                />
                                <p>
                                    {selectedLanguage === 'vi'
                                        ? doctor.positionData.valueVi + ' - '
                                        : doctor.positionData.valueEn + ' - '}
                                    {doctor.firstName + ' ' + doctor.lastName}
                                </p>
                                <p>Cơ xương khớp</p>
                            </div>
                        ))}
                </Slider>
            </div>
        </MainLayout>
    );
}

export default DoctorSlider;
