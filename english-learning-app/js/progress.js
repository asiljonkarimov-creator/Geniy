// ==================== PROGRESS TRACKER ====================

const progressTracker = {
    progress: {
        alphabet: 0,
        colors: 0,
        numbers: 0,
        animals: 0,
        matching: 0,
        shapes: 0,
        foods: 0,
        family: 0
    },
    
    totalStars: 0,
    achievements: [],
    level: 'Beginner',
    
    // Progress yuklash
    loadProgress() {
        const saved = localStorage.getItem('learningProgress');
        if (saved) {
            const data = JSON.parse(saved);
            this.progress = data.progress || this.progress;
            this.totalStars = data.totalStars || 0;
            this.achievements = data.achievements || [];
            this.level = data.level || 'Beginner';
            
            this.updateDisplay();
            this.updateGameProgress();
        }
    },
    
    // Progress saqlash
    saveProgress() {
        const data = {
            progress: this.progress,
            totalStars: this.totalStars,
            achievements: this.achievements,
            level: this.level,
            lastUpdated: new Date().toISOString()
        };
        localStorage.setItem('learningProgress', JSON.stringify(data));
    },
    
    // O'yin progressini yangilash
    updateProgress(game, value) {
        this.progress[game] = value;
        this.saveProgress();
        this.updateGameProgress();
    },
    
    // Yulduz qo'shish
    addStars(count) {
        this.totalStars += count;
        this.checkLevel();
        this.checkAchievements();
        this.saveProgress();
        this.updateDisplay();
        
        // Animatsiya
        this.animateStars(count);
    },
    
    // Darajani tekshirish
    checkLevel() {
        const levels = [
            { name: 'Beginner', stars: 0 },
            { name: 'Learner', stars: 50 },
            { name: 'Student', stars: 100 },
            { name: 'Expert', stars: 200 },
            { name: 'Master', stars: 500 }
        ];
        
        for (let i = levels.length - 1; i >= 0; i--) {
            if (this.totalStars >= levels[i].stars) {
                if (this.level !== levels[i].name) {
                    this.level = levels[i].name;
                    this.showLevelUp(levels[i].name);
                }
                break;
            }
        }
    },
    
    // Yutuqlarni tekshirish
    checkAchievements() {
        const achievements = [
            { id: 'first_lesson', name: 'Birinchi Dars', condition: () => this.totalStars >= 1 },
            { id: 'five_lessons', name: '5 Dars', condition: () => this.totalStars >= 25 },
            { id: 'ten_lessons', name: '10 Dars', condition: () => this.totalStars >= 50 },
            { id: 'first_month', name: 'Birinchi Oy', condition: () => this.totalStars >= 100 },
            { id: 'hundred_stars', name: '100 Yulduz', condition: () => this.totalStars >= 100 },
            { id: 'master', name: 'Master', condition: () => this.totalStars >= 500 }
        ];
        
        achievements.forEach((achievement, index) => {
            if (achievement.condition() && !this.achievements.includes(achievement.id)) {
                this.achievements.push(achievement.id);
                this.unlockAchievement(index, achievement.name);
            }
        });
    },
    
    // Yutuqni ochish
    unlockAchievement(index, name) {
        const achievementElements = document.querySelectorAll('.achievement');
        if (achievementElements[index]) {
            achievementElements[index].classList.remove('locked');
            achievementElements[index].classList.add('unlocked');
            
            // Animatsiya
            setTimeout(() => {
                achievementElements[index].style.animation = 'celebrate 0.8s ease';
            }, 300);
            
            // Xabar
            this.showAchievementNotification(name);
        }
    },
    
    // Daraja ko'tarilishi
    showLevelUp(levelName) {
        const notification = document.createElement('div');
        notification.className = 'level-up-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <div class="notification-icon">🎉</div>
                <h3>Level Up!</h3>
                <p>Siz endi <strong>${levelName}</strong>siz!</p>
            </div>
        `;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.5s ease';
            setTimeout(() => notification.remove(), 500);
        }, 3000);
        
        // Ovoz
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(`Level up! You are now ${levelName}!`);
            utterance.lang = 'en-US';
            window.speechSynthesis.speak(utterance);
        }
    },
    
    // Yutuq bildirishi
    showAchievementNotification(name) {
        const notification = document.createElement('div');
        notification.className = 'achievement-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <div class="notification-icon">🏆</div>
                <h3>Yangi Yutuq!</h3>
                <p><strong>${name}</strong></p>
            </div>
        `;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.5s ease';
            setTimeout(() => notification.remove(), 500);
        }, 3000);
    },
    
    // Yulduz animatsiyasi
    animateStars(count) {
        const starsEarned = document.querySelector('.stars-earned span:last-child');
        if (starsEarned) {
            starsEarned.classList.add('star-bounce');
            setTimeout(() => starsEarned.classList.remove('star-bounce'), 500);
        }
    },
    
    // Ekranni yangilash
    updateDisplay() {
        const totalStarsElement = document.getElementById('totalStars');
        const userLevelElement = document.getElementById('userLevel');
        
        if (totalStarsElement) {
            totalStarsElement.textContent = this.totalStars;
        }
        
        if (userLevelElement) {
            userLevelElement.textContent = this.level;
        }
    },
    
    // O'yin kartalarini yangilash
    updateGameProgress() {
        const maxValues = {
            alphabet: 26,
            colors: 10,
            numbers: 10,
            animals: 15,
            matching: 20,
            shapes: 6,
            foods: 20,
            family: 8
        };
        
        Object.keys(this.progress).forEach(game => {
            const card = document.querySelector(`[data-game="${game}"]`);
            if (card) {
                const progressFill = card.querySelector('.progress-fill');
                const progressText = card.querySelector('.progress-text');
                
                const current = this.progress[game];
                const max = maxValues[game];
                const percentage = (current / max) * 100;
                
                if (progressFill) {
                    progressFill.style.width = `${percentage}%`;
                }
                
                if (progressText) {
                    progressText.textContent = `${current}/${max}`;
                }
            }
        });
    },
    
    // Statistikani ko'rish
    getStats() {
        return {
            totalStars: this.totalStars,
            level: this.level,
            achievements: this.achievements.length,
            gamesCompleted: Object.values(this.progress).filter(v => v > 0).length,
            progress: this.progress
        };
    },
    
    // Progressni reset qilish (test uchun)
    reset() {
        if (confirm('Haqiqatan ham barcha progressni o\'chirmoqchimisiz?')) {
            localStorage.removeItem('learningProgress');
            this.progress = {
                alphabet: 0,
                colors: 0,
                numbers: 0,
                animals: 0,
                matching: 0,
                shapes: 0,
                foods: 0,
                family: 0
            };
            this.totalStars = 0;
            this.achievements = [];
            this.level = 'Beginner';
            this.updateDisplay();
            this.updateGameProgress();
        }
    }
};

