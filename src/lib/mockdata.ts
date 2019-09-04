// 站点应用数据
function _appList() {
    let appList = [];
    for (let i = 0; i < 30; i++) {
        appList.push({
            id: `${1000 - i}:app${i}`,
            name: `app${i}`,
        });
    }
    return appList
}
export const appList = _appList()
export default { appList: _appList() }