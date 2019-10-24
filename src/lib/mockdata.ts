// 站点应用数据
import { attackListTableDataType, attackTypeTableDataType } from "@/lib/model";

interface AppT {
    id: string;
    name: string;
}

function _appList(): AppT[] {
    let appList: AppT[] = [];
    for (let i = 0; i < 30; i++) {
        appList.push({
            id: `${ 1000 - i }:app${ i }`,
            name: `app${ i }`
        });
    }
    return appList;
}

export const appList = _appList();


export const AttackType = {
    "code": -1,
    "data": [
        {
            "attack_color": "#76dcda",
            "attack_level": "medium",
            "attack_type": "inject",
            "attack_type_id": 1,
            "attack_type_name": "SQL注入"
        }, {
            "attack_color": "#4ed0e1",
            "attack_level": "medium",
            "attack_type": "xxe",
            "attack_type_id": 2,
            "attack_type_name": "XML实体注入攻击"
        }, {
            "attack_color": "#30b3dd",
            "attack_level": "medium",
            "attack_type": "filemode",
            "attack_type_id": 3,
            "attack_type_name": "恶意文件访问"
        }, {
            "attack_color": "#FF6666",
            "attack_level": "high",
            "attack_type": "expression",
            "attack_type_id": 4,
            "attack_type_name": "表达式执行"
        }, {
            "attack_color": "#CC3333",
            "attack_level": "high",
            "attack_type": "webshell",
            "attack_type_id": 5,
            "attack_type_name": "WebShell后门"
        }, {
            "attack_color": "#CC0033",
            "attack_level": "high",
            "attack_type": "upload",
            "attack_type_id": 6,
            "attack_type_name": "文件上传攻击"
        }, {
            "attack_color": "#FF6666",
            "attack_level": "medium",
            "attack_type": "patch",
            "attack_type_id": 7,
            "attack_type_name": "动态补丁拦截"
        }, {
            "attack_color": "#ff9a2b",
            "attack_level": "high",
            "attack_type": "cmd",
            "attack_type_id": 8,
            "attack_type_name": "本地命令执行"
        }, {
            "attack_color": "#b70c3e",
            "attack_level": "high",
            "attack_type": "unserialize",
            "attack_type_id": 9,
            "attack_type_name": "反序列化攻击"
        }, {
            "attack_color": "#663366",
            "attack_level": "low",
            "attack_type": "scanner",
            "attack_type_id": 10,
            "attack_type_name": "扫描器攻击"
        }, {
            "attack_color": "#a34856",
            "attack_level": "low",
            "attack_type": "url",
            "attack_type_id": 11,
            "attack_type_name": "URL黑名单"
        }, {
            "attack_color": "#e34856",
            "attack_level": "high",
            "attack_type": "reflect",
            "attack_type_id": 12,
            "attack_type_name": "Java反射攻击"
        }, {
            "attack_color": "#CC9966",
            "attack_level": "medium",
            "attack_type": "ssrf",
            "attack_type_id": 13,
            "attack_type_name": "SSRF攻击"
        }, {
            "attack_color": "#99CC66",
            "attack_level": "low",
            "attack_type": "xss",
            "attack_type_id": 14,
            "attack_type_name": "跨站脚本攻击"
        }, {
            "attack_color": "#184dba",
            "attack_level": "high",
            "attack_type": "webserver",
            "attack_type_id": 15,
            "attack_type_name": "畸形文件攻击、未授权路径访问拦截"
        }, {
            "attack_color": "#990033",
            "attack_level": "high",
            "attack_type": "struts",
            "attack_type_id": 16,
            "attack_type_name": "Struts2 框架漏洞"
        }],
    "valid": true
};

export default { appList: _appList() };


// 攻击分析-攻击列表
const _attackListTableData: attackListTableDataType[] = [];
// 攻击分析-攻击类型
const _attackTypeTableData: attackTypeTableDataType[] = [];

for (let i = 0; i < 10; i++) {
    _attackTypeTableData.push({
        key: "" + i,
        id: i,
        attackType: "xss",
        attackCount: 100,
        lastAttackTime: +new Date() + i
    });

    _attackListTableData.push({
        key: "" + i,
        id: i,
        time: +new Date() + i,
        attackAddress: "/test/index.js",
        attackType: "xss",
        attackSource: "北京",
        attackLevel: "low"
    });
}

export const attackListTableData = _attackListTableData;
export const attackTypeTableData = _attackTypeTableData;