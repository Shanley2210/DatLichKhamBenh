import Banner from '@pages/Home/Banner/Banner';
import HomeHeader from '@pages/Home/HomeHeader/HomeHeader';
import SliderCommon from '@pages/Home/SliderCommon/SliderCommon';
import {
    specialtyList,
    medicalFacility,
    spaArticles,
    articles
} from './constants';
import DoctorSlider from '@pages/Home/DoctorSlider/DoctorSlider';
import styles from './Home.module.scss';
import Footer from '@components/Footer/Footer';
import About from '@pages/Home/About/About';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchTopDoctorsHome } from '@stores/doctorSlice';

function HomePage() {
    const dispath = useDispatch();
    const { topDoctorsHome } = useSelector((state) => state.doctor);

    useEffect(() => {
        dispath(fetchTopDoctorsHome(20));
    }, [dispath]);
    return (
        <>
            <HomeHeader />

            <Banner />
            <SliderCommon title='Chuyên Khoa' data={specialtyList} />
            <SliderCommon title='Cơ Sở Y Tế' data={medicalFacility} />

            <div className={styles.doctorSlider}>
                <DoctorSlider data={topDoctorsHome} />
            </div>

            <SliderCommon title='Cẩm Nang' data={spaArticles} />
            <SliderCommon title='Bài Viết Nổi Bật' data={articles} />

            <div className={styles.doctorSlider}>
                <About />
            </div>

            <Footer />
        </>
    );
}

export default HomePage;
