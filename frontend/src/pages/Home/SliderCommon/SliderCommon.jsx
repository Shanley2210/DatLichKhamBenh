import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './SliderCommon.module.scss';
import { IoIosArrowBack } from 'react-icons/io';
import { IoIosArrowForward } from 'react-icons/io';
import MainLayout from '@layouts/MainLayout/MainLayout';

function SliderCommon({ title, data }) {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        arrows: true,
        prevArrow: <IoIosArrowBack />,
        nextArrow: <IoIosArrowForward />,
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
                <div className={styles.title}>{title}</div>
                <Slider {...settings}>
                    {data?.map((value, index) => (
                        <div key={index} className={styles.slideItem}>
                            <img src={value.image} alt='Cơ xương khớp' />
                            <p>{value.description}</p>
                        </div>
                    ))}
                </Slider>
            </div>
        </MainLayout>
    );
}

export default SliderCommon;
