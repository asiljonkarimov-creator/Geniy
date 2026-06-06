// ==================== ASOSIY JAVASCRIPT ====================

// Global o'zgaruvchilar
let userName = '';
let currentGame = null;

// DOM elementlar
const welcomeSection = document.getElementById('welcomeSection');
const mainMenu = document.getElementById('mainMenu');
const gameContainer = document.getElementById('gameContainer');
const userNameInput = document.getElementById('userName');
const startBtn = document.getElementById('startBtn');
const displayName = document.getElementById('displayName');
const backBtn = document.getElementById('backBtn');
const musicToggle = document.getElementById('musicToggle');

// Yulduzlar animatsiyasi
function createStars() {
    const starsContainer = document.getElementById('starsContainer');
    const starCount = 50;
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 3}s`;
        starsContainer.appendChild(star);
    }
}

// LocalStorage dan ma'lumotlarni yuklash
function loadUserData() {
    const savedName = localStorage.getItem('userName');
    if (savedName) {
        userName = savedName;
        displayName.textContent = userName;
        welcomeSection.classList.add('hidden');
        mainMenu.classList.remove('hidden');
        progressTracker.loadProgress();
    }
}

// Dasturni boshlash
startBtn.addEventListener('click', () => {
    const name = userNameInput.value.trim();
    
    if (name) {
        userName = name;
        localStorage.setItem('userName', userName);
        displayName.textContent = userName;
        
        welcomeSection.classList.add('hidden');
        mainMenu.classList.remove('hidden');
        
        // Xush kelibsiz ovozi
        playWelcomeSound(userName);
    } else {
        userNameInput.classList.add('shake');
        setTimeout(() => userNameInput.classList.remove('shake'), 500);
        alert('Iltimos, ismingizni kiriting!');
    }
});

// Enter tugmasi bilan boshlash
userNameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        startBtn.click();
    }
});

// O'yinlarni boshlash
document.querySelectorAll('.game-card').forEach(card => {
    const gameBtn = card.querySelector('.btn-game');
    const gameName = card.dataset.game;
    
    gameBtn.addEventListener('click', () => {
        startGame(gameName);
    });
});

// O'yinni boshlash funksiyasi
function startGame(gameName) {
    currentGame = gameName;
    mainMenu.classList.add('hidden');
    gameContainer.classList.remove('hidden');
    
    // O'yin nomini o'rnatish
    const gameTitle = document.getElementById('gameTitle');
    const titles = {
        'alphabet': '🔤 Alifbo',
        'colors': '🎨 Ranglar',
        'numbers': '🔢 Raqamlar',
        'animals': '🐾 Hayvonlar',
        'matching': '🎯 So'z Topish',
        'shapes': '⭐ Shakllar',
        'foods': '🍎 Ovqatlar',
        'family': '👨‍👩‍👧 Oila'
    };
    gameTitle.textContent = titles[gameName] || 'O\'yin';
    
    // O'yinni yuklash
    switch(gameName) {
        case 'alphabet':
            alphabetGame.init();
            break;
        case 'colors':
            colorsGame.init();
            break;
        case 'numbers':
            numbersGame.init();
            break;
        case 'matching':
            matchingGame.init();
            break;
        default:
            showComingSoon();
    }
}

// Orqaga qaytish
backBtn.addEventListener('click', () => {
    gameContainer.classList.add('hidden');
    mainMenu.classList.remove('hidden');
    currentGame = null;
    
    // Speech synthesis to'xtatish
    if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
    }
});

// Tez orada...
function showComingSoon() {
    const gameContent = document.getElementById('gameContent');
    gameContent.innerHTML = `
        <div style="text-align: center; padding: 100px 20px;">
            <div style="font-size: 8rem; margin-bottom: 30px;">🎮</div>
            <h2 style="font-size: 3rem; color: #2C3E50; margin-bottom: 20px;">
                Tez orada!
            </h2>
            <p style="font-size: 1.5rem; color: #7F8C8D;">
                Bu o'yin ustida ishlab turibmiz...
            </p>
        </div>
    `;
}

// Mukofot oynasini ko'rsatish
function showReward(stars, message) {
    const modal = document.getElementById('rewardModal');
    const rewardMessage = document.getElementById('rewardMessage');
    const rewardCount = document.getElementById('rewardCount');
    const continueBtn = document.getElementById('continueBtn');
    
    rewardMessage.textContent = message;
    rewardCount.textContent = `+${stars}`;
    
    modal.classList.remove('hidden');
    
    // Confetti effect
    createConfetti();
    
    continueBtn.onclick = () => {
        modal.classList.add('hidden');
    };
}

// Confetti yaratish
function createConfetti() {
    const colors = ['#FF6B9D', '#4A90E2', '#26DE81', '#FED330', '#9B59B6'];
    const emojis = ['⭐', '🎉', '🎊', '✨', '💫', '🌟'];
    
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti-piece';
            confetti.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            confetti.style.left = `${Math.random() * 100}%`;
            confetti.style.top = '-50px';
            confetti.style.fontSize = `${Math.random() * 2 + 1}rem`;
            confetti.style.position = 'fixed';
            confetti.style.animation = `confettiFall ${Math.random() * 3 + 2}s linear`;
            confetti.style.zIndex = '10000';
            
            document.body.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 5000);
        }, i * 50);
    }
}

// Confetti animatsiyasi
const confettiStyle = document.createElement('style');
confettiStyle.innerHTML = `
    @keyframes confettiFall {
        0% {
            transform: translateY(-50px) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(confettiStyle);

// Xush kelibsiz ovozi
function playWelcomeSound(name) {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(`Welcome ${name}! Let's learn English!`);
        utterance.lang = 'en-US';
        utterance.rate = 0.9;
        utterance.pitch = 1.2;
        window.speechSynthesis.speak(utterance);
    }
}

// Musiqa boshqaruvi
let musicEnabled = true;
musicToggle.addEventListener('click', () => {
    musicEnabled = !musicEnabled;
    const musicIcon = document.getElementById('musicIcon');
    
    if (musicEnabled) {
        musicIcon.textContent = '🔊';
    } else {
        musicIcon.textContent = '🔇';
        // Speech synthesis to'xtatish
        if (window.speechSynthesis) {
            window.speechSynthesis.cancel();
        }
    }
});

// Sahifa yuklanganda
document.addEventListener('DOMContentLoaded', () => {
    createStars();
    loadUserData();
    
    // Focus input
    userNameInput.focus();
});

// Klaviatura yorliqlari
document.addEventListener('keydown', (e) => {
    // ESC - orqaga qaytish
    if (e.key === 'Escape' && !gameContainer.classList.contains('hidden')) {
        backBtn.click();
    }
});

// Service Worker (offline rejim uchun)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(() => {
            // Service worker yuklanmasa, hech narsa qilmaslik
        });
    });
}
