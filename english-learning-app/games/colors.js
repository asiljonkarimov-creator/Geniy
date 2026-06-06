// ==================== RANGLAR O'YINI (COLORS GAME) ====================

const colorsGame = {
    colors: [
        { name: 'Red', hex: '#FF0000', emoji: '❤️' },
        { name: 'Blue', hex: '#0000FF', emoji: '💙' },
        { name: 'Yellow', hex: '#FFD700', emoji: '💛' },
        { name: 'Green', hex: '#00FF00', emoji: '💚' },
        { name: 'Orange', hex: '#FF8C00', emoji: '🧡' },
        { name: 'Purple', hex: '#9B59B6', emoji: '💜' },
        { name: 'Pink', hex: '#FF69B4', emoji: '💗' },
        { name: 'Brown', hex: '#8B4513', emoji: '🤎' },
        { name: 'Black', hex: '#000000', emoji: '🖤' },
        { name: 'White', hex: '#FFFFFF', emoji: '🤍' }
    ],
    
    currentIndex: 0,
    score: 0,
    mode: 'learn', // 'learn', 'quiz', 'paint'
    
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
        } else if (this.mode === 'paint') {
            this.renderPaintMode(gameContent);
        }
    },
    
    renderLearnMode(container) {
        const current = this.colors[this.currentIndex];
        
        container.innerHTML = `
            <div class="colors-learn">
                <div class="color-progress">
                    <span>${this.currentIndex + 1} / ${this.colors.length}</span>
                </div>
                
                <div class="color-card">
                    <div class="color-display" style="background: ${current.hex}">
                        <div class="color-emoji">${current.emoji}</div>
                    </div>
                    
                    <div class="color-info">
                        <h2>${current.name}</h2>
                        <p class="color-hex">${current.hex}</p>
                    </div>
                    
                    <button class="btn-sound" onclick="colorsGame.playSound('${current.name}')">
                        <span class="sound-icon">🔊</span>
                        Eshitish
                    </button>
                </div>
                
                <div class="color-examples">
                    <h3>Hayotda ${current.name} rangdagi narsalar:</h3>
                    <div class="examples-grid">
                        ${this.getColorExamples(current.name).map(ex => `
                            <div class="example-item">
                                <span class="example-emoji">${ex.emoji}</span>
                                <span class="example-text">${ex.name}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="color-actions">
                    ${this.currentIndex > 0 ? 
                        '<button class="btn-secondary" onclick="colorsGame.prevColor()">← Oldingi</button>' : 
                        '<button class="btn-secondary" disabled>← Oldingi</button>'
                    }
                    
                    ${this.currentIndex < this.colors.length - 1 ? 
                        '<button class="btn-primary" onclick="colorsGame.nextColor()">Keyingi →</button>' : 
                        '<button class="btn-primary" onclick="colorsGame.switchToQuiz()">Test 🎯</button>'
                    }
                </div>
                
                <div class="mode-switcher">
                    <button class="mode-btn" onclick="colorsGame.switchToPaint()">
                        🎨 Bo'yash O'yini
                    </button>
                </div>
                
                <div class="colors-palette">
                    ${this.colors.map((c, i) => `
                        <div class="palette-color ${i === this.currentIndex ? 'active' : ''}"
                             style="background: ${c.hex}"
                             onclick="colorsGame.jumpToColor(${i})"
                             title="${c.name}">
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    },
    
    renderQuizMode(container) {
        const shuffled = [...this.colors].sort(() => Math.random() - 0.5);
        const current = shuffled[this.currentQuizIndex || 0];
        const options = this.getQuizOptions(current);
        
        container.innerHTML = `
            <div class="colors-quiz">
                <div class="quiz-header">
                    <h3>Qaysi rang?</h3>
                    <div class="quiz-score">
                        <span>Ball: ${this.score}</span>
                    </div>
                </div>
                
                <div class="quiz-color-display" style="background: ${current.hex}">
                    <div class="quiz-emoji">${current.emoji}</div>
                </div>
                
                <div class="quiz-question">
                    <h2>Bu qanday rang?</h2>
                </div>
                
                <div class="color-quiz-options">
                    ${options.map(opt => `
                        <button class="color-option" 
                                onclick="colorsGame.checkAnswer('${opt}', '${current.name}')"
                                style="border-color: ${this.colors.find(c => c.name === opt).hex}">
                            <span class="option-color" style="background: ${this.colors.find(c => c.name === opt).hex}"></span>
                            <span class="option-name">${opt}</span>
                        </button>
                    `).join('')}
                </div>
                
                <button class="btn-secondary" onclick="colorsGame.backToLearn()">
                    O'rganishga qaytish
                </button>
            </div>
        `;
    },
    
    renderPaintMode(container) {
        container.innerHTML = `
            <div class="paint-mode">
                <h2>🎨 Bo'yash O'yini</h2>
                <p>Rangni tanlab, shakllarni bo'yang!</p>
                
                <div class="paint-colors">
                    ${this.colors.map(c => `
                        <button class="paint-color" 
                                style="background: ${c.hex}"
                                onclick="colorsGame.selectPaintColor('${c.name}', '${c.hex}')"
                                title="${c.name}">
                        </button>
                    `).join('')}
                </div>
                
                <div class="selected-color" id="selectedColor">
                    <span>Tanlangan: </span>
                    <span id="selectedColorName">Rang tanlang</span>
                </div>
                
                <div class="paint-canvas">
                    ${this.getPaintShapes().map((shape, i) => `
                        <div class="paint-shape" id="shape-${i}" onclick="colorsGame.paintShape(${i})">
                            ${shape}
                        </div>
                    `).join('')}
                </div>
                
                <div class="paint-actions">
                    <button class="btn-secondary" onclick="colorsGame.clearCanvas()">
                        🗑️ Tozalash
                    </button>
                    <button class="btn-primary" onclick="colorsGame.backToLearn()">
                        O'rganishga qaytish
                    </button>
                </div>
            </div>
        `;
    },
    
    getColorExamples(colorName) {
        const examples = {
            'Red': [
                { emoji: '🍎', name: 'Apple' },
                { emoji: '🌹', name: 'Rose' },
                { emoji: '❤️', name: 'Heart' },
                { emoji: '🍓', name: 'Strawberry' }
            ],
            'Blue': [
                { emoji: '🌊', name: 'Ocean' },
                { emoji: '🦋', name: 'Butterfly' },
                { emoji: '🫐', name: 'Blueberry' },
                { emoji: '🌌', name: 'Sky' }
            ],
            'Yellow': [
                { emoji: '☀️', name: 'Sun' },
                { emoji: '🍌', name: 'Banana' },
                { emoji: '⭐', name: 'Star' },
                { emoji: '🌼', name: 'Flower' }
            ],
            'Green': [
                { emoji: '🌳', name: 'Tree' },
                { emoji: '🍃', name: 'Leaf' },
                { emoji: '🐸', name: 'Frog' },
                { emoji: '🍏', name: 'Apple' }
            ],
            'Orange': [
                { emoji: '🍊', name: 'Orange' },
                { emoji: '🎃', name: 'Pumpkin' },
                { emoji: '🦊', name: 'Fox' },
                { emoji: '🔥', name: 'Fire' }
            ],
            'Purple': [
                { emoji: '🍇', name: 'Grapes' },
                { emoji: '🦄', name: 'Unicorn' },
                { emoji: '🍆', name: 'Eggplant' },
                { emoji: '💜', name: 'Heart' }
            ],
            'Pink': [
                { emoji: '🌸', name: 'Flower' },
                { emoji: '🐷', name: 'Pig' },
                { emoji: '🦩', name: 'Flamingo' },
                { emoji: '🎀', name: 'Ribbon' }
            ],
            'Brown': [
                { emoji: '🐻', name: 'Bear' },
                { emoji: '🍫', name: 'Chocolate' },
                { emoji: '🌰', name: 'Nut' },
                { emoji: '🪵', name: 'Wood' }
            ],
            'Black': [
                { emoji: '🐈‍⬛', name: 'Cat' },
                { emoji: '🌑', name: 'Moon' },
                { emoji: '🦇', name: 'Bat' },
                { emoji: '🕷️', name: 'Spider' }
            ],
            'White': [
                { emoji: '☁️', name: 'Cloud' },
                { emoji: '❄️', name: 'Snow' },
                { emoji: '🐑', name: 'Sheep' },
                { emoji: '🤍', name: 'Heart' }
            ]
        };
        
        return examples[colorName] || [];
    },
    
    getPaintShapes() {
        return [
            '⭐', '❤️', '🌸', '🌙', '☀️', '🦋',
            '🐠', '🏠', '🌳', '🍎', '🚗', '🎈'
        ];
    },
    
    getQuizOptions(correct) {
        const options = [correct.name];
        const allColors = this.colors.map(c => c.name);
        
        while (options.length < 4) {
            const random = allColors[Math.floor(Math.random() * allColors.length)];
            if (!options.includes(random)) {
                options.push(random);
            }
        }
        
        return options.sort(() => Math.random() - 0.5);
    },
    
    nextColor() {
        if (this.currentIndex < this.colors.length - 1) {
            this.currentIndex++;
            this.playSound(this.colors[this.currentIndex].name);
            progressTracker.updateProgress('colors', this.currentIndex + 1);
            this.render();
        }
    },
    
    prevColor() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.playSound(this.colors[this.currentIndex].name);
            this.render();
        }
    },
    
    jumpToColor(index) {
        this.currentIndex = index;
        this.playSound(this.colors[index].name);
        this.render();
    },
    
    switchToQuiz() {
        this.mode = 'quiz';
        this.score = 0;
        this.currentQuizIndex = 0;
        this.render();
    },
    
    switchToPaint() {
        this.mode = 'paint';
        this.selectedPaintColor = null;
        this.render();
    },
    
    backToLearn() {
        this.mode = 'learn';
        this.render();
    },
    
    selectPaintColor(name, hex) {
        this.selectedPaintColor = { name, hex };
        document.getElementById('selectedColorName').textContent = name;
        document.getElementById('selectedColorName').style.color = hex;
        
        this.playSound(name);
    },
    
    paintShape(index) {
        if (!this.selectedPaintColor) {
            alert('Iltimos, avval rang tanlang!');
            return;
        }
        
        const shape = document.getElementById(`shape-${index}`);
        shape.style.color = this.selectedPaintColor.hex;
        shape.style.transform = 'scale(1.2)';
        
        setTimeout(() => {
            shape.style.transform = 'scale(1)';
        }, 200);
        
        this.score += 5;
        progressTracker.addStars(1);
    },
    
    clearCanvas() {
        const shapes = document.querySelectorAll('.paint-shape');
        shapes.forEach(shape => {
            shape.style.color = '#ecf0f1';
        });
    },
    
    checkAnswer(selected, correct) {
        const options = document.querySelectorAll('.color-option');
        const selectedButton = Array.from(options).find(btn => 
            btn.querySelector('.option-name').textContent === selected
        );
        
        if (selected === correct) {
            selectedButton.classList.add('correct');
            this.score += 10;
            this.playSuccessSound();
            
            setTimeout(() => {
                this.currentQuizIndex = (this.currentQuizIndex || 0) + 1;
                
                if (this.currentQuizIndex >= this.colors.length) {
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
                <div class="complete-icon">🎨</div>
                <h2>Ajoyib!</h2>
                <p>Siz ranglar testini yakunlading!</p>
                <div class="final-score">
                    <span>Ball: ${this.score}</span>
                </div>
                <div class="complete-actions">
                    <button class="btn-primary" onclick="colorsGame.switchToQuiz()">
                        Qayta urinish
                    </button>
                    <button class="btn-secondary" onclick="colorsGame.backToLearn()">
                        O'rganishga qaytish
                    </button>
                </div>
            </div>
        `;
        
        progressTracker.addStars(5);
        showReward(5, "Ranglar testini yakunlading!");
    },
    
    playSound(colorName) {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(colorName);
            utterance.lang = 'en-US';
            utterance.rate = 0.8;
            utterance.pitch = 1.2;
            window.speechSynthesis.speak(utterance);
        }
    },
    
    playSuccessSound() {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance('Correct! Well done!');
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
const colorsStyles = document.createElement('style');
colorsStyles.innerHTML = `
    .colors-learn {
        text-align: center;
    }
    
    .color-progress {
        margin-bottom: 20px;
        font-size: 1.2rem;
        color: #7F8C8D;
        font-weight: 600;
    }
    
    .color-card {
        background: white;
        padding: 40px;
        border-radius: 30px;
        margin-bottom: 30px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
    }
    
    .color-display {
        width: 300px;
        height: 300px;
        margin: 0 auto 30px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        animation: colorPulse 2s infinite;
    }
    
    @keyframes colorPulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
    
    .color-emoji {
        font-size: 8rem;
        filter: drop-shadow(2px 2px 5px rgba(0, 0, 0, 0.3));
    }
    
    .color-info h2 {
        font-size: 3rem;
        color: #2C3E50;
        margin-bottom: 10px;
    }
    
    .color-hex {
        font-size: 1.3rem;
        color: #7F8C8D;
        font-family: monospace;
        font-weight: 600;
    }
    
    .color-examples {
        background: rgba(255, 255, 255, 0.5);
        padding: 25px;
        border-radius: 20px;
        margin: 30px 0;
    }
    
    .color-examples h3 {
        font-size: 1.5rem;
        color: #2C3E50;
        margin-bottom: 20px;
    }
    
    .examples-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
        gap: 15px;
    }
    
    .example-item {
        background: white;
        padding: 15px;
        border-radius: 15px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        transition: all 0.3s ease;
        cursor: pointer;
    }
    
    .example-item:hover {
        transform: translateY(-5px);
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
    }
    
    .example-emoji {
        font-size: 2.5rem;
    }
    
    .example-text {
        font-size: 1rem;
        font-weight: 600;
        color: #2C3E50;
    }
    
    .color-actions {
        display: flex;
        justify-content: center;
        gap: 20px;
        margin: 30px 0;
    }
    
    .mode-switcher {
        margin: 20px 0;
    }
    
    .mode-btn {
        background: linear-gradient(135deg, #FF9F43, #FED330);
        color: white;
        border: none;
        padding: 15px 40px;
        font-size: 1.3rem;
        font-weight: 600;
        border-radius: 20px;
        cursor: pointer;
        transition: all 0.3s ease;
        font-family: 'Fredoka', sans-serif;
    }
    
    .mode-btn:hover {
        transform: scale(1.05);
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
    }
    
    .colors-palette {
        display: flex;
        justify-content: center;
        gap: 10px;
        padding: 20px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 20px;
        flex-wrap: wrap;
    }
    
    .palette-color {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        cursor: pointer;
        transition: all 0.3s ease;
        border: 3px solid white;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    }
    
    .palette-color:hover {
        transform: scale(1.2);
    }
    
    .palette-color.active {
        transform: scale(1.3);
        border-color: #2C3E50;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
    }
    
    /* Quiz mode */
    .color-quiz-options {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 20px;
        margin: 30px 0;
    }
    
    .color-option {
        background: white;
        border: 4px solid;
        padding: 20px;
        border-radius: 20px;
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        gap: 15px;
        font-family: 'Fredoka', sans-serif;
    }
    
    .color-option:hover {
        transform: scale(1.05);
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
    }
    
    .option-color {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: 2px solid white;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    }
    
    .option-name {
        font-size: 1.5rem;
        font-weight: 700;
        color: #2C3E50;
    }
    
    .color-option.correct {
        background: #26DE81;
        border-color: #26DE81;
    }
    
    .color-option.correct .option-name {
        color: white;
    }
    
    .color-option.wrong {
        background: #ee5a6f;
        border-color: #ee5a6f;
        animation: shake 0.5s ease;
    }
    
    .quiz-color-display {
        width: 250px;
        height: 250px;
        margin: 30px auto;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
    }
    
    .quiz-emoji {
        font-size: 6rem;
        filter: drop-shadow(2px 2px 5px rgba(0, 0, 0, 0.3));
    }
    
    /* Paint mode */
    .paint-mode {
        text-align: center;
    }
    
    .paint-mode h2 {
        font-size: 2.5rem;
        color: #2C3E50;
        margin-bottom: 10px;
    }
    
    .paint-mode p {
        font-size: 1.3rem;
        color: #7F8C8D;
        margin-bottom: 25px;
    }
    
    .paint-colors {
        display: flex;
        justify-content: center;
        gap: 10px;
        margin: 25px 0;
        flex-wrap: wrap;
    }
    
    .paint-color {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        border: 4px solid white;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    }
    
    .paint-color:hover {
        transform: scale(1.2);
        border-color: #2C3E50;
    }
    
    .selected-color {
        font-size: 1.5rem;
        font-weight: 700;
        margin: 20px 0;
        padding: 15px;
        background: white;
        border-radius: 15px;
    }
    
    .paint-canvas {
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        gap: 15px;
        padding: 30px;
        background: white;
        border-radius: 20px;
        margin: 25px 0;
    }
    
    .paint-shape {
        font-size: 4rem;
        cursor: pointer;
        transition: all 0.3s ease;
        color: #ecf0f1;
    }
    
    .paint-shape:hover {
        transform: scale(1.2);
    }
    
    .paint-actions {
        display: flex;
        justify-content: center;
        gap: 20px;
        margin-top: 25px;
    }
    
    /* Responsive */
    @media (max-width: 768px) {
        .color-display {
            width: 200px;
            height: 200px;
        }
        
        .color-emoji,
        .quiz-emoji {
            font-size: 5rem;
        }
        
        .color-info h2 {
            font-size: 2rem;
        }
        
        .examples-grid {
            grid-template-columns: repeat(2, 1fr);
        }
        
        .color-quiz-options {
            grid-template-columns: 1fr;
        }
        
        .paint-canvas {
            grid-template-columns: repeat(4, 1fr);
        }
        
        .paint-shape {
            font-size: 3rem;
        }
    }
`;

document.head.appendChild(colorsStyles);
