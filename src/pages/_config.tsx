import Register from './register';
import Home from './home';
import Login from './login';

export const routes = [
    {
        path: '/login',
        component: Login,
        title: '登录页',
    },
    {
        path: '/register',
        component: Register,
        title: '注册页',
    },
];

export const asyncRoutes = [
    {
        path: '/dashboard',
        component: Home,
        title: '控制台',
    },
    {
        path: '/user',
        component: Home,
        title: '用户中心',
    },
];
