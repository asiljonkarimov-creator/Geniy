// ==================== SO'Z TOPISH O'YINI (MATCHING GAME) ====================

const matchingGame = {
    words: [
        { word: 'Apple', emoji: '🍎', category: 'fruits' },
        { word: 'Banana', emoji: '🍌', category: 'fruits' },
        { word: 'Orange', emoji: '🍊', category: 'fruits' },
        { word: 'Grapes', emoji: '🍇', category: 'fruits' },
        { word: 'Watermelon', emoji: '🍉', category: 'fruits' },
        { word: 'Strawberry', emoji: '🍓', category: 'fruits' },
        
        { word: 'Cat', emoji: '🐱', category: 'animals' },
        { word: 'Dog', emoji: '🐶', category: 'animals' },
        { word: 'Lion', emoji: '🦁', category: 'animals' },
        { word: 'Elephant', emoji: '🐘', category: 'animals' },
        { word: 'Monkey', emoji: '🐵', category: 'animals' },
        { word: 'Rabbit', emoji: '🐰', category: 'animals' },
        { word: 'Fish', emoji: '🐟', category: 'animals' },
        { word: 'Bird', emoji: '🐦', category: 'animals' },
        
        { word: 'Car', emoji: '🚗', category: 'vehicles' },
        { word: 'Bus', emoji: '🚌', category: 'vehicles' },
        { word: 'Bike', emoji: '🚲', category: 'vehicles' },
        { word: 'Plane', emoji: '✈️', category: 'vehicles' },
        { word: 'Train', emoji: '🚂', category: 'vehicles' },
        { word: 'Boat', emoji: '⛵', category: 'vehicles' },
        
        { word: 'Sun', emoji: '☀️', category: 'nature' },
        { word: 'Moon', emoji: '🌙', category: 'nature' },
        { word: 'Star', emoji: '⭐', category: 'nature' },
        { word: 'Tree', emoji: '🌳', category: 'nature' },
        { word: 'Flower', emoji: '🌸', category: 'nature' },
        { word: 'Cloud', emoji: '☁️', category: 'nature' }
    ],
    
    currentLevel: 1,
    score: 0,
    currentPairs: [],
    matched: [],
    selectedEmoji: null,
    selectedWord: null,
    
    init() {
        this.currentLevel = 1;
        this.score = 0;
        this.matched = [];
        this.generateLevel();
    },
    
    generateLevel() {
        const pairsCount = Math.min(4 + this.currentLevel, 8);
        const shuffled = [...this.words].sort(() => Math.random() - 0.5);
        this.currentPairs = shuffled.slice(0, pairsCount);
        this.matched = [];
        this.selectedEmoji = null;
        this.selectedWord = null;
        this.render();
    },
    
    render() {
        const gameContent = document.getElementById('gameContent');
        
        const shuffledEmojis = [...this.currentPairs].sort(() => Math.random() - 0.5);
        const shuffledWords = [...this.currentPairs].sort(() => Math.random() - 0.5);
        
        gameContent.innerHTML = `
            <div class="matching-game">
                <div class="matching-header">
                    <div class="level-info">
                        <span class="level-badge">Level ${this.currentLevel}</span>
                        <span class="score-badge">⭐ ${this.score}</span>
                    </div>
                    <div class="progress-info">
                        <span>${this.matched.length} / ${this.currentPairs.length} matched</span>
                    </div>
                </div>
                
                <div class="matching-instruction">
                    <h3>Rasmni so'z bilan moslashtiring!</h3>
                    <p>Birinchi emoji, keyin so'zni bosing</p>
                </div>
                
                <div class="matching-container">
                    <div class="emoji-column">
                        ${shuffledEmojis.map((item, index) => `
                            <div class="emoji-card ${this.matched.includes(item.word) ? 'matched' : ''} 
                                 ${this.selectedEmoji?.word === item.word ? 'selected' : ''}"
                                 onclick="matchingGame.selectEmoji('${item.word}')"
                                 data-word="${item.word}">
                                <div class="card-content">
                                    <div class="emoji">${item.emoji}</div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    
                    <div class="word-column">
                        ${shuffledWords.map((item, index) => `
                            <div class="word-card ${this.matched.includes(item.word) ? 'matched' : ''}
                                 ${this.selectedWord?.word === item.word ? 'selected' : ''}"
                                 onclick="matchingGame.selectWord('${item.word}')"
                                 data-word="${item.word}">
                                <div class="card-content">
                                    <div class="word">${item.word}</div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                ${this.matched.length === this.currentPairs.length ? `
                    <div class="level-complete">
                        <div class="complete-message">
                            <h2>🎉 Level ${this.currentLevel} Complete!</h2>
                            <p>Ajoyib ish!</p>
                            <button class="btn-primary" onclick="matchingGame.nextLevel()">
                                Keyingi Level →
                            </button>
                        </div>
                    </div>
                ` : ''}
            </div>
        `;
    },
    
    selectEmoji(word) {
        if (this.matched.includes(word)) return;
        
        const item = this.currentPairs.find(p => p.word === word);
        
        if (this.selectedEmoji?.word === word) {
            this.selectedEmoji = null;
        } else {
            this.selectedEmoji = item;
            this.playSound(word);
        }
        
        this.checkMatch();
    },
    
    selectWord(word) {
        if (this.matched.includes(word)) return;
        
        const item = this.currentPairs.find(p => p.word === word);
        
        if (this.selectedWord?.word === word) {
            this.selectedWord = null;
        } else {
            this.selectedWord = item;
            this.playSound(word);
        }
        
        this.checkMatch();
    },
    
    checkMatch() {
        if (this.selectedEmoji && this.selectedWord) {
            if (this.selectedEmoji.word === this.selectedWord.word) {
                // To'g'ri!
                this.matched.push(this.selectedEmoji.word);
                this.score += 10;
                this.playSuccessSound();
                this.showMatchEffect();
                
                progressTracker.updateProgress('matching', this.matched.length);
                
                // Reset selection
                this.selectedEmoji = null;
                this.selectedWord = null;
                
                setTimeout(() => {
                    this.render();
                    
                    // Level complete check
                    if (this.matched.length === this.currentPairs.length) {
                        this.levelComplete();
                    }
                }, 500);
            } else {
                // Noto'g'ri
                this.playErrorSound();
                this.shakeCards();
                
                setTimeout(() => {
                    this.selectedEmoji = null;
                    this.selectedWord = null;
                    this.render();
                }, 800);
            }
        } else {
            this.render();
        }
    },
    
    levelComplete() {
        progressTracker.addStars(3);
        
        if (this.currentLevel >= 5) {
            showReward(10, "Barcha levellarni yakunlading!");
        }
    },
    
    nextLevel() {
        this.currentLevel++;
        this.generateLevel();
    },
    
    showMatchEffect() {
        const effect = document.createElement('div');
        effect.className = 'match-effect';
        effect.innerHTML = '✨ Correct! ✨';
        document.body.appendChild(effect);
        
        setTimeout(() => effect.remove(), 1500);
    },
    
    shakeCards() {
        const emojiCard = document.querySelector(`.emoji-card[data-word="${this.selectedEmoji?.word}"]`);
        const wordCard = document.querySelector(`.word-card[data-word="${this.selectedWord?.word}"]`);
        
        if (emojiCard) emojiCard.classList.add('shake');
        if (wordCard) wordCard.classList.add('shake');
        
        setTimeout(() => {
            if (emojiCard) emojiCard.classList.remove('shake');
            if (wordCard) wordCard.classList.remove('shake');
        }, 500);
    },
    
    playSound(word) {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(word);
            utterance.lang = 'en-US';
            utterance.rate = 0.9;
            utterance.pitch = 1.2;
            window.speechSynthesis.speak(utterance);
        }
    },
    
    playSuccessSound() {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance('Correct!');
            utterance.lang = 'en-US';
            utterance.rate = 1.1;
            utterance.pitch = 1.4;
            window.speechSynthesis.speak(utterance);
        }
    },
    
    playErrorSound() {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance('Try again');
            utterance.lang = 'en-US';
            utterance.rate = 1;
            utterance.pitch = 0.8;
            window.speechSynthesis.speak(utterance);
        }
    }
};

