import styles from './ComprehensiveService.module.scss';

function ComprehensiveService({ icon, title }) {
    return (
        <div className={styles.container}>
            <div className={styles.icon}>
                <img src={icon} alt={title} />
            </div>
            <div className={styles.title}>{title}</div>
        </div>
    );
}

export default ComprehensiveService;
