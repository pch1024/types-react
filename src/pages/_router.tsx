import Dashboard from './dashboard';
import Login from './login';
import LingXeReport from './report';
import NotFound from './404';
import EmailWaring from './emailWaring';

export const routes = [
    {
        path: '/Login',
        component: Login,
        title: '登录页',
    },
    {
        path: '/404',
        component: NotFound,
        title: '你迷路了',
    },
];

export const asyncRoutes = [
    {
        key: '/Dashboard',
        name: '控制中心',
        icon: 'dashboard',
        component: Dashboard,
    },
    {
        key: '/AttackAnalysis',
        name: '攻击分析',
        icon: 'pie-chart',
        children: [
            {
                key: '/AttackDetail',
                name: '攻击详情',
                component: NotFound,
            },
            {
                key: '/AttackType',
                name: '攻击类型',
                component: NotFound,
            },
            {
                key: '/AttackFile',
                name: '攻击文件',
                component: NotFound,
            },
            {
                key: '/AttackSource',
                name: '攻击来源',
                component: NotFound,
            },
        ],
    },
    {
        key: '/SuspectFile',
        name: '可疑文件',
        icon: 'file-unknown',
        component: NotFound,
    },
    {
        key: '/PatchManage',
        name: '补丁管理',
        icon: 'file-protect',
        component: NotFound,
    },
    {
        key: '/AppManage',
        name: '应用管理',
        icon: 'appstore',
        children: [
            {
                key: '/AppList',
                name: '应用列表',
                component: NotFound,
            },
            {
                key: '/AppInfo',
                name: '应用信息管理',
                component: NotFound,
            },
        ],
    },
    {
        key: '/LingXeReport',
        name: '灵蜥报告',
        icon: 'fund',
        component: LingXeReport,
    },
    {
        key: '/AccountManage',
        name: '账户管理',
        icon: 'user',
        children: [
            {
                key: '/AccountSetting',
                name: '个人设置',
                children: [
                    {
                        key: '/EditProfile',
                        name: '修改资料',
                        component: NotFound,
                    },
                    {
                        key: '/EditPassword',
                        name: '修改密码',
                        component: NotFound,
                    },
                ],
            },
            {
                key: '/LoginLog',
                name: '登录记录',
                component: NotFound,
            },
        ],
    },
    {
        key: '/SystemSetting',
        name: '系统设置',
        icon: 'setting',
        children: [
            {
                key: '/EarlyWarning',
                name: '预警消息',
                children: [
                    {
                        key: '/EmailWaring',
                        name: '邮件预警',
                        component: EmailWaring,
                    },
                    {
                        key: '/SMSWaring',
                        name: '短信域名',
                        component: NotFound,
                    },
                ],
            },
            {
                key: '/WhiteList',
                name: '白名单',
                component: NotFound,
            },
        ],
    },
    {
        key: '/InstallService',
        name: '安装服务',
        icon: 'tool',
        component: NotFound,
    },
];
