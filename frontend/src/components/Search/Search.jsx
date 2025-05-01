import styles from './Search.module.scss';
import { CiSearch } from 'react-icons/ci';

function Search() {
    return (
        <div className={styles.customInput}>
            <CiSearch />

            <input
                placeholder='Placeholder Text'
                type='text'
                className={styles.input}
            />
        </div>
    );
}

export default Search;
