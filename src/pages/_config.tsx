import Register from './register';
import Dashboard from './dashboard';
import Login from './login';
import Report from './report';

export const routes = [
    {
        path: '/Login',
        component: Login,
        title: '登录页',
    },
    {
        path: '/Register',
        component: Register,
        title: '注册页',
    },
];

export const asyncRoutes = [
    {
        path: '/Dashboard',
        component: Dashboard,
        title: '控制台',
    },
    {
        path: '/LingXeReport',
        component: Report,
        title: '灵蜥报告',
    },
];
