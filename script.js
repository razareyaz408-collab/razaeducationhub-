let voices = [];

function loadVoiceList() {
  voices = speechSynthesis.getVoices();

  let select = document.getElementById("voiceSelect");
  if (!select) return;

  select.innerHTML = "";

  voices.forEach((voice, index) => {
    let option = document.createElement("option");
    option.value = index;

    let gender = "";

    if (voice.name.toLowerCase().includes("female") ||
        voice.name.toLowerCase().includes("woman")) {
      gender = "👩";
    } else if (voice.name.toLowerCase().includes("male") ||
               voice.name.toLowerCase().includes("man")) {
      gender = "👨";
    }

    option.text = `${gender} ${voice.name} (${voice.lang})`;
    select.appendChild(option);
  });
}

speechSynthesis.onvoiceschanged = loadVoiceList;
loadVoiceList();

function speakText() {
  let text = document.getElementById("text").value;

  if (text.trim() === "") {
    alert("Please enter some text.");
    return;
  }

  speechSynthesis.cancel();

  let speech = new SpeechSynthesisUtterance(text);

  let select = document.getElementById("voiceSelect");
  let voice = voices[select.value];

  if (voice) {
    speech.voice = voice;
    speech.lang = voice.lang;
  }

  speech.rate = 1;
  speech.pitch = 1;
  speech.volume = 1;

  speechSynthesis.speak(speech);
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

function clearText() {
  document.getElementById("text").value = "";

  let count = document.getElementById("count");
  if (count) {
    count.innerHTML = "0 Characters";
  }

  speechSynthesis.cancel();
  }
