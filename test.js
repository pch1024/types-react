/**
 * @param {string} s
 * @return {number}
 */
var longestValidParentheses = function (s) {
    // 初始比较字符串
    s = s.replace(/{/g, "1");
    s = s.replace(/}/g, "1");
    s = s.replace(/\(/g, "2");
    s = s.replace(/\)/g, "2");
    s = s.replace(/\[/g, "3");
    s = s.replace(/\]/g, "3");
    let tmp = s[0];
    let len = s.length;
    let maxLen = 0;
    let maxStr = s[0];

    for (let i = 0; i < len; i++) {
        let last = i + 1;
        while (last < len) {
            let maxStr = s.slice(i, last);
            if (s.slice(i, last).length > maxLen) {
                maxLen = maxStr.length;
            }
            console.log(i, last, maxStr, tmp.slice(-1), s[last]);
            if (tmp.length === 0) {
                // 比较字符串为空 继续下一个
                tmp = s[last];
                last++;
            } else if (tmp.slice(-1) === s[last]) {
                // tmp 最后一个 === 当前
                tmp = tmp.slice(0, -1);
                last++;
            } else {
                // tmp 最后一个 !== 当前
                maxStr = s.slice(i, last - 1);
                break;
            }
        }
    }
    return  maxStr
};

let str = "{}(){}()}";
let res = longestValidParentheses(str);
console.log(res);