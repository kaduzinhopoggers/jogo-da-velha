class Game {
    constructor(manager) {
        this.manager = manager;
        this.currentPlayer = 'X';
        this.gameMode = null;
        this.difficulty = null;
        this.board = Array(9).fill('');
        this.gameActive = true;
        this.scores = { X: 0, O: 0 };
        this.playerSymbol = 'X';
        this.aiSymbol = 'O';
        
        this.cells = document.querySelectorAll('.cell');
        this.statusDisplay = document.getElementById('status');
        this.scoreP1 = document.getElementById('score-p1');
        this.scoreP2 = document.getElementById('score-p2');
        
        this.initializeCells();
    }

    initializeCells() {
        this.cells.forEach((cell, index) => {
            cell.addEventListener('click', () => this.handleCellClick(index));
        });
    }

    initGame(gameMode, difficulty) {
        this.gameMode = gameMode;
        this.difficulty = difficulty;
        this.updatePlayerLabels();
        this.resetGame();

        if (this.gameMode === 'pve' && this.currentPlayer === this.aiSymbol) {
            this.makeAIMove();
        }
    }

    updatePlayerLabels() {
        const player1Label = document.querySelector('.player1 .player-label');
        const player2Label = document.querySelector('.player2 .player-label');
        
        if (this.gameMode === 'pve') {
            player1Label.textContent = `Jogador (${this.playerSymbol})`;
            player2Label.textContent = `IA (${this.aiSymbol})`;
        } else {
            player1Label.textContent = `Jogador 1 (${this.playerSymbol})`;
            player2Label.textContent = `Jogador 2 (${this.aiSymbol})`;
        }
    }

    handleCellClick(index) {
        if (!this.gameActive || this.board[index] !== '' || 
            (this.gameMode === 'pve' && this.currentPlayer === this.aiSymbol)) {
            return;
        }

        this.makeMove(index);

        if (this.gameMode === 'pve' && this.gameActive) {
            setTimeout(() => this.makeAIMove(), 500);
        }
    }

    makeAIMove() {
        if (!this.gameActive) return;
        const aiMove = this.manager.ai.makeMove(this.board, this.difficulty, this.aiSymbol);
        this.makeMove(aiMove);
    }

    makeMove(index) {
        this.board[index] = this.currentPlayer;
        this.cells[index].textContent = this.currentPlayer;
        this.cells[index].classList.add(this.currentPlayer.toLowerCase());

        if (this.checkWin()) {
            this.handleWin();
            return;
        }

        if (this.checkDraw()) {
            this.handleDraw();
            return;
        }

        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
        this.updateStatus();
    }

    checkWin() {
        const winPatterns = [



        ];

        return winPatterns.some(pattern => {
            const [a, b, c] = pattern;
            return this.board[a] &&
                   this.board[a] === this.board[b] &&
                   this.board[a] === this.board[c];
        });
    }

    checkDraw() {
        return this.board.every(cell => cell !== '');
    }

    handleWin() {
        this.gameActive = false;
        this.scores[this.currentPlayer]++;
        this.updateScores();
        
        const winningCombination = this.getWinningCombination();
        winningCombination.forEach(index => {
            this.cells[index].classList.add('winner');
        });

        this.manager.showWinMessage(
            this.gameMode === 'pve' && this.currentPlayer === this.aiSymbol 
                ? 'IA' 
                : this.currentPlayer
        );

        if (this.gameMode === 'pve') {
            setTimeout(() => {
                this.swapSymbols();
                this.resetBoard();
            }, 1500);
        }
    }

    handleDraw() {
        this.gameActive = false;
        this.manager.showWinMessage('empate');
    }

    getWinningCombination() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (this.board[a] && 
                this.board[a] === this.board[b] && 
                this.board[a] === this.board[c]) {
                return pattern;
            }
        }
        return [];
    }

    updateStatus() {
        this.statusDisplay.textContent = `Vez do jogador: ${this.currentPlayer}`;
    }

    updateScores() {
        this.scoreP1.textContent = this.scores.X;
        this.scoreP2.textContent = this.scores.O;
    }

    resetBoard() {
        this.board = Array(9).fill('');
        this.cells.forEach(cell => {
            cell.textContent = '';
            cell.className = 'cell';
        });
        this.gameActive = true;
        this.currentPlayer = 'X';
        this.updateStatus();
    }

    resetGame() {
        this.scores = { X: 0, O: 0 };
        this.updateScores();
        this.resetBoard();
    }

    swapSymbols() {
        [this.playerSymbol, this.aiSymbol] = [this.aiSymbol, this.playerSymbol];
        this.currentPlayer = 'X';
        this.updatePlayerLabels();
    }
} 