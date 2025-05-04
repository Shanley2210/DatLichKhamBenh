import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

export const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div className={className} style={{ ...style }} onClick={onClick}>
            <IoIosArrowForward size={30} />
        </div>
    );
};

export const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div className={className} style={{ ...style }} onClick={onClick}>
            <IoIosArrowBack size={30} />
        </div>
    );
};
