import styles from './MoreButton.module.scss';

function MoreButton() {
    const { container } = styles;
    return (
        <div className={container}>
            <button>
                <span>Xem thêm</span>
            </button>
        </div>
    );
}

export default MoreButton;
