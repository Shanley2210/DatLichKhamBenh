import styles from './Header.module.scss';
import { IoMenu } from 'react-icons/io5';
import logo from '@/assets/icons/logo.svg';

function Header() {
    return (
        <div className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <div className={styles.leftContent}>
                    <IoMenu />
                    <div className={styles.headerLogo}>
                        <img src={logo} alt='logo' />
                    </div>
                </div>

                <div className={styles.centerContent}>
                    <div className={styles.childContent}>
                        <div>
                            <strong>Chuyên khoa</strong>
                        </div>
                        <div>Tìm bác sĩ theo chuyên khoa</div>
                    </div>

                    <div className={styles.childContent}>
                        <div>
                            <strong>Cơ sở y tế</strong>
                        </div>
                        <div>Chọn bệnh viện phòng khám</div>
                    </div>

                    <div className={styles.childContent}>
                        <div>
                            <strong>Bác sĩ</strong>
                        </div>
                        <div>Chọn bác sĩ giỏi</div>
                    </div>

                    <div className={styles.childContent}>
                        <div>
                            <strong>Gói khám</strong>
                        </div>
                        <div>Khám sức khỏe tổng quát</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
