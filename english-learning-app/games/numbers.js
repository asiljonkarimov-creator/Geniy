// ==================== RAQAMLAR O'YINI (NUMBERS GAME) ====================

const numbersGame = {
    numbers: [
        { number: 1, word: 'One', emoji: '1️⃣' },
        { number: 2, word: 'Two', emoji: '2️⃣' },
        { number: 3, word: 'Three', emoji: '3️⃣' },
        { number: 4, word: 'Four', emoji: '4️⃣' },
        { number: 5, word: 'Five', emoji: '5️⃣' },
        { number: 6, word: 'Six', emoji: '6️⃣' },
        { number: 7, word: 'Seven', emoji: '7️⃣' },
        { number: 8, word: 'Eight', emoji: '8️⃣' },
        { number: 9, word: 'Nine', emoji: '9️⃣' },
        { number: 10, word: 'Ten', emoji: '🔟' }
    ],
    
    currentIndex: 0,
    score: 0,
    mode: 'learn', // 'learn', 'quiz', 'count'
    
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
        } else if (this.mode === 'quiz') {
            this.renderQuizMode(gameContent);
        } else if (this.mode === 'count') {
            this.renderCountMode(gameContent);
        }
    },
    
    renderLearnMode(container) {
        const current = this.numbers[this.currentIndex];
        const items = this.getCountingItems();
        
        container.innerHTML = `
            <div class="numbers-learn">
                <div class="number-progress">
                    <span>${this.currentIndex + 1} / ${this.numbers.length}</span>
                </div>
                
                <div class="number-card">
                    <div class="number-display">
                        <div class="big-number">${current.number}</div>
                        <div class="number-emoji">${current.emoji}</div>
                    </div>
                    
                    <div class="number-word">
                        <h2>${current.word}</h2>
                    </div>
                    
                    <button class="btn-sound" onclick="numbersGame.playSound('${current.word}')">
                        <span class="sound-icon">🔊</span>
                        Eshitish
                    </button>
                </div>
                
                <div class="counting-visual">
                    <h3>Let's count to ${current.number}!</h3>
                    <div class="counting-items">
                        ${Array(current.number).fill(0).map((_, i) => `
                            <div class="count-item" style="animation-delay: ${i * 0.1}s">
                                ${items[i % items.length]}
                            </div>
                        `).join('')}
                    </div>
                    <div class="count-numbers">
                        ${Array(current.number).fill(0).map((_, i) => `
                            <span class="count-num" style="animation-delay: ${i * 0.1}s">${i + 1}</span>
                        `).join('')}
                    </div>
                </div>
                
                <div class="number-actions">
                    ${this.currentIndex > 0 ? 
                        '<button class="btn-secondary" onclick="numbersGame.prevNumber()">← Oldingi</button>' : 
                        '<button class="btn-secondary" disabled>← Oldingi</button>'
                    }
                    
                    ${this.currentIndex < this.numbers.length - 1 ? 
                        '<button class="btn-primary" onclick="numbersGame.nextNumber()">Keyingi →</button>' : 
                        '<button class="btn-primary" onclick="numbersGame.switchToQuiz()">Test 🎯</button>'
                    }
                </div>
                
                <div class="mode-switcher">
                    <button class="mode-btn" onclick="numbersGame.switchToCount()">
                        🔢 Sanash O'yini
                    </button>
                </div>
                
                <div class="numbers-grid">
                    ${this.numbers.map((n, i) => `
                        <div class="number-mini ${i === this.currentIndex ? 'active' : ''} ${i < this.currentIndex ? 'completed' : ''}"
                             onclick="numbersGame.jumpToNumber(${i})">
                            ${n.number}
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    },
    
    renderQuizMode(container) {
        const shuffled = [...this.numbers].sort(() => Math.random() - 0.5);
        const current = shuffled[this.currentQuizIndex || 0];
        const quizType = Math.random() > 0.5 ? 'number' : 'count';
        
        if (quizType === 'number') {
            this.renderNumberQuiz(container, current);
        } else {
            this.renderCountQuiz(container, current);
        }
    },
    
    renderNumberQuiz(container, current) {
        const options = this.getQuizOptions(current);
        
        container.innerHTML = `
            <div class="numbers-quiz">
                <div class="quiz-header">
                    <h3>Qaysi raqam?</h3>
                    <div class="quiz-score">
                        <span>Ball: ${this.score}</span>
                    </div>
                </div>
                
                <div class="quiz-number-display">
                    <div class="quiz-word">${current.word}</div>
                    <div class="quiz-emoji">${current.emoji}</div>
                </div>
                
                <div class="number-quiz-options">
                    ${options.map(opt => `
                        <button class="number-option" onclick="numbersGame.checkAnswer(${opt}, ${current.number})">
                            ${opt}
                        </button>
                    `).join('')}
                </div>
                
                <button class="btn-secondary" onclick="numbersGame.backToLearn()">
                    O'rganishga qaytish
                </button>
            </div>
        `;
    },
    
    renderCountQuiz(container, current) {
        const items = this.getCountingItems();
        const randomItem = items[Math.floor(Math.random() * items.length)];
        
        container.innerHTML = `
            <div class="numbers-quiz">
                <div class="quiz-header">
                    <h3>Nechta bor?</h3>
                    <div class="quiz-score">
                        <span>Ball: ${this.score}</span>
                    </div>
                </div>
                
                <div class="count-quiz-items">
                    ${Array(current.number).fill(0).map(() => `
                        <div class="quiz-item">${randomItem}</div>
                    `).join('')}
                </div>
                
                <div class="count-question">
                    <h2>How many?</h2>
                </div>
                
                <div class="number-quiz-options">
                    ${this.getQuizOptions(current).map(opt => `
                        <button class="number-option" onclick="numbersGame.checkAnswer(${opt}, ${current.number})">
                            ${opt}
                        </button>
                    `).join('')}
                </div>
                
                <button class="btn-secondary" onclick="numbersGame.backToLearn()">
                    O'rganishga qaytish
                </button>
            </div>
        `;
    },
    
    renderCountMode(container) {
        const targetNumber = Math.floor(Math.random() * 10) + 1;
        const items = this.getCountingItems();
        const randomItem = items[Math.floor(Math.random() * items.length)];
        
        container.innerHTML = `
            <div class="count-game">
                <h2>🔢 Sanash O'yini</h2>
                <p>Narsalarni bosib sanaymiz!</p>
                
                <div class="count-target">
                    <span>Maqsad: ${targetNumber}</span>
                </div>
                
                <div class="count-current">
                    <span id="currentCount">0</span>
                </div>
                
                <div class="count-click-area" id="clickArea">
                    <div class="click-item" id="clickItem">${randomItem}</div>
                    <p>Bosamiz!</p>
                </div>
                
                <div class="count-display" id="countDisplay"></div>
                
                <div class="count-actions">
                    <button class="btn-secondary" onclick="numbersGame.resetCount()">
                        🔄 Qayta boshlash
                    </button>
                    <button class="btn-primary" onclick="numbersGame.backToLearn()">
                        O'rganishga qaytish
                    </button>
                </div>
            </div>
        `;
        
        this.initCountGame(targetNumber);
    },
    
    initCountGame(target) {
        let count = 0;
        const clickArea = document.getElementById('clickArea');
        const currentCount = document.getElementById('currentCount');
        const countDisplay = document.getElementById('countDisplay');
        const clickItem = document.getElementById('clickItem');
        
        clickArea.onclick = () => {
            if (count < target) {
                count++;
                currentCount.textContent = count;
                
                // Yangi element qo'shish
                const newItem = document.createElement('div');
                newItem.className = 'counted-item';
                newItem.textContent = clickItem.textContent;
                newItem.style.animationDelay = `${count * 0.1}s`;
                countDisplay.appendChild(newItem);
                
                // Ovoz
                this.playSound(this.numbers[count - 1].word);
                
                // Animatsiya
                clickItem.style.transform = 'scale(1.3)';
                setTimeout(() => {
                    clickItem.style.transform = 'scale(1)';
                }, 200);
                
                if (count === target) {
                    setTimeout(() => {
                        this.showCountSuccess(target);
                    }, 500);
                }
            }
        };
    },
    
    showCountSuccess(target) {
        const clickArea = document.getElementById('clickArea');
        clickArea.innerHTML = `
            <div class="count-success">
                <div class="success-icon">🎉</div>
                <h3>Perfect!</h3>
                <p>You counted to ${target}!</p>
            </div>
        `;
        
        this.score += 10;
        progressTracker.addStars(2);
        this.playSuccessSound();
    },
    
    resetCount() {
        this.renderCountMode(document.getElementById('gameContent'));
    },
    
    getCountingItems() {
        return ['⭐', '🎈', '🍎', '🌸', '🐝', '🦋', '🎨', '⚽'];
    },
    
    getQuizOptions(current) {
        const options = [current.number];
        const allNumbers = this.numbers.map(n => n.number);
        
        while (options.length < 4) {
            const random = allNumbers[Math.floor(Math.random() * allNumbers.length)];
            if (!options.includes(random)) {
                options.push(random);
            }
        }
        
        return options.sort(() => Math.random() - 0.5);
    },
    
    nextNumber() {
        if (this.currentIndex < this.numbers.length - 1) {
            this.currentIndex++;
            this.playSound(this.numbers[this.currentIndex].word);
            progressTracker.updateProgress('numbers', this.currentIndex + 1);
            this.render();
        }
    },
    
    prevNumber() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.playSound(this.numbers[this.currentIndex].word);
            this.render();
        }
    },
    
    jumpToNumber(index) {
        this.currentIndex = index;
        this.playSound(this.numbers[index].word);
        this.render();
    },
    
    switchToQuiz() {
        this.mode = 'quiz';
        this.score = 0;
        this.currentQuizIndex = 0;
        this.render();
    },
    
    switchToCount() {
        this.mode = 'count';
        this.render();
    },
    
    backToLearn() {
        this.mode = 'learn';
        this.render();
    },
    
    checkAnswer(selected, correct) {
        const options = document.querySelectorAll('.number-option');
        const selectedButton = Array.from(options).find(btn => 
            parseInt(btn.textContent) === selected
        );
        
        if (selected === correct) {
            selectedButton.classList.add('correct');
            this.score += 10;
            this.playSuccessSound();
            
            setTimeout(() => {
                this.currentQuizIndex = (this.currentQuizIndex || 0) + 1;
                
                if (this.currentQuizIndex >= this.numbers.length) {
                    this.showQuizComplete();
                } else {
                    this.render();
                }
            }, 1500);
        } else {
            selectedButton.classList.add('wrong');
            this.playErrorSound();
            
            setTimeout(() => {
                this.render();
            }, 1500);
        }
    },
    
    showQuizComplete() {
        const gameContent = document.getElementById('gameContent');
        gameContent.innerHTML = `
            <div class="quiz-complete">
                <div class="complete-icon">🔢</div>
                <h2>Excellent!</h2>
                <p>Siz raqamlar testini yakunlading!</p>
                <div class="final-score">
                    <span>Ball: ${this.score}</span>
                </div>
                <div class="complete-actions">
                    <button class="btn-primary" onclick="numbersGame.switchToQuiz()">
                        Qayta urinish
                    </button>
                    <button class="btn-secondary" onclick="numbersGame.backToLearn()">
                        O'rganishga qaytish
                    </button>
                </div>
            </div>
        `;
        
        progressTracker.addStars(5);
        showReward(5, "Raqamlar testini yakunlading!");
    },
    
    playSound(word) {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(word);
            utterance.lang = 'en-US';
            utterance.rate = 0.8;
            utterance.pitch = 1.2;
            window.speechSynthesis.speak(utterance);
        }
    },
    
    playSuccessSound() {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance('Correct! Great job!');
            utterance.lang = 'en-US';
            window.speechSynthesis.speak(utterance);
        }
    },
    
    playErrorSound() {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance('Try again');
            utterance.lang = 'en-US';
            window.speechSynthesis.speak(utterance);
        }
    }
};

