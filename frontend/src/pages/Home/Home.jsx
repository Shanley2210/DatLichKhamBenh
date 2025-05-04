import Banner from '@pages/Home/Banner/Banner';
import HomeHeader from '@pages/Home/HomeHeader/HomeHeader';
import SliderCommon from '@pages/Home/SliderCommon/SliderCommon';
import { specialtyList } from './chuyenkhoa-contants';

function HomePage() {
    return (
        <>
            <HomeHeader />
            <Banner />
            <SliderCommon title='Chuyên Khoa' data={specialtyList} />
        </>
    );
}

export default HomePage;
