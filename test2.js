// 1、先创建我们的目标函数
function Parent(name) {
    this.name = name;
    this.say = function () {
        return this.name;
    };
}

Parent.prototype.age = 18;

// 2、创建我们的 _new 模拟构造函数:  function _new() { }

// 3、如何调用模拟构造函数呢？我们假定这样调用： var child = _new(Parent, "pch");

// 4、定义好了调用规则，下一步实现函数内部逻辑，

function _new() {
    // 4.1、我们处理参数
    // 检验第一个参数是不是函数。不是函数返回提示信息
    if (Object.prototype.toString.call(arguments[ 0 ]) !== "[object Function]") {
        throw "The first parameter must be a function.";
    }

    // 4.2、创建一个空的简单JavaScript对象（即{}）；

    var obj = {};

    // 4.3、链接该对象（即设置该对象的构造函数）到另一个对象(我认为说的是目标函数对象，绑定原型) ；
    console.log(obj.__proto__ === obj.constructor);
    obj.__proto__ = arguments[ 0 ].prototype;

    // 4.4、将步骤1新创建的对象作为this的上下文（大概是切换 this的意思，我们可以使用 apply 进行参数传递）；
    var res = arguments[ 0 ].apply(obj, Array.prototype.slice.call(arguments).slice(1));

    // 4.5、如果该函数没有返回对象，则返回this（大概意思是说目标函数不存在返回值时，返回新对象，否则返回目标函数的返回值）。
    // 经过测试，使用 new 操作符时，目标函数有返回值就返回目标函数的返回值，我们也这样做。
    return res === undefined ? obj : res;
}

// 5、测试我们的函数


var child = _new(Parent, "pch");

console.log(child); // 输出： Parent { name: 'pch', say: [Function] }
console.log(child.name); // 输出：pch
console.log(child.say()); // 输出：pch
console.log(child.age); // 输出：18

function ParentHasReturn() {
    return "pch";
}

console.log(_new(ParentHasReturn)); // 输出：pch

try {
    _new(1, 2, 3);
} catch (e) {
    console.log(e); // 输出：The first parameter must be a function.
}
