import ComprehensiveService from '@components/ComprehensiveService/ComprehensiveService';
import styles from './Banner.module.scss';
import { dataCService } from './constants';

function Banner() {
    return (
        <div className={styles.bannerContainer}>
            <div className={styles.title1}>NỀN TẢNG Y TẾ</div>
            <div className={styles.title2}>CHĂM SÓC SỨC KHỎE TOÀN DIỆN</div>
            <div className={styles.options}>
                <div className={styles.optionLeft}>
                    {dataCService.slice(0, 5).map((item, index) => (
                        <ComprehensiveService
                            key={index}
                            icon={item.icon}
                            title={item.title}
                        />
                    ))}
                </div>
                <div className={styles.optionRight}>
                    {dataCService.slice(5, 10).map((item, index) => (
                        <ComprehensiveService
                            key={index}
                            icon={item.icon}
                            title={item.title}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Banner;
