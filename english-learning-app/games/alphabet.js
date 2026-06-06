// ==================== ALIFBO O'YINI ====================

const alphabetGame = {
    letters: [
        { letter: 'A', word: 'Apple', emoji: '🍎', sound: 'apple' },
        { letter: 'B', word: 'Ball', emoji: '⚽', sound: 'ball' },
        { letter: 'C', word: 'Cat', emoji: '🐱', sound: 'cat' },
        { letter: 'D', word: 'Dog', emoji: '🐶', sound: 'dog' },
        { letter: 'E', word: 'Elephant', emoji: '🐘', sound: 'elephant' },
        { letter: 'F', word: 'Fish', emoji: '🐟', sound: 'fish' },
        { letter: 'G', word: 'Grapes', emoji: '🍇', sound: 'grapes' },
        { letter: 'H', word: 'House', emoji: '🏠', sound: 'house' },
        { letter: 'I', word: 'Ice Cream', emoji: '🍦', sound: 'icecream' },
        { letter: 'J', word: 'Juice', emoji: '🧃', sound: 'juice' },
        { letter: 'K', word: 'Kite', emoji: '🪁', sound: 'kite' },
        { letter: 'L', word: 'Lion', emoji: '🦁', sound: 'lion' },
        { letter: 'M', word: 'Monkey', emoji: '🐵', sound: 'monkey' },
        { letter: 'N', word: 'Nose', emoji: '👃', sound: 'nose' },
        { letter: 'O', word: 'Orange', emoji: '🍊', sound: 'orange' },
        { letter: 'P', word: 'Pizza', emoji: '🍕', sound: 'pizza' },
        { letter: 'Q', word: 'Queen', emoji: '👸', sound: 'queen' },
        { letter: 'R', word: 'Rabbit', emoji: '🐰', sound: 'rabbit' },
        { letter: 'S', word: 'Sun', emoji: '☀️', sound: 'sun' },
        { letter: 'T', word: 'Tree', emoji: '🌳', sound: 'tree' },
        { letter: 'U', word: 'Umbrella', emoji: '☂️', sound: 'umbrella' },
        { letter: 'V', word: 'Van', emoji: '🚐', sound: 'van' },
        { letter: 'W', word: 'Watch', emoji: '⌚', sound: 'watch' },
        { letter: 'X', word: 'Xylophone', emoji: '🎵', sound: 'xylophone' },
        { letter: 'Y', word: 'Yo-yo', emoji: '🪀', sound: 'yoyo' },
        { letter: 'Z', word: 'Zebra', emoji: '🦓', sound: 'zebra' }
    ],
    
    currentIndex: 0,
    score: 0,
    mode: 'learn', // 'learn' yoki 'quiz'
    
    init() {
        this.currentIndex = 0;
        this.score = 0;
        this.mode = 'learn';
        this.render();
    },
    
    render() {
        const gameContent = document.getElementById('gameContent');
        
        if (this.mode === 'learn') {
            this.renderLearnMode(gameContent);
        } else {
            this.renderQuizMode(gameContent);
        }
    },
    
    renderLearnMode(container) {
        const current = this.letters[this.currentIndex];
        
        container.innerHTML = `
            <div class="alphabet-learn">
                <div class="progress-indicator">
                    <span>${this.currentIndex + 1} / ${this.letters.length}</span>
                </div>
                
                <div class="letter-card">
                    <div class="letter-display uppercase">
                        <div class="big-letter">${current.letter}</div>
                        <div class="small-letter">${current.letter.toLowerCase()}</div>
                    </div>
                    
                    <div class="letter-emoji">${current.emoji}</div>
                    
                    <div class="letter-word">
                        <h3>${current.word}</h3>
                        <p>${current.letter} is for ${current.word}</p>
                    </div>
                    
                    <button class="btn-sound" onclick="alphabetGame.playSound('${current.letter}')">
                        <span class="sound-icon">🔊</span>
                        Eshitish
                    </button>
                </div>
                
                <div class="letter-actions">
                    ${this.currentIndex > 0 ? 
                        '<button class="btn-secondary" onclick="alphabetGame.prevLetter()">← Oldingi</button>' : 
                        '<button class="btn-secondary" disabled>← Oldingi</button>'
                    }
                    
                    ${this.currentIndex < this.letters.length - 1 ? 
                        '<button class="btn-primary" onclick="alphabetGame.nextLetter()">Keyingi →</button>' : 
                        '<button class="btn-primary" onclick="alphabetGame.switchToQuiz()">Test Boshlash 🎯</button>'
                    }
                </div>
                
                <div class="alphabet-grid">
                    ${this.letters.map((l, i) => `
                        <div class="alphabet-mini ${i === this.currentIndex ? 'active' : ''} ${i < this.currentIndex ? 'completed' : ''}" 
                             onclick="alphabetGame.jumpToLetter(${i})">
                            ${l.letter}
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        
        this.addLetterAnimation();
    },
    
    renderQuizMode(container) {
        const shuffled = [...this.letters].sort(() => Math.random() - 0.5);
        const current = shuffled[this.currentQuizIndex || 0];
        const options = this.getQuizOptions(current);
        
        container.innerHTML = `
            <div class="alphabet-quiz">
                <div class="quiz-header">
                    <h3>Qaysi harf?</h3>
                    <div class="quiz-score">
                        <span>Ball: ${this.score}</span>
                    </div>
                </div>
                
                <div class="quiz-question">
                    <div class="question-emoji">${current.emoji}</div>
                    <h2>${current.word}</h2>
                </div>
                
                <div class="quiz-options">
                    ${options.map(opt => `
                        <button class="quiz-option" onclick="alphabetGame.checkAnswer('${opt}', '${current.letter}')">
                            ${opt}
                        </button>
                    `).join('')}
                </div>
                
                <button class="btn-secondary" onclick="alphabetGame.backToLearn()">
                    O'rganishga qaytish
                </button>
            </div>
        `;
    },
    
    getQuizOptions(correct) {
        const options = [correct.letter];
        const allLetters = this.letters.map(l => l.letter);
        
        while (options.length < 4) {
            const randomLetter = allLetters[Math.floor(Math.random() * allLetters.length)];
            if (!options.includes(randomLetter)) {
                options.push(randomLetter);
            }
        }
        
        return options.sort(() => Math.random() - 0.5);
    },
    
    addLetterAnimation() {
        const letterCard = document.querySelector('.letter-card');
        if (letterCard) {
            letterCard.classList.add('slide-in');
            setTimeout(() => letterCard.classList.remove('slide-in'), 500);
        }
    },
    
    nextLetter() {
        if (this.currentIndex < this.letters.length - 1) {
            this.currentIndex++;
            this.playSound(this.letters[this.currentIndex].letter);
            progressTracker.updateProgress('alphabet', this.currentIndex + 1);
            this.render();
        }
    },
    
    prevLetter() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.playSound(this.letters[this.currentIndex].letter);
            this.render();
        }
    },
    
    jumpToLetter(index) {
        this.currentIndex = index;
        this.playSound(this.letters[index].letter);
        this.render();
    },
    
    switchToQuiz() {
        this.mode = 'quiz';
        this.score = 0;
        this.currentQuizIndex = 0;
        this.render();
    },
    
    backToLearn() {
        this.mode = 'learn';
        this.render();
    },
    
    checkAnswer(selected, correct) {
        const options = document.querySelectorAll('.quiz-option');
        const selectedButton = Array.from(options).find(btn => btn.textContent.trim() === selected);
        
        if (selected === correct) {
            selectedButton.classList.add('correct');
            this.score += 10;
            
            // Tovush va animatsiya
            this.playSuccessSound();
            this.showConfetti();
            
            setTimeout(() => {
                this.currentQuizIndex = (this.currentQuizIndex || 0) + 1;
                
                if (this.currentQuizIndex >= this.letters.length) {
                    this.showQuizComplete();
                } else {
                    this.render();
                }
            }, 1500);
        } else {
            selectedButton.classList.add('wrong');
            this.playErrorSound();
            
            // To'g'ri javobni ko'rsatish
            setTimeout(() => {
                options.forEach(opt => {
                    if (opt.textContent.trim() === correct) {
                        opt.classList.add('correct');
                    }
                });
            }, 300);
            
            setTimeout(() => {
                this.render();
            }, 2000);
        }
    },
    
    showQuizComplete() {
        const gameContent = document.getElementById('gameContent');
        gameContent.innerHTML = `
            <div class="quiz-complete">
                <div class="complete-icon">🎉</div>
                <h2>Barakalla!</h2>
                <p>Siz testni yakunlading!</p>
                <div class="final-score">
                    <span class="score-label">Umumiy ball:</span>
                    <span class="score-value">${this.score}</span>
                </div>
                <div class="complete-actions">
                    <button class="btn-primary" onclick="alphabetGame.switchToQuiz()">
                        Qayta urinish
                    </button>
                    <button class="btn-secondary" onclick="alphabetGame.backToLearn()">
                        O'rganishga qaytish
                    </button>
                </div>
            </div>
        `;
        
        // Yutuq berish
        progressTracker.addStars(5);
        showReward(5, "Alifbo testini yakunlading!");
    },
    
    playSound(letter) {
        // Web Speech API yordamida talaffuz
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(letter);
            utterance.lang = 'en-US';
            utterance.rate = 0.8;
            utterance.pitch = 1.2;
            window.speechSynthesis.speak(utterance);
        }
    },
    
    playSuccessSound() {
        // To'g'ri javob tovushi
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance('Correct! Good job!');
            utterance.lang = 'en-US';
            utterance.rate = 1;
            utterance.pitch = 1.3;
            window.speechSynthesis.speak(utterance);
        }
    },
    
    playErrorSound() {
        // Xato javob tovushi
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance('Try again');
            utterance.lang = 'en-US';
            utterance.rate = 1;
            utterance.pitch = 0.8;
            window.speechSynthesis.speak(utterance);
        }
    },
    
    showConfetti() {
        // Konfetti animatsiyasi
        const confetti = document.createElement('div');
        confetti.className = 'confetti-burst';
        confetti.innerHTML = '🎉🎊✨⭐🌟💫';
        document.body.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 2000);
    }
};

