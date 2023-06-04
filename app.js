let chunks = [];
let recorder;
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const playButton = document.getElementById('play');
const audioElement = document.getElementById('audio');
const volumeElement = document.getElementById('volume');
let audioContext, analyzer, source, stream;
let max = 0;

startButton.onclick = async function() {
    chunks = []; // Reset previously recorded chunks
    max = 0;
    stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    audioContext = new AudioContext();
    analyzer = audioContext.createAnalyser();
    source = audioContext.createMediaStreamSource(stream);
    source.connect(analyzer);
    
    const scriptProcessor = audioContext.createScriptProcessor(2048, 1, 1);
    analyzer.connect(scriptProcessor);
    scriptProcessor.connect(audioContext.destination);
    
    scriptProcessor.onaudioprocess = audioProcessingEvent => {
      const dataArray = new Uint8Array(analyzer.frequencyBinCount);
      analyzer.getByteFrequencyData(dataArray);
      let values = 0;
      const length = dataArray.length;
      for (let i = 0; i < length; i++) {
        values += (dataArray[i]);
      }
      const average = values / length;
      if (average > max) {
        max = average;
      }
      volumeElement.innerText = `Volume: ${Math.round(average)} Max: ${Math.round(max)}`;
    };

    recorder = new MediaRecorder(stream);
    recorder.start();

    recorder.ondataavailable = e => {
        chunks.push(e.data);
    };

    // Automatically stop recording after 5 seconds
    setTimeout(() => {
        stopButton.click();
    }, 3000);

    stopButton.disabled = false;
    startButton.disabled = true;
};

stopButton.onclick = function() {
    recorder.stop();
    stopButton.disabled = true;
    startButton.disabled = false;
    playButton.disabled = false;
    source.disconnect();
    audioContext.close();
};

playButton.onclick = function() {
    const blob = new Blob(chunks, { type: 'audio/ogg; codecs=opus' });
    const url = URL.createObjectURL(blob);
    audioElement.src = url;
    audioElement.play();
};

let map;

function initMap() {
    // Default location (e.g., Sydney) in case geolocation fails or is not supported
    let location = { lat: -33.865427, lng: 151.196123 };

    // Create the map and append it to the map container
    const mapContainer = document.getElementById('map');
    const map = new google.maps.Map(mapContainer, {
        zoom: 9,
        center: location,
        gestureHandling: 'greedy'
    });

    // Try to get the user's current position
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                // Update location with user's location
                location = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };

                // Center the map on the user's location
                map.setCenter(location);

                // Event listener for 'Place' button
                const placeButton = document.getElementById('placeButton');
                placeButton.addEventListener('click', function() {
                    // Create a new marker at a random location
                    const newMarker = new google.maps.Marker({
                        position: location,
                        map: map,
                        title: "New Marker",
                        label: `Max: ${Math.round(max)}`
                    });
                });
            },
            () => {
                // On error, do nothing and leave the map centered on the default location
            }
        );
    }
}
