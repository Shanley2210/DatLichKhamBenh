import styles from './HomeHeader.module.scss';
import { IoMenu } from 'react-icons/io5';
import logo from '@/assets/icons/logo.svg';
import { FaClockRotateLeft } from 'react-icons/fa6';
import { PiHandshakeFill } from 'react-icons/pi';
import Search from '@components/Search/Search';
import { useState } from 'react';
import cls from 'classnames';

function HomeHeader() {
    const [active, setActive] = useState(0);

    return (
        <div className={styles.homeHeaderContainer}>
            <div className={styles.homeHeaderContent}>
                <div className={styles.leftContent}>
                    <IoMenu />
                    <div className={styles.headerLogo}>
                        <img src={logo} alt='logo' />
                    </div>
                </div>

                <div className={styles.centerContent}>
                    <div
                        onClick={() => setActive(0)}
                        className={cls(styles.childContent, {
                            [styles.isActive]: active === 0
                        })}
                    >
                        Tất cả
                    </div>
                    <div
                        onClick={() => setActive(1)}
                        className={cls(styles.childContent, {
                            [styles.isActive]: active === 1
                        })}
                    >
                        Tại nhà
                    </div>
                    <div
                        onClick={() => setActive(2)}
                        className={cls(styles.childContent, {
                            [styles.isActive]: active === 2
                        })}
                    >
                        Tại viện
                    </div>
                    <div
                        onClick={() => setActive(3)}
                        className={cls(styles.childContent, {
                            [styles.isActive]: active === 3
                        })}
                    >
                        Sống khỏe
                    </div>
                    <div>
                        <Search />
                    </div>
                </div>

                <div className={styles.rightContent}>
                    <div className={styles.childContentRight}>
                        <div>VN</div>
                    </div>
                    
                    <div className={styles.childContentRight}>
                        <div>
                            <PiHandshakeFill />
                        </div>
                        <div>Hợp tác</div>
                    </div>
                    <div className={styles.childContentRight}>
                        <div>
                            <FaClockRotateLeft />
                        </div>
                        <div>Lịch hẹn</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomeHeader;