// CSS qo'shimcha stillar
const alphabetStyles = document.createElement('style');
alphabetStyles.innerHTML = `
    .alphabet-learn {
        text-align: center;
    }
    
    .progress-indicator {
        margin-bottom: 20px;
        font-size: 1.2rem;
        color: #7F8C8D;
        font-weight: 600;
    }
    
    .letter-card {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        padding: 50px;
        border-radius: 30px;
        margin-bottom: 30px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
        animation: slideIn 0.5s ease;
    }
    
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .letter-display {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 30px;
        margin-bottom: 30px;
    }
    
    .big-letter {
        font-size: 8rem;
        font-weight: 700;
        color: white;
        text-shadow: 4px 4px 10px rgba(0, 0, 0, 0.3);
        animation: bounce 1s infinite;
    }
    
    .small-letter {
        font-size: 5rem;
        font-weight: 600;
        color: rgba(255, 255, 255, 0.8);
    }
    
    .letter-emoji {
        font-size: 8rem;
        margin: 30px 0;
        animation: float 3s ease-in-out infinite;
    }
    
    .letter-word h3 {
        font-size: 3rem;
        color: white;
        margin-bottom: 10px;
        text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
    }
    
    .letter-word p {
        font-size: 1.5rem;
        color: rgba(255, 255, 255, 0.9);
    }
    
    .btn-sound {
        background: white;
        color: #667eea;
        border: none;
        padding: 15px 40px;
        font-size: 1.3rem;
        font-weight: 600;
        border-radius: 25px;
        cursor: pointer;
        margin-top: 20px;
        display: inline-flex;
        align-items: center;
        gap: 10px;
        transition: all 0.3s ease;
        font-family: 'Fredoka', sans-serif;
    }
    
    .btn-sound:hover {
        transform: scale(1.1);
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
    }
    
    .sound-icon {
        font-size: 1.5rem;
        animation: pulse 1s infinite;
    }
    
    .letter-actions {
        display: flex;
        justify-content: center;
        gap: 20px;
        margin: 30px 0;
    }
    
    .btn-secondary {
        background: #ecf0f1;
        color: #2C3E50;
        border: none;
        padding: 15px 30px;
        font-size: 1.2rem;
        font-weight: 600;
        border-radius: 20px;
        cursor: pointer;
        transition: all 0.3s ease;
        font-family: 'Fredoka', sans-serif;
    }
    
    .btn-secondary:hover:not(:disabled) {
        background: #bdc3c7;
        transform: translateY(-3px);
    }
    
    .btn-secondary:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
    
    .alphabet-grid {
        display: grid;
        grid-template-columns: repeat(13, 1fr);
        gap: 10px;
        margin-top: 30px;
        padding: 20px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 20px;
    }
    
    .alphabet-mini {
        background: white;
        padding: 10px;
        border-radius: 10px;
        font-size: 1.2rem;
        font-weight: 700;
        cursor: pointer;
        transition: all 0.3s ease;
        text-align: center;
    }
    
    .alphabet-mini:hover {
        transform: scale(1.2);
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    }
    
    .alphabet-mini.active {
        background: linear-gradient(135deg, #FF6B9D, #FF9F43);
        color: white;
        transform: scale(1.3);
    }
    
    .alphabet-mini.completed {
        background: linear-gradient(135deg, #26DE81, #4A90E2);
        color: white;
    }
    
    /* Quiz stillari */
    .alphabet-quiz {
        text-align: center;
    }
    
    .quiz-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 30px;
        padding: 20px;
        background: linear-gradient(135deg, #667eea, #764ba2);
        border-radius: 20px;
        color: white;
    }
    
    .quiz-header h3 {
        font-size: 2rem;
        margin: 0;
    }
    
    .quiz-score {
        font-size: 1.5rem;
        font-weight: 700;
    }
    
    .quiz-question {
        margin: 40px 0;
    }
    
    .question-emoji {
        font-size: 8rem;
        margin-bottom: 20px;
        animation: bounce 1s infinite;
    }
    
    .quiz-question h2 {
        font-size: 3rem;
        color: #2C3E50;
    }
    
    .quiz-options {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 20px;
        margin: 40px 0;
    }
    
    .quiz-option {
        background: linear-gradient(135deg, #4A90E2, #9B59B6);
        color: white;
        border: none;
        padding: 40px;
        font-size: 3rem;
        font-weight: 700;
        border-radius: 20px;
        cursor: pointer;
        transition: all 0.3s ease;
        font-family: 'Fredoka', sans-serif;
    }
    
    .quiz-option:hover {
        transform: scale(1.05);
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
    }
    
    .quiz-option.correct {
        background: linear-gradient(135deg, #26DE81, #4A90E2);
        animation: correct 0.5s ease;
    }
    
    .quiz-option.wrong {
        background: linear-gradient(135deg, #ee5a6f, #f29263);
        animation: shake 0.5s ease;
    }
    
    @keyframes correct {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
    }
    
    /* Quiz complete */
    .quiz-complete {
        text-align: center;
        padding: 40px;
    }
    
    .complete-icon {
        font-size: 10rem;
        animation: celebrate 1s ease;
    }
    
    @keyframes celebrate {
        0%, 100% { transform: rotate(0deg) scale(1); }
        25% { transform: rotate(-15deg) scale(1.2); }
        75% { transform: rotate(15deg) scale(1.2); }
    }
    
    .quiz-complete h2 {
        font-size: 3rem;
        color: #9B59B6;
        margin: 20px 0;
    }
    
    .quiz-complete p {
        font-size: 1.5rem;
        color: #7F8C8D;
        margin-bottom: 30px;
    }
    
    .final-score {
        background: linear-gradient(135deg, #FF9F43, #FED330);
        padding: 30px;
        border-radius: 20px;
        margin: 30px 0;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 20px;
    }
    
    .score-label {
        font-size: 1.5rem;
        color: white;
        font-weight: 600;
    }
    
    .score-value {
        font-size: 4rem;
        color: white;
        font-weight: 700;
    }
    
    .complete-actions {
        display: flex;
        justify-content: center;
        gap: 20px;
        margin-top: 30px;
    }
    
    /* Confetti */
    .confetti-burst {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 4rem;
        animation: confetti 2s ease-out;
        pointer-events: none;
        z-index: 9999;
    }
    
    @keyframes confetti {
        0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
        }
        100% {
            transform: translate(-50%, -150%) scale(2);
            opacity: 0;
        }
    }
    
    /* Responsive */
    @media (max-width: 768px) {
        .big-letter {
            font-size: 5rem;
        }
        
        .small-letter {
            font-size: 3rem;
        }
        
        .letter-emoji {
            font-size: 5rem;
        }
        
        .letter-word h3 {
            font-size: 2rem;
        }
        
        .alphabet-grid {
            grid-template-columns: repeat(7, 1fr);
            gap: 8px;
        }
        
        .alphabet-mini {
            font-size: 1rem;
            padding: 8px;
        }
        
        .quiz-options {
            grid-template-columns: 1fr;
        }
        
        .quiz-option {
            font-size: 2.5rem;
            padding: 30px;
        }
    }
`;

document.head.appendChild(alphabetStyles);
