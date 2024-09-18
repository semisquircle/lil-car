// Row 1
$("#turn-signal-left").append(i_turnSignalLeft);
$(`label[for="engine"]`).append(i_engine);
$(`label[for="battery"]`).append(i_battery);
$(`label[for="brake-warning"]`).append(i_brakeWarning);
$(`label[for="oil-pressure"]`).append(i_oilPressure);
$(`label[for="door-ajar"]`).append(i_doorAjar);
$(`label[for="defrost-front"]`).append(i_defrostFront);
$(`label[for="defrost-rear"]`).append(i_defrostRear);
$("#ac").append(i_ac1);
$("#ac").append(i_ac2);
$("#ac").append(i_ac3);
$("#ac").append(i_ac4);
$("#turn-signal-right").append(i_turnSignalRight);

// Row 2
$("#headlights").append(i_lowBeam);
$("#headlights").append(i_lowBeam);
$("#headlights").append(i_highBeam);
$("#headlights").append(i_fogLight);
$(`label[for="tire-warning"]`).append(i_tireWarning);
$(`label[for="traction-control"]`).append(i_tractionControl);
$(`label[for="diesel-glow-plug"]`).append(i_dieselGlowPlug);
$(`label[for="gas"]`).append(i_gas);
$(`label[for="seatbelt"]`).append(i_seatbelt);
$(`label[for="windshield"]`).append(i_windshield);
$(`label[for="key"]`).append(i_key);



// Light events
var turnSignalAudio = new Audio("audio/turn-signal.wav");
	turnSignalAudio.loop = true;
	turnSignalAudio.preload = "auto";
var isTurnSignalAudioPlaying = false;
var hornAudio = new Audio("audio/horn.wav");
	hornAudio.preload = "auto";
var currentTurnSignal = "";

$(".turn-signal").on("click", function() {
	let direction = $(this).attr("id").replace("turn-signal-", "");
	$(".turn-signal").attr("data-blinking", false);

	if (currentTurnSignal == "") {
		currentTurnSignal = direction;
		isTurnSignalAudioPlaying = true;
		turnSignalAudio.play();
		$(this).attr("data-blinking", true);
	} else if (currentTurnSignal == direction) {
		currentTurnSignal = "";
		isTurnSignalAudioPlaying = false;
		turnSignalAudio.pause();
		turnSignalAudio.currentTime = 0;
	} else {
		currentTurnSignal = direction;
		$(this).attr("data-blinking", true);
	}
});

var ac = 0;
$("#ac").on("click", function() {
	ac = (ac + 1) % 4;
	$("#ac").children().css("opacity", 0);
	$("#ac").children().eq(ac).css("opacity", 1);
});

var headlights = 0;
$("#headlights").on("click", function() {
	headlights = (headlights + 1) % 4;
	$("#headlights").children().css("opacity", 0);
	$("#headlights").children().eq(headlights).css("opacity", 1);
});



// Wheel
var isDragging = false;
var lastAngle = 0;
var currentAngle = 0;
var velocity = 0;
var lastTime = 0;

function getAngle(cx, cy, ex, ey) {
	let dy = ey - cy;
	let dx = ex - cx;
	let theta = Math.atan2(dy, dx);
	return theta * (180 / Math.PI);
}

$("#wheel").on("mousedown", function(e) {
	isDragging = true;
	$(this).css("transition", "transform 0s linear");

	let wheelOffset = $(this).offset();
	let centerX = wheelOffset.left + $(this).width() / 2;
	let centerY = wheelOffset.top + $(this).height() / 2;

	lastAngle = getAngle(centerX, centerY, e.pageX, e.pageY);
	lastTime = e.timeStamp;

	$(document).on("mousemove", function(e) {
		if (isDragging) {
			let newAngle = getAngle(centerX, centerY, e.pageX, e.pageY);
			let angleDifference = newAngle - lastAngle;
			
			let timeDifference = e.timeStamp - lastTime;
			velocity = angleDifference / timeDifference;

			currentAngle += angleDifference;
			lastAngle = newAngle;
			lastTime = e.timeStamp;
			$("#wheel").css("transform", `rotate(${currentAngle}deg)`);
		}
	});
});

$(document).on("mouseup", function() {
if (isDragging) {
	isDragging = false;
	$(document).off("mousemove");

	let momentumDuration = 500;
	let decay = 0.8;

	let momentumTime = 0;
	let momentumInterval = setInterval(function() {
		if (momentumTime < momentumDuration) {
			currentAngle += velocity * 16;
			$("#wheel").css("transform", `rotate(${currentAngle}deg)`);
			
			velocity *= decay;
			momentumTime += 16;
		} else {
			clearInterval(momentumInterval);
		}
	}, 16);
}
});

$(".horn").on("click", function(e) {
	e.stopPropagation();
	hornAudio.play();
});



/* On load */
$(document).ready(function() {
	$(`input[type="checkbox"]`).each(function() {
		if (Math.random() < 1) $(this).prop("checked", true);
	});
});