// CSS stillar
const numbersStyles = document.createElement('style');
numbersStyles.innerHTML = `
    .numbers-learn {
        text-align: center;
    }
    
    .number-progress {
        margin-bottom: 20px;
        font-size: 1.2rem;
        color: #7F8C8D;
        font-weight: 600;
    }
    
    .number-card {
        background: linear-gradient(135deg, #4A90E2, #9B59B6);
        padding: 50px;
        border-radius: 30px;
        margin-bottom: 30px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
    }
    
    .number-display {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 40px;
        margin-bottom: 30px;
    }
    
    .big-number {
        font-size: 10rem;
        font-weight: 700;
        color: white;
        text-shadow: 4px 4px 15px rgba(0, 0, 0, 0.3);
        animation: numberPulse 2s infinite;
    }
    
    @keyframes numberPulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
    }
    
    .number-emoji {
        font-size: 8rem;
        filter: drop-shadow(3px 3px 8px rgba(0, 0, 0, 0.3));
    }
    
    .number-word h2 {
        font-size: 4rem;
        color: white;
        margin-bottom: 20px;
        text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
    }
    
    .counting-visual {
        background: white;
        padding: 40px;
        border-radius: 20px;
        margin: 30px 0;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
    }
    
    .counting-visual h3 {
        font-size: 2rem;
        color: #2C3E50;
        margin-bottom: 25px;
    }
    
    .counting-items {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 15px;
        margin-bottom: 20px;
    }
    
    .count-item {
        font-size: 3rem;
        animation: countAppear 0.5s ease;
    }
    
    @keyframes countAppear {
        from {
            opacity: 0;
            transform: scale(0);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
    
    .count-numbers {
        display: flex;
        justify-content: center;
        gap: 20px;
        flex-wrap: wrap;
    }
    
    .count-num {
        font-size: 2rem;
        font-weight: 700;
        color: #9B59B6;
        width: 50px;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: linear-gradient(135deg, #FFE5F0, #E8D5FF);
        border-radius: 15px;
        animation: countAppear 0.5s ease;
    }
    
    .number-actions {
        display: flex;
        justify-content: center;
        gap: 20px;
        margin: 30px 0;
    }
    
    .numbers-grid {
        display: grid;
        grid-template-columns: repeat(10, 1fr);
        gap: 10px;
        padding: 20px;
        background: rgba(255, 255, 255, 0.5);
        border-radius: 20px;
    }
    
    .number-mini {
        background: white;
        padding: 15px;
        border-radius: 10px;
        font-size: 1.5rem;
        font-weight: 700;
        cursor: pointer;
        transition: all 0.3s ease;
        text-align: center;
    }
    
    .number-mini:hover {
        transform: scale(1.2);
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    }
    
    .number-mini.active {
        background: linear-gradient(135deg, #FF6B9D, #FF9F43);
        color: white;
        transform: scale(1.3);
    }
    
    .number-mini.completed {
        background: linear-gradient(135deg, #26DE81, #4A90E2);
        color: white;
    }
    
    /* Quiz */
    .quiz-number-display {
        background: linear-gradient(135deg, #667eea, #764ba2);
        padding: 50px;
        border-radius: 30px;
        margin: 30px 0;
        text-align: center;
    }
    
    .quiz-word {
        font-size: 4rem;
        font-weight: 700;
        color: white;
        margin-bottom: 20px;
        text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
    }
    
    .count-quiz-items {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 20px;
        padding: 40px;
        background: white;
        border-radius: 20px;
        margin: 30px 0;
    }
    
    .quiz-item {
        font-size: 4rem;
        animation: itemBounce 0.5s ease;
    }
    
    @keyframes itemBounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-20px); }
    }
    
    .count-question h2 {
        font-size: 2.5rem;
        color: #2C3E50;
        margin: 20px 0;
    }
    
    .number-quiz-options {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 15px;
        margin: 30px 0;
    }
    
    .number-option {
        background: linear-gradient(135deg, #4A90E2, #9B59B6);
        color: white;
        border: none;
        padding: 30px;
        font-size: 3rem;
        font-weight: 700;
        border-radius: 20px;
        cursor: pointer;
        transition: all 0.3s ease;
        font-family: 'Fredoka', sans-serif;
    }
    
    .number-option:hover {
        transform: scale(1.1);
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
    }
    
    .number-option.correct {
        background: linear-gradient(135deg, #26DE81, #4A90E2);
        animation: correct 0.5s ease;
    }
    
    .number-option.wrong {
        background: linear-gradient(135deg, #ee5a6f, #f29263);
        animation: shake 0.5s ease;
    }
    
    /* Count game */
    .count-game {
        text-align: center;
    }
    
    .count-game h2 {
        font-size: 2.5rem;
        color: #2C3E50;
        margin-bottom: 10px;
    }
    
    .count-game p {
        font-size: 1.3rem;
        color: #7F8C8D;
        margin-bottom: 25px;
    }
    
    .count-target {
        font-size: 2rem;
        font-weight: 700;
        color: #9B59B6;
        margin: 20px 0;
        padding: 20px;
        background: linear-gradient(135deg, #FFE5F0, #E8D5FF);
        border-radius: 20px;
    }
    
    .count-current {
        font-size: 8rem;
        font-weight: 700;
        color: #4A90E2;
        margin: 30px 0;
        text-shadow: 3px 3px 10px rgba(0, 0, 0, 0.1);
    }
    
    .count-click-area {
        background: linear-gradient(135deg, #667eea, #764ba2);
        padding: 80px;
        border-radius: 30px;
        cursor: pointer;
        transition: all 0.3s ease;
        margin: 30px 0;
    }
    
    .count-click-area:hover {
        transform: scale(1.05);
        box-shadow: 0 15px 50px rgba(0, 0, 0, 0.3);
    }
    
    .click-item {
        font-size: 8rem;
        transition: all 0.2s ease;
    }
    
    .count-click-area p {
        color: white;
        font-size: 2rem;
        font-weight: 700;
        margin-top: 20px;
    }
    
    .count-display {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 15px;
        min-height: 100px;
        padding: 20px;
        background: rgba(255, 255, 255, 0.5);
        border-radius: 20px;
        margin: 20px 0;
    }
    
    .counted-item {
        font-size: 3rem;
        animation: countAppear 0.3s ease;
    }
    
    .count-success {
        padding: 40px;
    }
    
    .success-icon {
        font-size: 8rem;
        margin-bottom: 20px;
    }
    
    .count-success h3 {
        font-size: 3rem;
        color: white;
        margin-bottom: 10px;
    }
    
    .count-success p {
        font-size: 1.5rem;
        color: white;
    }
    
    .count-actions {
        display: flex;
        justify-content: center;
        gap: 20px;
        margin-top: 30px;
    }
    
    /* Responsive */
    @media (max-width: 768px) {
        .big-number {
            font-size: 6rem;
        }
        
        .number-emoji {
            font-size: 5rem;
        }
        
        .number-word h2 {
            font-size: 2.5rem;
        }
        
        .counting-items {
            gap: 10px;
        }
        
        .count-item {
            font-size: 2rem;
        }
        
        .numbers-grid {
            grid-template-columns: repeat(5, 1fr);
        }
        
        .number-quiz-options {
            grid-template-columns: repeat(2, 1fr);
        }
        
        .number-option {
            padding: 20px;
            font-size: 2rem;
        }
        
        .count-click-area {
            padding: 50px;
        }
        
        .click-item {
            font-size: 5rem;
        }
        
        .count-current {
            font-size: 5rem;
        }
    }
`;

document.head.appendChild(numbersStyles);
