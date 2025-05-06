import styles from './LoadingCommon.module.scss';

function LoadingCommon() {
    return (
        <div className={styles.loadingContainer}>
            <svg viewBox='25 25 50 50'>
                <circle r={20} cy={50} cx={50} />
            </svg>
        </div>
    );
}

export default LoadingCommon;
