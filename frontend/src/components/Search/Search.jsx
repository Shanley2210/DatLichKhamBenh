import styles from './Search.module.scss';
import { CiSearch } from 'react-icons/ci';

function Search({ placeholder }) {
    return (
        <div className={styles.customInput}>
            <CiSearch />

            <input
                placeholder={placeholder}
                type='text'
                className={styles.input}
            />
        </div>
    );
}

export default Search;
