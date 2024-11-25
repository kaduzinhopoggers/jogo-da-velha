class GameManager {
    constructor() {
        this.gameMode = null;
        this.difficulty = null;
        this.initializeElements();
        this.setupEventListeners();
        this.game = new Game(this);
        this.ai = new AI();
    }

    initializeElements() {
      
        this.menuContainer = document.getElementById('menu');
        this.difficultyContainer = document.getElementById('difficulty-select');
        this.gameContainer = document.getElementById('game-container');
        
        

        this.menuButtons = document.querySelectorAll('.menu-btn');
        this.difficultyButtons = document.querySelectorAll('.difficulty-btn');
        this.backButton = document.querySelector('.back-btn');
        this.resetButton = document.querySelector('.reset-btn');
        this.menuReturnButton = document.querySelector('.menu-return-btn');
    }

    setupEventListeners() {

        this.menuButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.gameMode = button.dataset.mode;
                if (this.gameMode === 'pve') {
                    this.showDifficultySelect();
                } else {
                    this.startGame();
                }
            });
        });


        this.difficultyButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.difficulty = button.dataset.difficulty;
                this.startGame();
            });
        });


        this.backButton.addEventListener('click', () => this.showMenu());
        this.resetButton.addEventListener('click', () => this.game.resetGame());
        this.menuReturnButton.addEventListener('click', () => this.showMenu());
    }

    showMenu() {
        this.menuContainer.style.display = 'flex';
        this.difficultyContainer.style.display = 'none';
        this.gameContainer.style.display = 'none';
    }

    showDifficultySelect() {
        this.menuContainer.style.display = 'none';
        this.difficultyContainer.style.display = 'flex';
        this.gameContainer.style.display = 'none';
    }

    startGame() {
        this.menuContainer.style.display = 'none';
        this.difficultyContainer.style.display = 'none';
        this.gameContainer.style.display = 'block';
        this.game.initGame(this.gameMode, this.difficulty);
    }

    showWinMessage(winner) {
        const modal = document.createElement('div');
        modal.className = 'win-modal';
        
        const content = document.createElement('div');
        content.className = 'win-content';
        
        const message = document.createElement('h2');
        message.textContent = winner === 'empate' ? 
            'Empate!' : 
            `Jogador ${winner} venceu!`;
        
        const button = document.createElement('button');
        button.textContent = 'Continuar';
        button.className = 'menu-btn';
        button.onclick = () => {
            document.body.removeChild(modal);
            this.game.resetBoard();
        };

        content.appendChild(message);
        content.appendChild(button);
        modal.appendChild(content);
        document.body.appendChild(modal);
    }
}
function checkWinner() {
    // ... lógica para verificar o vencedor ...
    if (vencedor) {
        displayVictoryMessage(vencedor); // Chama a função para mostrar a mensagem de vitória
    }
}
// Nova função para exibir a mensagem de vitória
function displayVictoryMessage(vencedor) {
    const statusElement = document.getElementById('status');
    statusElement.textContent = `Jogador ${vencedor} venceu!`;
    // Você pode adicionar mais lógica aqui, como desabilitar o tabuleiro ou reiniciar o jogo
}

document.addEventListener('DOMContentLoaded', () => {
    new GameManager();
}); 