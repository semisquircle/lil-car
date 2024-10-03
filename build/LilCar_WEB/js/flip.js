function showBack() {
	var front = document.getElementById('front');
	var back = document.getElementById('back');
		
	if (window.widget) widget.prepareForTransition('ToBack');
	front.style.display = 'none';
	back.style.display = 'block';
	if (window.widget) setTimeout('widget.performTransition();', 0);
}

function showFront() {
	var front = document.getElementById('front');
	var back = document.getElementById('back');

	if (window.widget) widget.prepareForTransition('ToFront');
	front.style.display = 'block';
	back.style.display = 'none';
	if (window.widget) setTimeout('widget.performTransition();', 0);

	hideFlipBg();
}



// Front - flip button
var msPerFrame = 13;
var flipBtnShown = false;
var flipBtnAnimation = {
	duration: 500,
	starttime: 0,
	to: 1,
	now: 0,
	from: 0,
	element: null,
	timer: null
}

function limit3(a, b, c) {
	return a < b ? b : (a > c ? c : a);
}

function computeNextFloat(from, to, ease) {
	return from + (to - from) * ease;
}

function flipIAnimate() {
	var T; var ease;
	var time = (new Date).getTime();
		
	T = limit3(time - flipBtnAnimation.starttime, 0, flipBtnAnimation.duration);
	
	if (T >= flipBtnAnimation.duration) {
		clearInterval(flipBtnAnimation.timer);
		flipBtnAnimation.timer = null;
		flipBtnAnimation.now = flipBtnAnimation.to;
	} else {
		ease = 0.5 - (0.5 * Math.cos(Math.PI * T / flipBtnAnimation.duration));
		flipBtnAnimation.now = computeNextFloat(flipBtnAnimation.from, flipBtnAnimation.to, ease);
	}
	
	flipBtnAnimation.element.style.opacity = flipBtnAnimation.now;
}

function showFlipI() {
	if (!flipBtnShown) {
		if (flipBtnAnimation.timer != null) {
			clearInterval(flipBtnAnimation.timer);
			flipBtnAnimation.timer  = null;
		}

		flipBtnAnimation.starttime = (new Date).getTime() - msPerFrame;
		flipBtnAnimation.element = document.getElementById('flip-btn-i');
		flipBtnAnimation.timer = setInterval('flipIAnimate();', msPerFrame);
		flipBtnAnimation.from = flipBtnAnimation.now;
		flipBtnAnimation.to = 1.0;
		flipIAnimate();

		flipBtnShown = true;
	}
}

function hideFlipI() {
	if (flipBtnShown) {
		if (flipBtnAnimation.timer != null) {
			clearInterval(flipBtnAnimation.timer);
			flipBtnAnimation.timer  = null;
		}
		
		flipBtnAnimation.starttime = (new Date).getTime() - msPerFrame;
		flipBtnAnimation.element = document.getElementById('flip-btn-i');
		flipBtnAnimation.timer = setInterval('flipIAnimate();', msPerFrame);
		flipBtnAnimation.from = flipBtnAnimation.now;
		flipBtnAnimation.to = 0.0;
		flipIAnimate();

		flipBtnShown = false;
	}
}

function showFlipBg() {
	var flipBtnBg = document.getElementById('flip-btn-bg');
	flipBtnBg.style.display = 'block';
}

function hideFlipBg() {
	var flipBtnBg = document.getElementById('flip-btn-bg');
	flipBtnBg.style.display = 'none';
}



// Back - done button
function doneBtnMouseDown(doneBtn) {
	addClass(doneBtn, 'done-btn-pressed');
}

function doneBtnMouseUp(doneBtn) {
	removeClass(doneBtn, 'done-btn-pressed');
}