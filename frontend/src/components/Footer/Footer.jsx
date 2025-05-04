import styles from './Footer.module.scss';
import { BsEnvelope } from 'react-icons/bs';
import { BsTelephone } from 'react-icons/bs';

function Footer() {
    return (
        <footer className={styles.footer}>
            <p>&copy; 2025 Shanley</p>
            <p>All Rights Reserved</p>
            <p>Design by Shanley</p>
            <p className={styles.contact}>
                <span>
                    <BsTelephone /> Hotline: 1900 123 456
                </span>
                <span>
                    <BsEnvelope /> Email: support@abc.vn
                </span>
            </p>
        </footer>
    );
}

export default Footer;
