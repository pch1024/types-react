//
// new 运算符创建一个用户定义的对象类型的实例或具有构造函数的内置对象的实例。new 关键字会进行如下的操作：
//
function Parent(name) {
    this.name = name;
    this.say = function () {
        return this.name;
    };
    return {};
}

Parent.prototype.age = 18;

function _new() {
    // 检验第一个参数是不是函数。
    var toString = Object.prototype.toString;
    if (toString.call(arguments[ 0 ]) !== "[object Function]") {
        throw "The first parameter must be a function.";
    }
    // 创建一个空的简单JavaScript对象（即{}）；
    var obj = {};
    // 链接该对象（即设置该对象的构造函数）到另一个对象 ；
    obj.__proto__ = arguments[ 0 ].prototype;
    // 将步骤1新创建的对象作为this的上下文 ；
    var res = arguments[ 0 ].apply(obj, Array.prototype.slice.call(arguments).slice(1));
    console.log("res", res);
    // 如果该函数没有返回对象，则返回this。
    return res === undefined ? obj : res;
}

var _child = _new(22, "pch");

