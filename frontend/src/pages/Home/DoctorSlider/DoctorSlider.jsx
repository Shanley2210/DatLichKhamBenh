import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './DoctorSlider.module.scss';
import MainLayout from '@layouts/MainLayout/MainLayout';
import MoreButton from '@components/MoreButton/MoreButton';
import { doctors } from './constants.js';
import { NextArrow, PrevArrow } from '@components/Arrow/Arrow';

function DoctorSlider() {
    const settings = {
        dots: false,
        infinite: true,
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

    return (
        <MainLayout>
            <div className={styles.sliderContainer}>
                <div className={styles.headerTitle}>
                    <div className={styles.title}>Bác Sĩ Nổi Bật</div>
                    <div>
                        <MoreButton />
                    </div>
                </div>
                <Slider {...settings}>
                    {doctors?.map((doctor, index) => (
                        <div key={index} className={styles.slideItem}>
                            <img src={doctor.image} alt={doctor.name} />
                            <p>{doctor.name}</p>
                            <p>{doctor.specialty}</p>
                        </div>
                    ))}
                </Slider>
            </div>
        </MainLayout>
    );
}

export default DoctorSlider;
