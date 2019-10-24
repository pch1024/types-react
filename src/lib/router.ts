import Dashboard from "@/pages/dashboard";
import Login from "@/pages/login";
import LingXeReport from "@/pages/report";
import NotFound from "@/pages/404";
import EmailWaring from "@/pages/emailWaring";
import AttackDetail from "@/pages/attackAnalysis/attackDetail";
import AttackList from "@/pages/attackAnalysis/attackList";
import { ReactElement } from "react";
import AttackType  from "@/pages/attackAnalysis/attackType";

export const routes = [
    {
        path: "/Login",
        component: Login,
        title: "登录页"
    },
    {
        path: "/404",
        component: NotFound,
        title: "你迷路了"
    }
];

export const menuList = [
    {
        key: "/Dashboard",
        name: "控制中心",
        icon: "dashboard",
        component: Dashboard
    },
    {
        key: "/AttackAnalysis",
        name: "攻击分析",
        icon: "pie-chart",
        children: [
            {
                key: "/AttackList",
                name: "攻击列表",
                component: AttackList,
                hiddenChildren: [
                    {
                        key: "/AttackList/:id",
                        name: "攻击详情",
                        component: AttackDetail
                    }
                ]
            },
            {
                key: "/AttackType",
                name: "攻击类型",
                component: AttackType,
                hiddenChildren: [
                    {
                        key: "/AttackType/:id",
                        name: "攻击详情",
                        component: AttackDetail
                    }
                ]
            },
            {
                key: "/AttackFile",
                name: "攻击文件",
                component: NotFound
            },
            {
                key: "/AttackSource",
                name: "攻击来源",
                component: NotFound
            }
        ]
    },
    {
        key: "/SuspectFile",
        name: "可疑文件",
        icon: "file-unknown",
        component: NotFound
    },
    {
        key: "/PatchManage",
        name: "补丁管理",
        icon: "file-protect",
        component: NotFound
    },
    {
        key: "/AppManage",
        name: "应用管理",
        icon: "appstore",
        children: [
            {
                key: "/AppList",
                name: "应用列表",
                component: NotFound
            },
            {
                key: "/AppInfo",
                name: "应用信息管理",
                component: NotFound
            }
        ]
    },
    {
        key: "/LingXeReport",
        name: "安全报告",
        icon: "fund",
        component: LingXeReport
    },
    {
        key: "/AccountManage",
        name: "账户管理",
        icon: "user",
        children: [
            {
                key: "/AccountSetting",
                name: "个人设置",
                children: [
                    {
                        key: "/EditProfile",
                        name: "修改资料",
                        component: NotFound
                    },
                    {
                        key: "/EditPassword",
                        name: "修改密码",
                        component: NotFound
                    }
                ]
            },
            {
                key: "/LoginLog",
                name: "登录记录",
                component: NotFound
            }
        ]
    },
    {
        key: "/SystemSetting",
        name: "系统设置",
        icon: "setting",
        children: [
            {
                key: "/EarlyWarning",
                name: "预警消息",
                children: [
                    {
                        key: "/EmailWaring",
                        name: "邮件预警",
                        component: EmailWaring
                    },
                    {
                        key: "/SMSWaring",
                        name: "短信域名",
                        component: NotFound
                    }
                ]
            },
            {
                key: "/WhiteList",
                name: "白名单",
                component: NotFound
            }
        ]
    },
    {
        key: "/InstallService",
        name: "安装服务",
        icon: "tool",
        component: NotFound
    }
];

interface RouteType {
    key: string;
    name: string;
    icon?: string;

    component?(): ReactElement;

    children?: RouteType[];
}

function getDataByMenuList(menuList) {
    // 异步路由表
    let asyncRouteList: any[] = [];
    // 异步路由链
    let asyncRouteChain = {};
    // 异步路由路径和名称对照表
    let asyncRoutePathToName = {};
    // 递归遍历
    const loop = (menuList, parentChain = []): void => {
        menuList.forEach((menu): void => {
            // 常规路由
            asyncRoutePathToName[menu.key] = menu.name;
            asyncRouteChain[menu.key] = parentChain.concat(menu.key);

            // 隐藏路由
            menu.hiddenChildren && menu.hiddenChildren.forEach(route => {
                asyncRouteChain[route.key] = parentChain.concat(menu.key).concat(route.key);
                asyncRoutePathToName[route.key] = route.name;
            });

            if (menu.children && menu.children.length > 0) {
                // 递归该项
                loop(menu.children, asyncRouteChain[menu.key]);
            } else {
                // 常规路由
                asyncRouteList.push(menu);
                // 隐藏路由
                menu.hiddenChildren && asyncRouteList.push(...menu.hiddenChildren);
            }
        });
    };
    loop(menuList);
    return {
        asyncRouteList, asyncRouteChain, asyncRoutePathToName
    };
}

const dataByMenuList = getDataByMenuList(menuList);

export const pathList = dataByMenuList.asyncRouteChain;

export const asyncRoutes = dataByMenuList.asyncRouteList;

export const pathToName = dataByMenuList.asyncRoutePathToName;