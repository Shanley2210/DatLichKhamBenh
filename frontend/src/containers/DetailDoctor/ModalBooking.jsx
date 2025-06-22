import styles from './DetailDoctor.module.scss';
import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import cls from 'classnames';
import ProfileDoctor from '@components/ProfileDoctor/ProfileDoctor';

function ModalBooking({ show, setShow, dataTime }) {
    const doctorId = dataTime?.doctorId;

    console.log(dataTime);

    return (
        <>
            <Modal size='lg' show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Đặt lịch khám</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={styles.bookingContainer}>
                        <ProfileDoctor doctorId={doctorId} booking={true} />

                        <div className={cls('row')}>
                            <div className={cls('col-6', 'form-group')}>
                                <label>Họ và tên</label>
                                <input
                                    type='text'
                                    className={cls('form-control')}
                                />
                            </div>
                            <div className={cls('col-6', 'form-group')}>
                                <label>Số điện thoại</label>
                                <input
                                    type='text'
                                    className={cls('form-control')}
                                />
                            </div>

                            <div className={cls('col-6', 'form-group')}>
                                <label>Địa chỉ Email</label>
                                <input
                                    type='text'
                                    className={cls('form-control')}
                                />
                            </div>
                            <div className={cls('col-6', 'form-group')}>
                                <label>Địa chỉ liên hệ</label>
                                <input
                                    type='text'
                                    className={cls('form-control')}
                                />
                            </div>

                            <div className={cls('col-6', 'form-group')}>
                                <label>Đặt cho ai</label>
                                <input
                                    type='text'
                                    className={cls('form-control')}
                                />
                            </div>
                            <div className={cls('col-6', 'form-group')}>
                                <label>Giới tính</label>
                                <input
                                    type='text'
                                    className={cls('form-control')}
                                />
                            </div>

                            <div className={cls('col-12', 'form-group')}>
                                <label>Lý do khám</label>
                                <input
                                    type='text'
                                    className={cls('form-control')}
                                />
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={() => setShow(false)}>
                        Close
                    </Button>
                    <Button variant='primary'>Save Changes</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalBooking;
