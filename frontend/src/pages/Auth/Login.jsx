import { useContext, useState } from 'react';
import styles from './Auth.module.scss';
import { FaFacebook } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ToastContext } from '@contexts/ToastProvider';
import { handleLogin } from '@services/authService';
import { useNavigate } from 'react-router-dom';

function Login() {
    const {
        loginBackground,
        loginContainer,
        loginContent,
        title,
        form,
        input,
        pageLinkLabel,
        pageLink,
        formBtn,
        signUpLink,
        signUpLabel,
        buttonsContainer,
        fbLoginButton,
        googleLoginButton
    } = styles;

    const navigate = useNavigate();

    const { toast } = useContext(ToastContext);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errors = await formik.validateForm();
        if (Object.keys(errors).length > 0) {
            Object.values(errors).forEach((errMsg) => {
                toast.error(errMsg, 'error');
            });
            return;
        }

        formik.handleSubmit();
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid email address')
                .required('Email is required'),
            password: Yup.string()
                .min(6, 'Password must be at least 6 characters')
                .required('Password is required')
        }),

        onSubmit: async (values) => {
            const { email, password } = values;

            await handleLogin({ email, password })
                .then((res) => {
                    if (res.userData.roleId === 'R1') {
                        navigate('/admin');
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    });

    return (
        <div className={loginBackground}>
            <div className={loginContainer}>
                <div className={loginContent}>
                    <p className={title}>LOGIN</p>

                    <form noValidate className={form} onSubmit={handleSubmit}>
                        <input
                            type='email'
                            className={input}
                            placeholder='Email'
                            autoComplete='current-password'
                            id='email'
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.email}
                        />

                        <input
                            type='password'
                            className={input}
                            placeholder='Password'
                            autoComplete='current-password'
                            id='password'
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.password}
                        />

                        <p className={pageLink}>
                            <span className={pageLinkLabel}>
                                Forgot Password?
                            </span>
                        </p>
                        <button className={formBtn} type='submit'>
                            Log in
                        </button>
                    </form>
                    <p className={signUpLabel}>
                        Don't have an account?
                        <span className={signUpLink}>Sign up</span>
                    </p>
                    <div className={buttonsContainer}>
                        <div className={fbLoginButton}>
                            <FaFacebook />
                            <span> Log in with Facebook</span>
                        </div>
                        <div className={googleLoginButton}>
                            <FcGoogle />
                            <span>Log in with Google</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
