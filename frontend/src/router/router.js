import { lazy } from 'react';

const routers = [
    {
        path: '/',
        component: lazy(() => import('@pages/Home/Home'))
    },
    {
        path: '/detail-doctor/:id',
        component: lazy(() => import('@pages/DetailDoctor/DetailDoctor'))
    },

    {
        path: '/auth/login',
        component: lazy(() => import('@pages/Auth/Login'))
    },

    {
        path: '/admin',
        component: lazy(() => import('@pages/Admin/Admin'))
    }
];

export default routers;
