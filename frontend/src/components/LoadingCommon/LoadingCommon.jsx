import styles from './LoadingCommon.module.scss';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

function LoadingText() {
    const { loading } = styles;

    return <AiOutlineLoading3Quarters className={loading} />;
}

export default LoadingText;
