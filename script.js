const chat = document.getElementById("chat");
const mic = document.getElementById("mic");

function speak(text) {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-US";
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;

    window.speechSynthesis.speak(speech);
}

function addMessage(text, sender) {
    const div = document.createElement("div");
    div.classList.add("message");
    div.classList.add(sender);
    div.innerText = text;
    chat.appendChild(div);

    chat.scrollTop = chat.scrollHeight;
}

const SpeechRecognition =
window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();

recognition.onstart = () => {
    addMessage("Listening...", "bot");
};

recognition.onresult = (event) => {

    const transcript = event.results[0][0].transcript;

    addMessage(transcript, "user");

    processCommand(transcript.toLowerCase());
};

function processCommand(command) {

    if(command.includes("hello")) {

        const response = "Hello Lakshya, how can I help you today?";

        addMessage(response, "bot");
        speak(response);
    }

    else if(command.includes("time")) {

        const time = new Date().toLocaleTimeString();

        const response = "Current time is " + time;

        addMessage(response, "bot");
        speak(response);
    }

    else if(command.includes("youtube")) {

        const response = "Opening YouTube";

        addMessage(response, "bot");
        speak(response);

        window.open("https://youtube.com");
    }

    else if(command.includes("google")) {

        const response = "Opening Google";

        addMessage(response, "bot");
        speak(response);

        window.open("https://google.com");
    }

    else if(command.includes("search")) {

        const searchText = command.replace("search", "");

        const response = "Searching for " + searchText;

        addMessage(response, "bot");
        speak(response);

        window.open(
        `https://www.google.com/search?q=${searchText}`
        );
    }

    else {

        const response = "I did not understand that command.";

        addMessage(response, "bot");
        speak(response);
    }
}

mic.addEventListener("click", () => {
    recognition.start();
});

if("serviceWorker" in navigator) {
    navigator.serviceWorker.register("service-worker.js");
}
