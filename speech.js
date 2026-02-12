// Speech Recognition Logic
document.addEventListener('DOMContentLoaded', () => {
    const recordBtn = document.getElementById('recordBtn');
    const statusText = document.getElementById('status');
    const transcriptionBox = document.getElementById('transcription');

    // Only run if the elements exist on the page
    if (!recordBtn || !statusText || !transcriptionBox) {
        return;
    }

    // Check browser support
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
        statusText.textContent = "Sorry, your browser does not support Speech Recognition.";
        recordBtn.disabled = true;
        recordBtn.style.backgroundColor = "#ccc";
        return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US'; // Set language to English
    recognition.interimResults = false; // We only want final results
    recognition.maxAlternatives = 1;

    let isRecording = false;

    recordBtn.addEventListener('click', () => {
        if (!isRecording) {
            // Start Recording
            recognition.start();
        } else {
            // Stop Recording
            recognition.stop();
        }
    });

    recognition.onstart = () => {
        isRecording = true;
        recordBtn.classList.add('recording');
        recordBtn.innerHTML = '<span>⏹️</span> Stop Recording';
        statusText.textContent = "Listening... Speak now.";
        transcriptionBox.textContent = "Listening...";
    };

    recognition.onend = () => {
        isRecording = false;
        recordBtn.classList.remove('recording');
        recordBtn.innerHTML = '<span>🎤</span> Start Recording';
        statusText.textContent = "Click to start speaking...";
    };

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        transcriptionBox.textContent = transcript;
        statusText.textContent = "Transcription complete.";
    };

    recognition.onerror = (event) => {
        console.error("Speech recognition error", event.error);
        statusText.textContent = `Error: ${event.error}`;
        isRecording = false;
        recordBtn.classList.remove('recording');
        recordBtn.innerHTML = '<span>🎤</span> Start Recording';
    };
});