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

function HomePage() {
    return (
        <>
            <HomeHeader />

            <Banner />
            <SliderCommon title='Chuyên Khoa' data={specialtyList} />
            <SliderCommon title='Cơ Sở Y Tế' data={medicalFacility} />

            <div className={styles.doctorSlider}>
                <DoctorSlider />
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
