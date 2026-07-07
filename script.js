const text = document.getElementById("text");
const count = document.getElementById("count");
const voiceSelect = document.getElementById("voiceSelect");

let voices = [];

function loadVoices() {
  voices = speechSynthesis.getVoices();

  voiceSelect.innerHTML = "";

  voices.forEach((voice, index) => {
    let option = document.createElement("option");
    option.value = index;
    option.text = `${voice.name} (${voice.lang})`;
    voiceSelect.appendChild(option);
  });
}

speechSynthesis.onvoiceschanged = loadVoices;
loadVoices();

text.addEventListener("input", () => {
  count.innerText = text.value.length + " Characters";
});
function speakText() {

  if (text.value.trim() === "") {
    alert("Please enter some text.");
    return;
  }

  speechSynthesis.cancel();

  let speech = new SpeechSynthesisUtterance(text.value);

  let selectedVoice = voices[voiceSelect.value];

  if (selectedVoice) {
    speech.voice = selectedVoice;
    speech.lang = selectedVoice.lang;
  }

  speech.rate = Number(document.getElementById("speed").value);
  speech.pitch = Number(document.getElementById("pitch").value);
  speech.volume = 1;

  speechSynthesis.speak(speech);

}

function clearText() {
  text.value = "";
  count.innerText = "0 Characters";
  speechSynthesis.cancel();
}

function pauseVoice() {
  speechSynthesis.pause();
}

function resumeVoice() {
  speechSynthesis.resume();
}

function stopVoice() {
  speechSynthesis.cancel();
}
