// Turn signals
function playTurnSignalAudio() {
	var turnSignalAudio = document.getElementById('turn-signal-audio');
	turnSignalAudio.innerHTML = '<embed id="turn-signal-embed" src="audio/turn-signal.mp3" autostart="true" loop="true" hidden="true">';
}
function stopTurnSignalAudio() {
	var turnSignalAudio = document.getElementById('turn-signal-audio');
	var turnSignalEmbed = document.getElementById('turn-signal-embed');
	turnSignalAudio.removeChild(turnSignalEmbed);
}

// Lock
function playLockAudio() {
	var lockAudio = document.getElementById('lock-audio');
	lockAudio.innerHTML = '<embed id="lock-embed" src="audio/lock.mp3" autostart="true" hidden="true">';
}

// Horn
function playHornAudio() {
	var hornAudio = document.getElementById('horn-audio');
	hornAudio.innerHTML = '<embed id="horn-embed" src="audio/' + currentHorn + '.mp3" autostart="true" hidden="true">';
}