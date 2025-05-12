import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = ({ scrollRef }) => {
    const { pathname } = useLocation();

    useEffect(() => {
        if (scrollRef?.current) {
            scrollRef.current.scrollTop(0);
        }
    }, [pathname]);

    return null;
};

export default ScrollToTop;
