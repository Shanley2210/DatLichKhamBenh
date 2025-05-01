import styles from './Search.module.scss';
import { CiSearch } from 'react-icons/ci';

function Search() {
    return (
        <div className={styles.customInput}>
            <CiSearch />

            <input
                placeholder='Search...'
                type='text'
                className={styles.input}
            />
        </div>
    );
}

export default Search;
