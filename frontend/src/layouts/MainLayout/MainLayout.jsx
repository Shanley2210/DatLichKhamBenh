import styles from './MainLayout.module.scss';

function MainLayout({ children }) {
    const { wrapLayout, container } = styles;

    return (
        <main className={wrapLayout}>
            <div className={container}>{children}</div>
        </main>
    );
}

export default MainLayout;
