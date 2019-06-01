// SpeechSynth API
const synth = window.speechSynthesis;

// DOM elements
const textForm = document.querySelector('form');
const textInput = document.querySelector('#text-input');
const voiceSelect = document.querySelector('#voice-select');
const rate = document.querySelector('#rate');
const rateValue = document.querySelector('#rate-value');
const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('#pitch-value');

// voices array
let voices = [];

const getVoices = () => {
    voices = synth.getVoices();

    // loop through voices array
    voices.forEach(voice => {
        // create an option element
        let option = document.createElement('option');
        // set the voice name and language as option 
        option.textContent = `${voice.name} (${voice.lang})`;
        option.setAttribute('data-lang', voice.lang);
        option.setAttribute('data-name', voice.name);

        voiceSelect.appendChild(option);
    });
}

getVoices();
if(synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = getVoices;
}

// speech functionality
const speech = () => {
    // check if speaking
    if(synth.speaking) {
        console.error('Already speaking...');
        return;
    } else if (textInput.value !== '') {
        // get speech text
        const speechText = new SpeechSynthesisUtterance(textInput.value);
    
        // speech end
        speechText.onend = e => {
            console.log('done speaking...')
        }

        // speech error
        speechText.onerror = e => {
            console.log(`something went worng ${e}`);
        }

        // selected voice
        const selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name');

        // loop through voices
        voices.forEach(voice => {
            if(voice.name === selectedVoice) {
                speechText.voice = voice;
            }
        });

        // set pitch and rate
        speechText.rate = rate.value;
        speechText.pitch = pitch.value;
        synth.speak(speechText);
    }
}


// Event listeners
textForm.addEventListener('submit', e => {
    e.preventDefault();
    speech();
    textInput.blur();
})

// rate value change
rate.addEventListener('change', e => rateValue.textContent = rate.value);

pitch.addEventListener('change', e => pitchValue.textContent = pitch.value);

voiceSelect.addEventListener('change', e => speech());