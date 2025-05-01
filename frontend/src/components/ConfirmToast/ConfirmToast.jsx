import styles from './ConfirmToast.module.scss';
import React from 'react';

function ConfirmToast({ message = 'Bạn có chắc chắn?', onYes, onNo }) {
    const { confirmToast, messageToast, buttons, btnNo, btnYes } = styles;

    return (
        <div className={confirmToast}>
            <p className={messageToast}>{message}</p>
            <div className={buttons}>
                <button onClick={onNo} className={btnNo}>
                    Không
                </button>
                <button onClick={onYes} className={btnYes}>
                    Có
                </button>
            </div>
        </div>
    );
}

export default ConfirmToast;

//Document

// const showConfirm = () => {
//     toast(
//         <ConfirmToast
//             message='Bạn có muốn xóa mục này?'
//             onYes={() => {
//                 toast.dismiss();
//                 toast.success('Đã xác nhận!');
//             }}
//             onNo={() => {
//                 toast.dismiss();
//                 toast.info('Đã hủy thao tác.');
//             }}
//         />,
//         {
//             position: 'top-center',
//             autoClose: false,
//             closeOnClick: false,
//             closeButton: false
//         }
//     );
// };
