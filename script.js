// Init SpeechSynth API
const synth = window.speechSynthesis;

//Dom Elements

const textForm = document.querySelector('form');
const textInput = document.querySelector('#text-input');
const voiceSelect = document.querySelector('#voice-select');
const rate = document.querySelector('#rate');
const rateValue = document.querySelector('#rate-value');
const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('#pitch-value');
const body = document.querySelector('body')
// Init voices array
let voices = [];

const getVoices = () =>{
    voices=synth.getVoices();
    console.log(voices)
    // loop throught voices and create option
    voices.forEach(voice =>{
        const option = document.createElement('option');
        // fill the option with voice and language
        option.textContent=voice.name + '(' +voice.lang +')';

        //Set needed option attribute'
        option.setAttribute('data-lang',voices.lang)
        option.setAttribute('data-name',voices.name)

        voiceSelect.appendChild(option)

    })
}

getVoices();
if(synth.onvoiceschanged !== undefined){
    synth.onvoiceschanged=getVoices;
}

//Speak
const speak =()=>{
    //Check if Speaking
    if(synth.speaking){
        console.log('its already Speaking Please Wait for Moment ')
    }
    if(textInput.value !== ''){
      //Add Background animation
      body.style.background='#141414 url(wave.gif)';
      body.style.backgroundRepeat='repeat-x';
      body.style.backgroundSize='100% 100%'

        //Get Speak text
        const speakText = new SpeechSynthesisUtterance(textInput.value);
        //speak end
        speakText.onend = e =>{
            console.log('Done Speaking')
            body.style.background='#141414';
        }

        // Speak Error
        speakText.onerror = e =>{
            console.error('something went wrong')
        }
        //selected voice
        const selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name');

        // loop throught voices

        voices.forEach(voice =>{
            if(voice.name === selectedVoice){
                speakText.voice=voice
            }
        });

        //setting pitch and rate
        speakText.rate = rate.value;
        speakText.pitch = pitch.value;

        // speak
        synth.speak(speakText);
    }
}

// Setting EventListeners

// textform submit
textForm.addEventListener('submit',e=>{
    e.preventDefault();
    speak();
    textInput.blur();
});

// rate value change

rate.addEventListener('change',e => rateValue.textContent=rate.value)

// rate value change

pitch.addEventListener('change' ,e => pitchValue.textContent=pitch.value);

//Voice select change
voiceSelect.addEventListener('change',e=>speak());