// CSS stillar
const matchingStyles = document.createElement('style');
matchingStyles.innerHTML = `
    .matching-game {
        max-width: 900px;
        margin: 0 auto;
    }
    
    .matching-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 30px;
        padding: 20px;
        background: linear-gradient(135deg, #667eea, #764ba2);
        border-radius: 20px;
        color: white;
    }
    
    .level-info {
        display: flex;
        gap: 15px;
        align-items: center;
    }
    
    .level-badge,
    .score-badge {
        padding: 10px 20px;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 15px;
        font-weight: 700;
        font-size: 1.2rem;
    }
    
    .progress-info {
        font-size: 1.2rem;
        font-weight: 600;
    }
    
    .matching-instruction {
        text-align: center;
        margin-bottom: 30px;
        padding: 20px;
        background: rgba(255, 255, 255, 0.5);
        border-radius: 15px;
    }
    
    .matching-instruction h3 {
        font-size: 1.8rem;
        color: #2C3E50;
        margin-bottom: 10px;
    }
    
    .matching-instruction p {
        font-size: 1.2rem;
        color: #7F8C8D;
    }
    
    .matching-container {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 30px;
        margin-bottom: 30px;
    }
    
    .emoji-column,
    .word-column {
        display: flex;
        flex-direction: column;
        gap: 15px;
    }
    
    .emoji-card,
    .word-card {
        background: white;
        padding: 20px;
        border-radius: 20px;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        border: 3px solid transparent;
    }
    
    .emoji-card:hover:not(.matched),
    .word-card:hover:not(.matched) {
        transform: translateY(-5px) scale(1.05);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    }
    
    .emoji-card.selected,
    .word-card.selected {
        border-color: #FF6B9D;
        background: linear-gradient(135deg, #FFF5F8, #FFE5ED);
        transform: scale(1.05);
    }
    
    .emoji-card.matched,
    .word-card.matched {
        background: linear-gradient(135deg, #26DE81, #4A90E2);
        border-color: #26DE81;
        opacity: 0.7;
        pointer-events: none;
        animation: matchSuccess 0.5s ease;
    }
    
    @keyframes matchSuccess {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.15); }
    }
    
    .emoji-card .emoji {
        font-size: 4rem;
        text-align: center;
    }
    
    .word-card .word {
        font-size: 1.8rem;
        font-weight: 700;
        color: #2C3E50;
        text-align: center;
    }
    
    .emoji-card.matched .emoji,
    .word-card.matched .word {
        color: white;
    }
    
    /* Level complete */
    .level-complete {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        animation: fadeIn 0.3s ease;
    }
    
    .complete-message {
        background: white;
        padding: 50px;
        border-radius: 30px;
        text-align: center;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        animation: scaleUp 0.5s ease;
    }
    
    .complete-message h2 {
        font-size: 3rem;
        color: #9B59B6;
        margin-bottom: 20px;
    }
    
    .complete-message p {
        font-size: 1.5rem;
        color: #7F8C8D;
        margin-bottom: 30px;
    }
    
    /* Match effect */
    .match-effect {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 3rem;
        font-weight: 700;
        color: #26DE81;
        text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
        animation: matchFloat 1.5s ease-out;
        pointer-events: none;
        z-index: 9999;
    }
    
    @keyframes matchFloat {
        0% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(0.5);
        }
        50% {
            transform: translate(-50%, -80%) scale(1.2);
        }
        100% {
            opacity: 0;
            transform: translate(-50%, -120%) scale(1);
        }
    }
    
    /* Responsive */
    @media (max-width: 768px) {
        .matching-container {
            grid-template-columns: 1fr;
            gap: 20px;
        }
        
        .matching-header {
            flex-direction: column;
            gap: 15px;
        }
        
        .level-info {
            width: 100%;
            justify-content: space-around;
        }
        
        .emoji-card .emoji {
            font-size: 3rem;
        }
        
        .word-card .word {
            font-size: 1.5rem;
        }
        
        .complete-message {
            padding: 30px 20px;
            margin: 20px;
        }
        
        .complete-message h2 {
            font-size: 2rem;
        }
    }
`;

document.head.appendChild(matchingStyles);
