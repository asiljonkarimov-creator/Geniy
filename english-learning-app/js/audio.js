// ==================== AUDIO MANAGER ====================

const audioManager = {
    // Web Speech API sozlamalari
    speechEnabled: true,
    voiceRate: 0.9,
    voicePitch: 1.2,
    voiceVolume: 1.0,
    selectedVoice: null,
    
    // Mavjud ovozlarni yuklash
    init() {
        if ('speechSynthesis' in window) {
            // Ovozlar yuklanguncha kutish
            let voices = speechSynthesis.getVoices();
            
            if (voices.length === 0) {
                speechSynthesis.addEventListener('voiceschanged', () => {
                    voices = speechSynthesis.getVoices();
                    this.selectBestVoice(voices);
                });
            } else {
                this.selectBestVoice(voices);
            }
        } else {
            console.warn('Speech Synthesis API qo\'llab-quvvatlanmaydi');
        }
    },
    
    // Eng yaxshi ovozni tanlash (ingliz tili uchun)
    selectBestVoice(voices) {
        // Ingliz tili ovozlarini topish
        const englishVoices = voices.filter(voice => 
            voice.lang.startsWith('en-') && voice.name.includes('Female')
        );
        
        if (englishVoices.length > 0) {
            // Birinchi ayol ovozini tanlash (bolalar uchun yaxshiroq)
            this.selectedVoice = englishVoices[0];
        } else {
            // Agar ayol ovoz topilmasa, birinchi ingliz ovozini olish
            const anyEnglish = voices.find(voice => voice.lang.startsWith('en-'));
            this.selectedVoice = anyEnglish || voices[0];
        }
    },
    
    // Matnni o'qish
    speak(text, options = {}) {
        if (!this.speechEnabled || !('speechSynthesis' in window)) {
            return;
        }
        
        // Oldingi ovozni to'xtatish
        speechSynthesis.cancel();
        
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = options.lang || 'en-US';
        utterance.rate = options.rate || this.voiceRate;
        utterance.pitch = options.pitch || this.voicePitch;
        utterance.volume = options.volume || this.voiceVolume;
        
        if (this.selectedVoice) {
            utterance.voice = this.selectedVoice;
        }
        
        // Callback'lar
        if (options.onStart) {
            utterance.onstart = options.onStart;
        }
        
        if (options.onEnd) {
            utterance.onend = options.onEnd;
        }
        
        if (options.onError) {
            utterance.onerror = options.onError;
        }
        
        speechSynthesis.speak(utterance);
    },
    
    // So'zni aytish (standart)
    speakWord(word) {
        this.speak(word, {
            rate: 0.8,
            pitch: 1.3
        });
    },
    
    // Gapni aytish
    speakSentence(sentence) {
        this.speak(sentence, {
            rate: 0.9,
            pitch: 1.1
        });
    },
    
    // Maqtash ovozi
    speakPraise() {
        const praises = [
            'Great job!',
            'Excellent!',
            'Well done!',
            'Fantastic!',
            'Amazing!',
            'You are doing great!',
            'Perfect!',
            'Wonderful!'
        ];
        
        const randomPraise = praises[Math.floor(Math.random() * praises.length)];
        this.speak(randomPraise, {
            rate: 1.0,
            pitch: 1.4
        });
    },
    
    // Xato ovozi
    speakError() {
        const errors = [
            'Try again',
            'Not quite',
            'Almost',
            'Give it another try'
        ];
        
        const randomError = errors[Math.floor(Math.random() * errors.length)];
        this.speak(randomError, {
            rate: 1.0,
            pitch: 0.9
        });
    },
    
    // Ovozni to'xtatish
    stop() {
        if ('speechSynthesis' in window) {
            speechSynthesis.cancel();
        }
    },
    
    // Ovozni yoqish/o'chirish
    toggle() {
        this.speechEnabled = !this.speechEnabled;
        if (!this.speechEnabled) {
            this.stop();
        }
        return this.speechEnabled;
    },
    
    // Sozlamalarni o'zgartirish
    setRate(rate) {
        this.voiceRate = Math.max(0.1, Math.min(2, rate));
    },
    
    setPitch(pitch) {
        this.voicePitch = Math.max(0, Math.min(2, pitch));
    },
    
    setVolume(volume) {
        this.voiceVolume = Math.max(0, Math.min(1, volume));
    }
};

// Tovush effektlari (Web Audio API yordamida)
const soundEffects = {
    audioContext: null,
    
    // Audio Context yaratish
    init() {
        try {
            window.AudioContext = window.AudioContext || window.webkitAudioContext;
            this.audioContext = new AudioContext();
        } catch(e) {
            console.warn('Web Audio API qo\'llab-quvvatlanmaydi');
        }
    },
    
    // To'g'ri javob tovushi
    playSuccess() {
        if (!this.audioContext) return;
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.frequency.value = 523.25; // C5
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.5);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.5);
        
        // Ikkinchi nota
        setTimeout(() => {
            const osc2 = this.audioContext.createOscillator();
            const gain2 = this.audioContext.createGain();
            
            osc2.connect(gain2);
            gain2.connect(this.audioContext.destination);
            
            osc2.frequency.value = 659.25; // E5
            osc2.type = 'sine';
            
            gain2.gain.setValueAtTime(0.3, this.audioContext.currentTime);
            gain2.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.5);
            
            osc2.start(this.audioContext.currentTime);
            osc2.stop(this.audioContext.currentTime + 0.5);
        }, 100);
    },
    
    // Xato javob tovushi
    playError() {
        if (!this.audioContext) return;
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.frequency.value = 220; // A3
        oscillator.type = 'sawtooth';
        
        gainNode.gain.setValueAtTime(0.2, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.3);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.3);
    },
    
    // Tugma bosish tovushi
    playClick() {
        if (!this.audioContext) return;
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.frequency.value = 800;
        oscillator.type = 'square';
        
        gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.05);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.05);
    },
    
    // Yulduz olish tovushi
    playStar() {
        if (!this.audioContext) return;
        
        const frequencies = [523.25, 659.25, 783.99]; // C5, E5, G5
        
        frequencies.forEach((freq, i) => {
            setTimeout(() => {
                const oscillator = this.audioContext.createOscillator();
                const gainNode = this.audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(this.audioContext.destination);
                
                oscillator.frequency.value = freq;
                oscillator.type = 'sine';
                
                gainNode.gain.setValueAtTime(0.2, this.audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.3);
                
                oscillator.start(this.audioContext.currentTime);
                oscillator.stop(this.audioContext.currentTime + 0.3);
            }, i * 100);
        });
    }
};

// Orqa fon musiqasi (ixtiyoriy)
const backgroundMusic = {
    isPlaying: false,
    audioContext: null,
    
    // Simple melody generator
    playMelody() {
        // Bu funksiya kelajakda audio fayl qo'shilganda ishlatiladi
        console.log('Background music feature coming soon...');
    },
    
    stop() {
        this.isPlaying = false;
    }
};

// Sahifa yuklanganda
document.addEventListener('DOMContentLoaded', () => {
    audioManager.init();
    soundEffects.init();
});

// Export (global scope uchun)
window.audioManager = audioManager;
window.soundEffects = soundEffects;
window.backgroundMusic = backgroundMusic;
