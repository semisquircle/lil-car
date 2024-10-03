String.prototype.customSplit = function(separator) {
	if (typeof separator !== 'string') {
		throw new TypeError('Separator must be a string');
	}

	var result = [];
	var currentSegment = '';
	var separatorLength = separator.length;
	var str = this;
	var strLength = str.length;

	if (separatorLength === 0) {
		throw new Error('Separator cannot be an empty string');
	}

	for (var i = 0; i < strLength; i++) {
		if (str[i] === separator[0]) {
			var match = true;
			for (var j = 1; j < separatorLength; j++) {
				if (str[i + j] !== separator[j]) {
					match = false;
					break;
				}
			}
			if (match) {
				result.push(currentSegment);
				currentSegment = '';
				i += separatorLength - 1;
			} else {
				currentSegment += str[i];
			}
		} else {
			currentSegment += str[i];
		}
	}

	result.push(currentSegment);

	if (result.length === 1 && result[0] === str) {
		return [str];
	}

	return result;
}

function getElementsByClass(context, className) {
	context = context || document;
	var elements = context.getElementsByTagName('*');
	var result = [];

	for (var i = 0; i < elements.length; i++) {
		var classes = elements[i].className.customSplit(' ');
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
	var classArray = el.className.customSplit(' ');
	for (var i = 0; i < classArray.length; i++) {
		if (classArray[i] !== '') filteredClassArray.push(classArray[i]);
	}
	filteredClassArray.push(cls);
	el.className = filteredClassArray.join(' ');
}

function removeClass(el, cls) {
	var filteredClassArray = [];
	var classArray = el.className.customSplit(' ');
	for (var i = 0; i < classArray.length; i++) {
		if (classArray[i] !== '' && classArray[i] !== cls) filteredClassArray.push(classArray[i]);
	}
	el.className = filteredClassArray.join(' ');
}

function hasClass(el, cls) {
	var filteredClassArray = [];
	var classArray = el.className.customSplit(' ');
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
var turnSignalTimers = {'left': null, 'right': null}
var turnSignalDuration = 365.71428571;
var currentTurnSignal = '';

function turnSignalAnimation(turnSignal) {
	if (hasClass(turnSignal, 'light-on')) removeClass(turnSignal, 'light-on');
	else addClass(turnSignal, 'light-on');
}

function turnSignalOn(turnSignal) {
	addClass(turnSignal, 'turn-signal-on');
	addClass(turnSignal, 'light-on');
}

function turnSignalOff(turnSignal) {
	removeClass(turnSignal, 'turn-signal-on');
	removeClass(turnSignal, 'light-on');
}

function turnAllTurnSignalsOn() {
	var turnSignalLeft = document.getElementById('turn-signal-left');
	var turnSignalRight = document.getElementById('turn-signal-right');
	turnSignalOn(turnSignalLeft);
	turnSignalOn(turnSignalRight);
	turnSignalTimers['left'] = setInterval(turnSignalAnimation, turnSignalDuration, turnSignalLeft);
	turnSignalTimers['right'] = setInterval(turnSignalAnimation, turnSignalDuration, turnSignalRight);
}

function turnAllTurnSignalsOff() {
	var turnSignalLeft = document.getElementById('turn-signal-left');
	var turnSignalRight = document.getElementById('turn-signal-right');
	turnSignalOff(turnSignalLeft);
	turnSignalOff(turnSignalRight);
	clearInterval(turnSignalTimers['left']);
	clearInterval(turnSignalTimers['right']);
}

function turnSignalClick(turnSignal) {
	var direction = turnSignal.id.replace('turn-signal-', '');
	var hazardLightsBtn = document.getElementById('hazard-lights-btn');
	removeClass(hazardLightsBtn, 'btn-pressed');

	if (currentTurnSignal == direction) {
		currentTurnSignal = '';
		turnAllTurnSignalsOff();
		stopTurnSignalAudio();
	} else {
		currentTurnSignal = direction;
		turnAllTurnSignalsOff();
		turnSignalOn(turnSignal);
		turnSignalTimers[direction] = setInterval(turnSignalAnimation, turnSignalDuration, turnSignal);
		playTurnSignalAudio();
	}
}

function lightClick(light) {
	if (hasClass(light, 'light-on')) removeClass(light, 'light-on');
	else addClass(light, 'light-on');
}

var headlightsIndex = 0;
function headlightsClick() {
	var headlights = document.getElementById('headlights');
	var headlightsLights = getElementsByClass(headlights, 'headlights-light');
	var cycleCurrent = getElementsByClass(headlights, 'cycle-current')[0];
	headlightsIndex = (headlightsIndex + 1) % 4;
	removeClass(cycleCurrent, 'cycle-current');
	addClass(headlightsLights[headlightsIndex], 'cycle-current');
}

var acIndex = 0;
function acClick() {
	var ac = document.getElementById('ac');
	var acLights = getElementsByClass(ac, 'ac-light');
	var cycleCurrent = getElementsByClass(ac, 'cycle-current')[0];
	acIndex = (acIndex + 1) % 4;
	removeClass(cycleCurrent, 'cycle-current');
	addClass(acLights[acIndex], 'cycle-current');
}



// Buttons
var locked = false;
function lockClick() {
	if (!locked) {
		var lockBtn = document.getElementById('lock-btn');
		var unlockBtn = document.getElementById('unlock-btn');
		locked = true;
		addClass(lockBtn, 'btn-pressed');
		removeClass(unlockBtn, 'btn-pressed');
		playLockAudio();
	}
}
function unlockClick() {
	if (locked) {
		var lockBtn = document.getElementById('lock-btn');
		var unlockBtn = document.getElementById('unlock-btn');
		locked = false;
		removeClass(lockBtn, 'btn-pressed');
		addClass(unlockBtn, 'btn-pressed');
	}
}

function hazardLightsClick() {
	var hazardLightsBtn = document.getElementById('hazard-lights-btn');
	turnAllTurnSignalsOff();
	
	if (currentTurnSignal == 'both') {
		currentTurnSignal = '';
		removeClass(hazardLightsBtn, 'btn-pressed');
		stopTurnSignalAudio();
	} else {
		currentTurnSignal = 'both';
		addClass(hazardLightsBtn, 'btn-pressed');
		turnAllTurnSignalsOn();
		playTurnSignalAudio();
	}
}



// Wheel
var WheelDrag = {
	isDragging: false,
	angleDelta: 20,
	restingAngle: 0,
	mouseDownAngle: 0,
	mouseMoveAngle: 0,
	mouseUpAngle: 0
}

function getAngle(x, y) {
	var wheel = document.getElementById('wheel');
	var wheelCenterX = wheel.offsetLeft + wheel.offsetWidth / 2;
	var wheelCenterY = wheel.offsetTop + wheel.offsetHeight / 2;
	return Math.atan2(y - wheelCenterX, x - wheelCenterY);
}

function wheelMouseDown(event) {
	event.stopPropagation();
	event.preventDefault();

	WheelDrag.isDragging = true;
	WheelDrag.mouseDownAngle = getAngle(event.clientX, event.clientY);
}
function wheelMouseMove(event) {
	if (WheelDrag.isDragging) {
		event.stopPropagation();
		event.preventDefault();

		WheelDrag.mouseMoveAngle = getAngle(event.clientX, event.clientY);
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
	if (WheelDrag.isDragging) {
		WheelDrag.isDragging = false;
		WheelDrag.restingAngle = WheelDrag.mouseUpAngle;
	}
}

function hornClick(event) {
	event.stopPropagation();
	event.preventDefault();
	playHornAudio();
}

var currentHorn = 'honda-accord';
function hornChange(hornSelect) {
	currentHorn = hornSelect.value;
}