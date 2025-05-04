import MainLayout from '@layouts/MainLayout/MainLayout';
import styles from './About.module.scss';
import { useEffect, useRef } from 'react';

function About() {
    const iframeRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    const iframe = document.createElement('iframe');
                    iframe.src =
                        'https://www.youtube-nocookie.com/embed/Jm022aqDGsA';
                    iframe.width = '100%';
                    iframe.height = '100%';
                    iframe.title = 'Best Nightcore Gaming Mix 2022';
                    iframe.frameBorder = '0';
                    iframe.allow =
                        'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
                    iframe.referrerPolicy = 'strict-origin-when-cross-origin';
                    iframe.allowFullScreen = true;
                    iframeRef.current.appendChild(iframe);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (iframeRef.current) {
            observer.observe(iframeRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <MainLayout>
            <div className={styles.containerAbout}>
                <div className={styles.titleAbout}>
                    Giới thiệu về BookingCare NTH
                </div>
                <div className={styles.contentAbout}>
                    <div className={styles.contentLeft} ref={iframeRef}></div>
                    <p className={styles.contentRight}>
                        BookingCareNTH là nền tảng đặt lịch khám bệnh trực
                        tuyến, giúp kết nối người dùng với các cơ sở y tế uy tín
                        và đội ngũ bác sĩ chuyên môn cao. <br /> <br /> Chúng
                        tôi mang đến trải nghiệm chăm sóc sức khỏe tiện lợi,
                        minh bạch và hiện đại, giúp người bệnh dễ dàng tra cứu
                        thông tin, lựa chọn bác sĩ phù hợp và đặt lịch khám
                        nhanh chóng chỉ với vài thao tác.
                    </p>
                </div>
            </div>
        </MainLayout>
    );
}

export default About;
