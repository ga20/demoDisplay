 var doc = document,
 	result,
 	result = doc.getElementById("result"),
 	add = doc.querySelector(".add"),
 	Ac = doc.getElementsByClassName("ac"),
 	state = {
 		firstNumber: null,
 		lastNumber: null,
 		isSymbolClick: false, //判断是否点击了运算符
 		isSymbolFirstClick: true, //运算符是否第一次点击
 		isSameSymbol: false, //
 		lastClickSymbol: null, //上一次运算的操作符
 		sameOneClick: false, //防止重复点击
 		total: null,
 		isFirstPointClick: true
 	},
 	height = document.body.clientHeight;

 function changestyle() { //通过事件改变按钮样式
 	var cls,
 		result,
 		clsold,
 		pinDiv,
 		btn = doc.querySelectorAll(".button"), //获取所有的按钮
 		t = doc.getElementsByClassName('symbol');
 	for (var i = 0; i < btn.length; i++) {
 		(function(i) {
 			btn[i].addEventListener("mousedown", function() {
 				cls = this.getAttribute("class");
 				clsold = cls; //获取之前的class
 				this.setAttribute("class", clsold + " active");
 				result = doc.getElementById('result');
 			});

 			btn[i].addEventListener("mouseup", function() {
 				this.setAttribute("class", clsold);
 			});
 		})(i);
 	}
 }

 function choosenum() {
 	var num,
 		vary;
 	num = doc.querySelectorAll(".number");
 	for (var i = 0; i < num.length; i++) {
 		(function(i) {
 			var vary1;
 			vary1 = i + 1;
 			vary1.toString();
 			if (i < 9) {
 				num[i].addEventListener("click", function() {
 					if (result.innerHTML == "0") {
 						result.innerHTML = "";
 						result.innerHTML = vary1;
 					} else {
 						if (state.isSymbolClick) {
 							result.innerHTML = ""; //当点击操作数之后，显示屏清零
 							state.isSymbolClick = false; //点击操作数之后，可以继续点击symbol 
 							state.sameOneClick = false;
 						}

 						result.innerHTML += vary1.toString();
 					}
 				});
 			} else if (i == 9) {

 				num[9].addEventListener("click", function() {
 					if (state.isSymbolClick) {
 						result.innerHTML = "0";
 					}
 					switch (result.innerHTML) {
 						case "":
 							result.innerHTML = "0";
 							break;
 						case "0":
 							break;
 						default:
 							result.innerHTML += "0";
 					}
 					state.isSymbolClick = false;
 					state.sameOneClick = false;
 				});
 			} else {
 				num[10].addEventListener("click", function() {
 					if (state.isFirstPointClick) {
 						result.innerHTML += "."
 					}
 					state.isFirstPointClick = false;
 					state.isSymbolClick = false; //点击小数点后之后，可以继续点击symbol
 				});
 			}
 		})(i); //点击按钮选择数字
 	}
 }

 function symbolOperate() { // 该函数建立运算逻辑

 	var symbol = function(option) {
 			this.option = option;
 			this.symbolFlag = "";
 			var findNode = function(option) {
 				var domNode = doc.getElementsByClassName(option);
 				return domNode[0];
 			}
 			this.domNode = findNode(this.option); //找到当前对象所对应的DOM节点
 		},
 		equal = doc.querySelector(".equal");
 	symbol.prototype.addListener = function() {
 		var that = this;
 		this.domNode.addEventListener("click", function() {
 			switch (that.option) {
 				case "add":
 					that.symbolFlag = "+";
 					break;
 				case "subtract":
 					that.symbolFlag = "-";
 					break;
 				case "multiply":
 					that.symbolFlag = "*";
 					break;
 				case "divide":
 					that.symbolFlag = "/";
 					break;
 			}

 			if (!state.sameOneClick === that.symbolFlag) {
 				state.sameOneClick = false; //如果本次点击和上次点击符号不相同，则判断为不同符号
 			}
 			if (state.firstNumber == "0") {
 				state.sameOneClick = false; //解决当firstNumber为0，即未点击任何数字时的运算
 			}
 			if (!state.sameOneClick) { //防止重复点击，当上次点击与本次点击相同时不执行代码

 				if (!state.firstNumber) {
 					state.firstNumber = result.innerHTML; //初始化firstNumber
 				}
 				state.isSymbolClick = true;

 				if (!state.isSymbolFirstClick) {

 					state.lastNumber = result.innerHTML;
 					
 					switch (state.lastClickSymbol) { //根据上一次运算符调用各自的Op函数（此次为第二次点击）
 						case "+":
 							state.total = add.Op(state.firstNumber, state.lastNumber);
 							break;
 						case "-":
 							state.total = subtract.Op(state.firstNumber, state.lastNumber);
 							break;
 						case "*":
 							state.total = multiply.Op(state.firstNumber, state.lastNumber);
 							break;
 						case "/":
 							state.total = divide.Op(state.firstNumber, state.lastNumber);
 							break;
 					}
 					result.innerHTML = state.total;
 					state.firstNumber = result.innerHTML;
 				}
 				state.sameOneClick = true;
 				state.isSymbolFirstClick = false;

 			}
 			state.lastClickSymbol = that.symbolFlag; //只要点击符号，就改变上一次运算符
 			state.isFirstPointClick = true; //只要点击符号，下一次输入数字可以输入一个“.”
 		})

 	}

 	var add = new symbol("add"), //创建symbol (+-*/ )对象
 		subtract = new symbol("subtract"),
 		multiply = new symbol("multiply"),
 		divide = new symbol("divide");
 	add.compute = function() {
 		console.log(ok);
 	}

 	add.addListener();
 	subtract.addListener();
 	multiply.addListener();
 	divide.addListener();

 	add.Op = function(arg1, arg2) {
 		var r1, r2, m, c;
 		try {
 			r1 = arg1.toString().split(".")[1].length;
 		} catch (e) {
 			r1 = 0;
 		}
 		try {
 			r2 = arg2.toString().split(".")[1].length;
 		} catch (e) {
 			r2 = 0;
 		}
 		c = Math.abs(r1 - r2);
 		m = Math.pow(10, Math.max(r1, r2));
 		if (c > 0) {
 			var cm = Math.pow(10, c);
 			if (r1 > r2) {
 				arg1 = Number(arg1.toString().replace(".", ""));
 				arg2 = Number(arg2.toString().replace(".", "")) * cm;
 			} else {
 				arg1 = Number(arg1.toString().replace(".", "")) * cm;
 				arg2 = Number(arg2.toString().replace(".", ""));
 			}
 		} else {
 			arg1 = Number(arg1.toString().replace(".", ""));
 			arg2 = Number(arg2.toString().replace(".", ""));
 		}
 		return (arg1 + arg2) / m;
 	}
 	subtract.Op = function(arg1, arg2) {
 		var r1, r2, m, n;
 		try {
 			r1 = arg1.toString().split(".")[1].length;
 		} catch (e) {
 			r1 = 0;
 		}
 		try {
 			r2 = arg2.toString().split(".")[1].length;
 		} catch (e) {
 			r2 = 0;
 		}
 		m = Math.pow(10, Math.max(r1, r2)); //last modify by deeka //动态控制精度长度
 		n = (r1 >= r2) ? r1 : r2;
 		return ((arg1 * m - arg2 * m) / m).toFixed(n);
 	}
 	multiply.Op = function(arg1, arg2) {
 		var m = 0,
 			s1 = arg1.toString(),
 			s2 = arg2.toString();
 		try {
 			m += s1.split(".")[1].length;
 		} catch (e) {}
 		try {
 			m += s2.split(".")[1].length;
 		} catch (e) {}
 		return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
 	}
 	divide.Op = function(arg1, arg2) {
 		var t1 = 0,
 			t2 = 0,
 			r1, r2;
 		try {
 			t1 = arg1.toString().split(".")[1].length;
 		} catch (e) {}
 		try {
 			t2 = arg2.toString().split(".")[1].length;
 		} catch (e) {}
 		with(Math) {
 			r1 = Number(arg1.toString().replace(".", ""));
 			r2 = Number(arg2.toString().replace(".", ""));
 			return (r1 / r2) * pow(10, t2 - t1);
 		}
 	}
 	equal.addEventListener("click", function() {
 		state.lastNumber = result.innerHTML;
 		switch (state.lastClickSymbol) { //根据上一次运算符调用相应的函数
 			//执行各自的Op函数
 			case "+":
 				state.total = add.Op(state.firstNumber, state.lastNumber);
 				break;
 			case "-":
 				state.total = subtract.Op(state.firstNumber, state.lastNumber);
 				break;
 			case "*":
 				state.total = multiply.Op(state.firstNumber, state.lastNumber);
 				break;
 			case "/":
 				state.total = divide.Op(state.firstNumber, state.lastNumber);
 				break;
 		}
 		result.innerHTML = state.total;
 		acState();
 	});
 }


 function acState() { //清状态函数

 	state.firstNumber = null;
 	state.lastNumber = null;
 	state.isSymbolClick = true; //判断是否点击了运算符
 	state.isSymbolFirstClick = true; //运算符是否第一次点击
 	state.isSameSymbol = false; //
 	state.lastClickSymbol = null; //上一次运算的操作符
 	state.sameOneClick = false; //防止重复点击
 	state.total = null;
 	state.isFirstPointClick = true; //是否第一次点击小数点

 }

 function ac() { //清零函数
 	Ac[0].addEventListener("click", function() {
 		acState(); //清状态
 		result.innerHTML = "0";
 	})
 }

 changestyle();
 choosenum();
 ac();
 symbolOperate();