// CSS stillar
const progressStyles = document.createElement('style');
progressStyles.innerHTML = `
    .star-bounce {
        animation: starBounce 0.5s ease !important;
    }
    
    @keyframes starBounce {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.5); }
    }
    
    .level-up-notification,
    .achievement-notification {
        position: fixed;
        top: 100px;
        right: 30px;
        background: white;
        padding: 25px 40px;
        border-radius: 20px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        animation: slideIn 0.5s ease;
    }
    
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    .notification-content {
        text-align: center;
    }
    
    .notification-icon {
        font-size: 4rem;
        margin-bottom: 15px;
    }
    
    .notification-content h3 {
        font-size: 2rem;
        color: #9B59B6;
        margin-bottom: 10px;
    }
    
    .notification-content p {
        font-size: 1.3rem;
        color: #2C3E50;
    }
    
    .achievement.unlocked {
        animation: unlockBounce 0.8s ease;
    }
    
    @keyframes unlockBounce {
        0%, 100% { transform: scale(1); }
        25% { transform: scale(1.2) rotate(-10deg); }
        75% { transform: scale(1.2) rotate(10deg); }
    }
    
    @media (max-width: 768px) {
        .level-up-notification,
        .achievement-notification {
            right: 15px;
            left: 15px;
            top: 80px;
        }
    }
`;

document.head.appendChild(progressStyles);

// Konsol uchun helper funksiyalar
window.showStats = () => {
    console.table(progressTracker.getStats());
};

window.resetProgress = () => {
    progressTracker.reset();
};
