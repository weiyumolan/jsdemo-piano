/**
 * 封装缓动动画函数
 * 任意一个元素移动到指定的目标位置
 * @params : {string}element元素  
 * @params : {number}target目标位置
 */
function buffer(obj,target){
	//清除定时器
	clearInterval(obj.timer);
	//设置定时器
	obj.timer = setInterval(function(){
		//求出步长
		var speed = (target - obj.offsetLeft) * 0.2;
		//取整判断
		speed = (target > obj.offsetLeft) ? Math.ceil(speed) : Math.floor(speed);
		//动起来
		obj.style.left = obj.offsetLeft + speed + 'px';
		//判断
		if(obj.style.left === target){
			clearInterval(obj.timer);
		}
	},10);
}

/**
 * 判断传入参数类型函数
 * @params : {string}id元素
 */
function type(id){
	return typeof id === 'string' ? document.getElementById(id) : null;
}

/**
 * 封装匀速动画函数--->任意一个元素移动到指定的目标位置
 * @params : {string}element元素  
 * @params : {number}target目标位置
 */
function constant(element,target ) {
	//先清理定时器
	clearInterval(element.timeId);
	element.timeId = setInterval(function () {
		//1.获取div当前的位置--->看成盒子当前的left值
		var current = element.offsetLeft;//number类型
		//2.div每一次移动多少像素 = 10 即步数
		var step = 7;
		//2.1判断往哪边移动
		step = current <= target ? step : -step;
		//3.每次移动后的距离
		current += step;
		//4.判断剩余的步数是否大于 step
		if(Math.abs(target - current) > Math.abs(step)){
			element.style.left = current + "px";
		}else{
			clearInterval(element.timeId);
			element.style.left = target + "px";
		}
	},20);
}	

/**
 * 获取css样式值
 * @param {object} obj 
 * @param {string} attr 
 */
function getCSSStyle(obj,attr){
	//兼容
	if(obj.currentStyle){	//IE和opera
		return obj.currentStyle[attr];
	}else{
		return window.getComputedStyle(obj,null)[attr];
	}
}

/**
 * 针对对物体运动函数
 * @param {object} obj 需要操作的对象
 * @param {string} json 
 * @param {object} fn 回调函数
 */
function animation(obj,json,fn){
	//清除定时器，针对对物体运动，定时器范湖值要绑定到当前的对象中
	clearInterval(obj.timer);
	//设置定时器
	obj.timer = setInterval(function(){
		// 透明度的值
		var cur = 0;
		//遍历json
		for(var attr in json){
			//透明度变化处理
			switch(attr){
				case 'opacity':
					cur = Math.round(parseFloat(getCSSStyle(obj,attr)) * 100);
					break;
				case 'scrollTop':
					cur = obj[attr];
					break;
				default:
					cur = parseInt(getCSSStyle(obj,attr));
					break;
			}
		
			//球速度
			speed = (json[attr] - cur) * 0.2;
			speed = json[attr] > cur ? Math.ceil(speed) : Math.floor(speed);
			//临界值处理
			if(json[attr] === cur){
				clearInterval(obj.timer);
				if(fn){
					fn();
				}
				return;
			}
			//动起来
			switch(attr){
				case 'opacity':
					obj.style[attr] = 'alpha(opacity:${cur + speed})';
					obj.style[attr] = (cur + speed) / 100;
					break;
				case 'scrollTop':
					obj.style[attr] = cur + speed;
					break;
				default:
					obj.style[attr] = cur + speed + 'px';
			}
			
		}
	},30);
}