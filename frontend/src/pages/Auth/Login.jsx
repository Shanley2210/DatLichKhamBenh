import { useContext, useState } from 'react';
import styles from './Auth.module.scss';
import { FaFacebook } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ToastContext } from '@contexts/ToastProvider';
import { handleLogin } from '@services/authService';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';
import LoadingCommon from '@components/LoadingCommon/LoadingCommon';

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

    const { t } = useTranslation();
    const navigate = useNavigate();

    const { toast } = useContext(ToastContext);

    const [isLoading, setIsLoading] = useState(false);

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

            setIsLoading(true);
            await handleLogin({ email, password })
                .then((res) => {
                    if (res.data.errCode !== 0) {
                        toast.error(res.data.errMessage);
                    } else {
                        toast.success(res.data.message);

                        Cookies.set('token', res.data.token, {
                            expires: 1
                        });
                        Cookies.set('refreshToken', res.data.refreshToken, {
                            expires: 7
                        });

                        if (res.data.userData.roleId === 'R1') {
                            navigate('/admin');
                        }
                    }
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
    });

    return (
        <div className={loginBackground}>
            <div className={loginContainer}>
                <div className={loginContent}>
                    <p className={title}>{t('login.title')}</p>

                    <form noValidate className={form} onSubmit={handleSubmit}>
                        <input
                            type='email'
                            className={input}
                            placeholder={t('login.email')}
                            autoComplete='current-password'
                            id='email'
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.email}
                        />

                        <input
                            type='password'
                            className={input}
                            placeholder={t('login.password')}
                            autoComplete='current-password'
                            id='password'
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.password}
                        />

                        <p className={pageLink}>
                            <span className={pageLinkLabel}>
                                {t('login.forgot')}
                            </span>
                        </p>
                        <button className={formBtn} type='submit'>
                            {isLoading ? <LoadingCommon /> : t('login.login')}
                        </button>
                    </form>
                    <p className={signUpLabel}>
                        {t('login.noaccount')}
                        <span className={signUpLink}>
                            {t('login.register')}
                        </span>
                    </p>
                    <div className={buttonsContainer}>
                        <div className={fbLoginButton}>
                            <FaFacebook />
                            <span>{t('login.facebook')}</span>
                        </div>
                        <div className={googleLoginButton}>
                            <FcGoogle />
                            <span>{t('login.google')}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
