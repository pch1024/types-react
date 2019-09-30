import Home from "./page/home";
import Article from "./page/article";
import Resume from "./page/resume";
import Website from "./page/website";


const color = [ "magenta", "red", "volcano", "orange", "gold", "lime", "green", "cyan", "blue", "purple" ];

const Menu = [
    {

        key: "Home",
        name: "我的小站",
        icon: "home",
        component: Home,
        iconColor: "",
        routerPath: "/Home"
    }, {

        key: "Article",
        name: "文章列表",
        icon: "ordered-list",
        component: Article,
        iconColor: "",
        routerPath: "/Article"
    }, {

        key: "Website",
        name: "开发案例",
        icon: "fire",
        component: Website,
        iconColor: "",
        routerPath: "/Website"
    }, {

        key: "Resume",
        name: "个人简历",
        icon: "smile",
        component: Resume,
        iconColor: "",
        routerPath: "/Resume"
    }
];

export const MenuList = Menu.map((item, i) => {
    item.iconColor = color[i % 10];
    return item;
});