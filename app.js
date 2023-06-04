let chunks = [];
let recorder;
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const playButton = document.getElementById('play');
const audioElement = document.getElementById('audio');

startButton.onclick = async function() {
    chunks = []; // Reset previously recorded chunks
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    recorder = new MediaRecorder(stream);
    recorder.start();

    recorder.ondataavailable = e => {
        chunks.push(e.data);
    };

    // Automatically stop recording after 7 seconds
    setTimeout(() => {
        stopButton.click();
    }, 7000);

    stopButton.disabled = false;
    startButton.disabled = true;
};

stopButton.onclick = function() {
    recorder.stop();
    stopButton.disabled = true;
    startButton.disabled = false;
    playButton.disabled = false;
};

playButton.onclick = function() {
    const blob = new Blob(chunks, { type: 'audio/ogg; codecs=opus' });
    const url = URL.createObjectURL(blob);
    audioElement.src = url;
    audioElement.play();
};
