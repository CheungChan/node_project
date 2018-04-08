// 工厂方法
function createCircle(radius) {
    return {
        radius,
        draw: function () {
            console.log("Draw...");
        }
    }
}
const circle = createCircle(1);
circle.draw();

// 构造方法
function Circle(radius) {
    this.radius = radius;
    this.draw = function () {
        console.log("Draw...");
    }
}
const anthor = new Circle(1);
anthor.draw();

// call和apply的第一个参数是要绑定的对象  所以绑定到了{}上.
Circle.call({}, 1)
Circle.apply({}, [1])

// js的对象上可以绑定属性,可以通过.绑定也可以通过[]绑定
circle.location = { x: 1, y: 1 }
const propertyName = 'd'
circle[propertyName] = "name";

// 删除属性
// delete circle['location']
// delete circle.d

// 迭代所有属性
for (let key in circle) {
    if (typeof (circle[key]) != 'function') {
        console.log(key, circle[key]);
    }
}

//得到所有属性
const keys = Object.keys(circle)
console.log('keys=', keys)

// 判断属性存在
if ('radius' in circle) {
    console.log("radius is a circle property")
}

// 让属性变成私有属性
function Square(width, height) {
    this.width = width;
    this.height = height;
    // this.s = width * height;
    let s = width * height;// 不用this.绑定而是用let,这样属性的作用域只在对象里面.
    this.getS = function () {
        return s;
    }
}
let square = new Square(2, 3)
console.log(square.getS());

// 定义getter  setter
function TriAngle(buttom, height) {
    this.buttom = buttom;
    this.height = height;
    let s = 0;
    this.draw = function () {
        console.log("draw...");
    };
    Object.defineProperty(this, "s", {
        get: function () {
            return this.buttom * this.height;
        },
        // 只有get,使得s为只读属性.
        set: function (value) {
            throw new Error("invalid set");
            // 还可以只要赋值就报异常.
        }
    });
}
let triAngle = new TriAngle(4, 5);
console.log("buttom:", triAngle.buttom);
console.log("height", triAngle.height);
console.log(triAngle.s);//20
// triAngle.s = 4;
// console.log(triAngle.s)//20

//练习
function StopWatch() {
    let starttime, endtime, duration, running = 0;
    this.start = function () {
        if (running) {
            throw new Error("stopwatch is already runing");
        }
        running = true;
        starttime = new Date();
    }
    this.stop = function () {
        if (!running) {
            throw new Error("stopwatch is already stop")
        }
        running = false;
        endtime = new Date();
        duration = (endtime.getTime() - starttime.getTime()) / 1000;
    }
    this.reset = function () {
        starttime = endtime = duration = running = 0;
    }
    Object.defineProperty(this, "duration", {
        get: function () {
            return duration;
        }
    })
}