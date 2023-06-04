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
    analyzer.minDecibels = -130;
    analyzer.maxDecibels = 0;
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

// Geocoding API function
function geocodeAddress(geocoder, resultsMap) {
    var address = document.getElementById('location-input').value;
    geocoder.geocode({'address': address}, function(results, status) {
        if (status === 'OK') {
            resultsMap.setCenter(results[0].geometry.location);
            var noise = Math.round(max)
                    
            // Creates new marker according to the level of sound
            if (noise <=30 ) {
                const newMarker = new google.maps.Marker({
                    map: resultsMap,
                    position: results[0].geometry.location,
                    animation: google.maps.Animation.DROP,
                    icon: "https://chart.googleapis.com/chart?chst=d_map_spin&chld=0.9|0|00FF00|14|b|" + `${noise}`,
                    title: `Noise: ${noise} dB`,
                });
            } else if (noise <= 50) {
                const newMarker = new google.maps.Marker({
                    map: resultsMap,
                    position: results[0].geometry.location,
                    animation: google.maps.Animation.DROP,
                    icon: "https://chart.googleapis.com/chart?chst=d_map_spin&chld=0.9|0|FFFF00|14|b|" + `${noise}`,
                    title: `Noise: ${noise} dB`,
                });
            } else if (noise <= 70) {
                const newMarker = new google.maps.Marker({
                    map: resultsMap,
                    position: results[0].geometry.location,
                    animation: google.maps.Animation.DROP,
                    icon: "https://chart.googleapis.com/chart?chst=d_map_spin&chld=0.9|0|FF8000|14|b|" + `${noise}`,
                    title: `Noise: ${noise} dB`,
                });
            } else {
                const newMarker = new google.maps.Marker({
                    map: resultsMap,
                    position: results[0].geometry.location,
                    animation: google.maps.Animation.DROP,
                    icon: "https://chart.googleapis.com/chart?chst=d_map_spin&chld=0.9|0|FF0000|14|b|" + `${noise}`,
                    title: `Noise: ${noise} dB`,
                });
            }
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}


function initMap() {
    // Default location (e.g., Sydney) in case geolocation fails or is not supported
    let location = { lat: -33.865427, lng: 151.196123 };

    // Create the map and append it to the map container
    const mapContainer = document.getElementById('map');
    map = new google.maps.Map(mapContainer, {
        zoom: 9,
        center: location,
        gestureHandling: 'greedy'
    });

    // Create a geocoder object
    const geocoder = new google.maps.Geocoder();

    // Event listener for 'Submit Location' button
    const submitLocationButton = document.getElementById('submit-location');
    submitLocationButton.addEventListener('click', function () {
        geocodeAddress(geocoder, map);
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
                placeButton.addEventListener('click', function () {
                    var noise = Math.round(max)
                    
                    // Creates new marker according to the level of sound
                    if (noise <=30 ) {
                        const newMarker = new google.maps.Marker({
                            position: location,
                            map: map,
                            animation: google.maps.Animation.DROP,
                            icon: "https://chart.googleapis.com/chart?chst=d_map_spin&chld=0.9|0|00FF00|14|b|" + `${noise}`,
                            title: `Noise: ${noise} dB`,
                        });
                    } else if (noise <= 50) {
                        const newMarker = new google.maps.Marker({
                            position: location,
                            map: map,
                            animation: google.maps.Animation.DROP,
                            icon: "https://chart.googleapis.com/chart?chst=d_map_spin&chld=0.9|0|FFFF00|14|b|" + `${noise}`,
                            title: `Noise: ${noise} dB`,
                        });
                    } else if (noise <= 70) {
                        const newMarker = new google.maps.Marker({
                            position: location,
                            map: map,
                            animation: google.maps.Animation.DROP,
                            icon: "https://chart.googleapis.com/chart?chst=d_map_spin&chld=0.9|0|FF8000|14|b|" + `${noise}`,
                            title: `Noise: ${noise} dB`,
                        });
                    } else {
                        const newMarker = new google.maps.Marker({
                            position: location,
                            map: map,
                            animation: google.maps.Animation.DROP,
                            icon: "https://chart.googleapis.com/chart?chst=d_map_spin&chld=0.9|0|FF0000|14|b|" + `${noise}`,
                            title: `Noise: ${noise} dB`,
                        });
                    }
                });
            },
            () => {
                // On error, do nothing and leave the map centered on the default location
            }
        );
    }
}
