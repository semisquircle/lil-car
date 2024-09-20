String.prototype.mySplit = function(separator, limit) {
	var result = [];
	var string = this;
	var startIndex = 0;
	var endIndex;

	if (separator === '') {
		for (var i = 0; i < string.length; i++) {
			result.push(string.charAt(i));
		}
		return result;
	}

	if (separator === undefined) {
		result.push(string);
		return result;
	}

	while (true) {
		endIndex = -1;
		for (var i = startIndex; i < string.length; i++) {
			if (string.charAt(i) === separator) {
				endIndex = i;
				break;
			}
		}

		if (endIndex === -1) {
			break;
		}

		result.push(string.substring(startIndex, endIndex));
		startIndex = endIndex + 1;

		if (limit !== undefined && result.length === limit) {
			break;
		}
	}

	result.push(string.substring(startIndex));
	return result;
}

function getElementsByClass(context, className) {
	context = context || document;
	var elements = context.getElementsByTagName('*');
	var result = [];

	for (var i = 0; i < elements.length; i++) {
		var classes = elements[i].className.mySplit(' ');
		for (var j = 0; j < classes.length; j++) {
			if (classes[j] === className) {
				result.push(elements[i]);
				break;
			}
		}
	}

	return result;
}

function addClass(el, cls) {
	var filteredClassArray = [];
	var classArray = el.className.mySplit(' ');
	for (var i = 0; i < classArray.length; i++) {
		if (classArray[i] !== '') filteredClassArray.push(classArray[i]);
	}
	filteredClassArray.push(cls);
	el.className = filteredClassArray.join(' ');
}

function removeClass(el, cls) {
	var filteredClassArray = [];
	var classArray = el.className.mySplit(' ');
	for (var i = 0; i < classArray.length; i++) {
		if (classArray[i] !== '' && classArray[i] !== cls) filteredClassArray.push(classArray[i]);
	}
	el.className = filteredClassArray.join(' ');
}

function hasClass(el, cls) {
	var filteredClassArray = [];
	var classArray = el.className.mySplit(' ');
	for (var i = 0; i < classArray.length; i++) {
		if (classArray[i] !== '') filteredClassArray.push(classArray[i]);
	}

	var includes = false;
	for (var i = 0; i < classArray.length; i++) {
		if (filteredClassArray[i] == cls) includes = true;
	}
	return includes;
}



// Light events
/* var turnSignalAudio = new Audio('audio/turn-signal.wav');
	turnSignalAudio.loop = true;
	turnSignalAudio.preload = 'auto';
var isTurnSignalAudioPlaying = false;
var hornAudio = new Audio('audio/horn.wav');
	hornAudio.preload = 'auto';
var currentTurnSignal = ''; */

function turnSignalClick(turnSignal) {
	/* var direction = turnSignal.id.replace('turn-signal-', '');

	if (currentTurnSignal == '') {
		currentTurnSignal = direction;
		isTurnSignalAudioPlaying = true;
		turnSignalAudio.play();
	} else if (currentTurnSignal == direction) {
		currentTurnSignal = '';
		isTurnSignalAudioPlaying = false;
		turnSignalAudio.pause();
		turnSignalAudio.currentTime = 0;
	} else {
		currentTurnSignal = direction;
	} */
}

function lightClick(light) {
	if (hasClass(light, 'light-on')) removeClass(light, 'light-on');
	else addClass(light, 'light-on');
}

var headlightsIndex = 0;
var headlights = document.getElementById('headlights');
var headlightsLights = getElementsByClass(headlights, 'headlights-light');
function headlightsClick() {
	headlightsIndex = (headlightsIndex + 1) % 4;
	var cycleCurrent = getElementsByClass(headlights, 'cycle-current')[0];
	removeClass(cycleCurrent, 'cycle-current');
	addClass(headlightsLights[headlightsIndex], 'cycle-current');
}

var acIndex = 0;
var ac = document.getElementById('ac');
var acLights = getElementsByClass(ac, 'ac-light');
function acClick() {
	acIndex = (acIndex + 1) % 4;
	var cycleCurrent = getElementsByClass(ac, 'cycle-current')[0];
	removeClass(cycleCurrent, 'cycle-current');
	addClass(acLights[acIndex], 'cycle-current');
}



// Buttons
var locked = false;
var lockBtn = document.getElementById('lock-btn');
var unlockBtn = document.getElementById('unlock-btn');
var hazardLightBtn = document.getElementById('hazard-lights-btn');

function lockClick() {
	if (!locked) {
		locked = true;
		addClass(lockBtn, 'btn-pressed');
		removeClass(unlockBtn, 'btn-pressed');
	}
}

function unlockClick() {
	if (locked) {
		locked = false;
		removeClass(lockBtn, 'btn-pressed');
		addClass(unlockBtn, 'btn-pressed');
	}
}

function hazardLightClick() {
	if (hasClass(hazardLightBtn, 'btn-pressed')) {
		/* currentTurnSignal = '';
		isTurnSignalAudioPlaying = false;
		turnSignalAudio.pause();
		turnSignalAudio.currentTime = 0; */
		removeClass(hazardLightBtn, 'btn-pressed');
	} else {
		/* currentTurnSignal = 'both';
		isTurnSignalAudioPlaying = true;
		turnSignalAudio.play(); */
		addClass(hazardLightBtn, 'btn-pressed');
	}
}



// Wheel
var wheel = document.getElementById('wheel');
var wheelCenterX = wheel.offsetLeft + wheel.offsetWidth / 2;
var wheelCenterY = wheel.offsetTop + wheel.offsetHeight / 2;

var WheelDrag = {
	isDragging: false,
	angleDelta: 10,
	restingAngle: 0,
	mouseDownAngle: 0,
	mouseMoveAngle: 0,
	mouseUpAngle: 0
}

function getAngle(x, y) {
	return Math.atan2(y - wheelCenterX, x - wheelCenterY);
}

function wheelMouseDown(e) {
	WheelDrag.isDragging = true;
	WheelDrag.mouseDownAngle = getAngle(e.clientX, e.clientY);
}
function wheelMouseMove(e) {
	if (WheelDrag.isDragging) {	
		WheelDrag.mouseMoveAngle = getAngle(e.clientX, e.clientY);
		WheelDrag.mouseUpAngle = WheelDrag.restingAngle - (WheelDrag.mouseMoveAngle - WheelDrag.mouseDownAngle);
		var angleChangeDeg = WheelDrag.mouseUpAngle * (180 / Math.PI);

		angleChangeDeg = angleChangeDeg % 360;
		if (angleChangeDeg < 0) angleChangeDeg += 360;
		angleChangeDeg = Math.round(angleChangeDeg / WheelDrag.angleDelta) * WheelDrag.angleDelta;
		if (angleChangeDeg == 360) angleChangeDeg = 0;

		var oldWheelActive = getElementsByClass(document, 'wheel-active')[0];
		var newWheelActive = document.getElementById('wheel' + angleChangeDeg);

		removeClass(oldWheelActive, 'wheel-active');
		addClass(newWheelActive, 'wheel-active');
	}
}
function wheelMouseUp() {
	WheelDrag.isDragging = false;
	WheelDrag.restingAngle = WheelDrag.mouseUpAngle;
}

function hornMouseDown(e) {
	e.stopPropagation();
	// hornAudio.play();
}