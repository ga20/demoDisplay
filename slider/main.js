function slideBegin() {
	var doc = document,					//拿到document 减少访问次数
		img = Array.prototype.slice.call(doc.querySelectorAll("#main img")), //类数组转数组
		btn = doc.querySelectorAll("button"),
		wraper = doc.getElementById('wraper'),
		main = doc.getElementById('main'),
		mainWidth = img[0].offsetWidth,
		btnLi = Array.prototype.slice.call(doc.querySelectorAll("#btn li span")),
		index = 0,
		openClick = true,
		btnLeft = doc.getElementById('left_btn'),
		autoTimer,
		btnRight = doc.getElementById('right_btn');
	main.style.left = "0px";

	function autoSlide() {
		var start = parseFloat(main.style.left),
			end = index * mainWidth * (-1),
			change = end - start,
			timer,
			t = 0,
			max = 50; 							//可用于调节滑动速度
		clear(); 								//每次滑动清空所有样式
		if (index == btnLi.length) {
			btnLi[0].className = "selected";
		} else {
			btnLi[index].className = "selected";
		}
		clearInterval(timer);
		timer = setInterval(function() {
			t++;
			if (t >= max) {
				clearInterval(timer);
				openClick = true;				//
			}
			main.style.left = change / max * t + start + "px";
			// console.log(main.style.left);
			if (index == btnLi.length && t >= max) {
				main.style.left = 0;
				index = 0;
			}
		}, 8);           		//滑动速度
	}

	function goRight() {		//右滑函数
		index++;		
		if (index > btnLi.length) {
			index = 0
		}
		autoSlide();
	}

	function goLeft() {				//左滑函数
		index--;
		if (index < 0) {
			index = btnLi.length - 1
		}
		autoSlide();
	}

	function clear() {            //清除btn状态
		for (var i = 0; i < btnLi.length; i++) {
			btnLi[i].className = "";
		}
	}

	function Initialize() {		                        //初始化
		var autoTim;
		for (var i = 0; i < btnLi.length; i++) {
			(function(i) {
				btnLi[i].addEventListener("click", function() {				//ul列表点击事件
					if (openClick) {			
						index = i;
						autoSlide();
					}
				})
			})(i);
		}
		main.addEventListener("mouseover", function() { 		//鼠标悬停，取消定时器
			clearInterval(autoTimer);

		});
		main.addEventListener("mouseout", function() {			//鼠标离开main 设置定时
			autoTimer=setInterval(goRight, 4000);
		});
		btnLeft.addEventListener("click", function() { 			//左按钮点击
			openClick ? goLeft() : "";
			openClick = false; //防止在切换过程中点击滑动
		});
		btnRight.addEventListener("click", function() {			//右按钮点击
			openClick ? goRight() : "";
			openClick = false;
		});
		window.addEventListener("focus", function() {

			autoTimer = setInterval(goRight, 4000);
														//当前页面失去焦点，停止计时
		}); 											//防止因浏览器计时器和动画缓存不一致产生混乱			
		window.addEventListener("blur", function() {
			clearInterval(autoTimer);
			console.log(autoTimer);
			console.log("blur");
		});
	}
	autoTimer = setInterval(goRight, 4000);
	Initialize();
	console.log();
}
slideBegin();