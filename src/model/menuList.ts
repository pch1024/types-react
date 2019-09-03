export default [
    {
        key: '/Dashboard',
        name: '控制中心',
        icon: 'dashboard',
    },
    {
        key: '/AttackAnalysis',
        name: '攻击分析',
        icon: 'pie-chart',
        children: [
            {
                key: '/AttackDetail',
                name: '攻击详情',
            },
            {
                key: '/AttackType',
                name: '攻击类型',
            },
            {
                key: '/AttackFile',
                name: '攻击文件',
            },
            {
                key: '/AttackSource',
                name: '攻击来源',
            },
        ],
    },
    {
        key: '/SuspectFile',
        name: '可疑文件',
        icon: 'file-unknown',
    },
    {
        key: '/PatchManage',
        name: '补丁管理',
        icon: 'file-protect',
    },
    {
        key: '/AppManage',
        name: '应用管理',
        icon: 'appstore',
        children: [
            {
                key: '/AppList',
                name: '应用列表',
            },
            {
                key: '/AppInfo',
                name: '应用信息管理',
            },
        ],
    },
    {
        key: '/LingXeReport',
        name: '灵蜥报告',
        icon: 'fund',
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
                    },
                    {
                        key: '/EditPassword',
                        name: '修改密码',
                    },
                ],
            },
            {
                key: '/LoginLog',
                name: '登录记录',
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
                    },
                    {
                        key: '/SMSWaring',
                        name: '短信域名',
                    },
                ],
            },
            {
                key: '/WhiteList',
                name: '白名单',
            },
        ],
    },
    {
        key: '/InstallService',
        name: '安装服务',
        icon: 'tool',
    },
];