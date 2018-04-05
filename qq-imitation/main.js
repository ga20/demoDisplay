var doc = document,
	fadeTimer,
	head = doc.getElementById('head')
openSlide = true,
	openClick = true;

function changeNavStyle() { //改变样式
	var navLi = doc.querySelectorAll(".nav-p");
	var oldClass = navLi[1].className;
	//改变top-banner导航样式
	for (var i = navLi.length - 1; i >= 0; i--) {
		navLi[i].addEventListener("mouseover", function() {
			navLi[0].className = oldClass;
			this.className = oldClass + " p-active";
			
		})
		navLi[i].addEventListener("mouseout", function() {
			this.className = oldClass
			navLi[0].className = oldClass + " p-active";
		})
	}
	var btnLi = doc.querySelectorAll('.head-img-controller li');
	for (var i = btnLi.length - 1; i >= 0; i--) {
		btnLi[i].addEventListener("click", function() {
			goRight();
			clearActive();
			this.className = "li-active";

		})
	}

	function clearActive() {
		for (var i = btnLi.length - 1; i >= 0; i--) {
			btnLi[i].className = ""
		}
	}
}

function img(className) {
	this.class = className;
	this.block = true;

	function findNode(className) {
		return doc.querySelector(className);
	}
	this.domNode = findNode(className);
}
var imga = new img(".imga");
var imgb = new img(".imgb");
imga.block = false;
imgb.domNode.style.opacity = 1;
imga.domNode.style.opacity = 0;

function fadeIn(thi) {
	openClick = false;
	thi.style.display = "block";
	var timer = setInterval(function() {
		thi.style.opacity -= -0.005;
		if (thi.style.opacity == 1) {
			clearInterval(timer);
			openClick = true;
		}
	}, 2)
}

function fadeOut(thi) {
	openClick = false; //设置不可点击
	var timer = setInterval(function() {
		thi.style.opacity -= 0.005;
		if (thi.style.opacity == 0) {
			clearInterval(timer);
			thi.style.display = "none";
			openClick = true; //fade函数执行完毕后再设置标志未true
		}
	}, 2)
}

function goRight() {
	if (openSlide && openClick) {
		if (imga.block == false && imgb.block == true) {
			fadeOut(imgb.domNode);
			fadeIn(imga.domNode);
			imga.block = true;
			imgb.block = false;
		} else {
			fadeOut(imga.domNode);
			fadeIn(imgb.domNode);
			imga.block = false;
			imgb.block = true;
		}
	}
}

function controlEvents() {
	imgb.domNode.addEventListener("mouseover", function() {
		openSlide = false;
	});
	imgb.domNode.addEventListener("mouseout", function() {
		openSlide = true;
	});
	imga.domNode.addEventListener("mouseover", function() {
		openSlide = false;
	});
	imga.domNode.addEventListener("mouseout", function() {
		openSlide = true;
	});
	window.addEventListener("focus", function() {
		openSlide = true;
		console.log("b");
	});
	window.addEventListener("blur", function() {
		openSlide = false;
		console.log("blur");
	})
}

function bannerSlide(){
		function bannerImg(className) {
		this.class = className;
		this.domNode = (function(className) {
			return doc.querySelector(className);
		})(className)
	}
	var banner_a=new bannerImg(".dynamic-a");
	var banner_b=new bannerImg(".dynamic-b");
	var banner_c=new bannerImg(".dynamic-c");
	window.addEventListener("scroll",function(){
		var osTop=document.documentElement.scrollTop||document.body.scrollTop;
		banner_a.domNode.style.backgroundPosition="0 "+(osTop-80)+"px";
		
		 if(osTop>=(banner_b.domNode.offsetTop-600)&&osTop<=(banner_b.domNode.offsetTop+600))
		 {
		 	banner_b.domNode.style.backgroundPosition="0 "+(osTop-banner_b.domNode.offsetTop)+"px";
		 }
		 if(osTop>=(banner_c.domNode.offsetTop-600)&&osTop<=(banner_c.domNode.offsetTop+600))
		 {
		 	banner_c.domNode.style.backgroundPosition="0 "+(osTop-banner_c.domNode.offsetTop)+"px";
		 }
		 console.log(banner_b.domNode.style.backgroundPosition);

	})
}

fadeTimer = setInterval(goRight, 4000);
changeNavStyle();
controlEvents();
bannerSlide();