class AI {
    makeMove(board, difficulty, aiSymbol) {
        this.aiSymbol = aiSymbol;
        this.humanSymbol = aiSymbol === 'X' ? 'O' : 'X';

        switch(difficulty) {
            case 'easy':
                return this.makeRandomMove(board);
            case 'medium':
                return Math.random() < 0.7 ? 
                    this.makeBestMove(board) : 
                    this.makeRandomMove(board);
            case 'hard':
                return this.makeUnbeatableMove(board);
            default:
                return this.makeRandomMove(board);
        }
    }

    makeRandomMove(board) {
        const availableMoves = board
            .map((cell, index) => cell === '' ? index : null)
            .filter(cell => cell !== null);
        
        return availableMoves[Math.floor(Math.random() * availableMoves.length)];
    }

    makeUnbeatableMove(board) {

        if (board.every(cell => cell === '')) {
            return [0, 2, 6, 8][Math.floor(Math.random() * 4)];
        }


        if (board.filter(cell => cell !== '').length === 1) {

            if (board[4] === '') return 4;

            return [0, 2, 6, 8][Math.floor(Math.random() * 4)];
        }


        const winMove = this.findWinningMove(board, this.aiSymbol);
        if (winMove !== null) return winMove;


        const blockMove = this.findWinningMove(board, this.humanSymbol);
        if (blockMove !== null) return blockMove;


        return this.makeBestMove(board);
    }

    findWinningMove(board, symbol) {
        for (let i = 0; i < board.length; i++) {
            if (board[i] === '') {
                board[i] = symbol;
                if (this.checkWinner(board) === symbol) {
                    board[i] = '';
                    return i;
                }
                board[i] = '';
            }
        }
        return null;
    }

    makeBestMove(board) {
        let bestScore = -Infinity;
        let bestMove;
        let bestMoves = [];
        

        for (let i = 0; i < board.length; i++) {
            if (board[i] === '') {
                board[i] = this.aiSymbol;
                let score = this.minimax(board, 0, false, -Infinity, Infinity);
                board[i] = '';
                
                if (score > bestScore) {
                    bestScore = score;
                    bestMoves = [i];
                } else if (score === bestScore) {
                    bestMoves.push(i);
                }
            }
        }


        const center = 4;
        const corners = [0, 2, 6, 8];
        const edges = [1, 3, 5, 7];


        if (bestMoves.includes(center)) {
            return center;
        }


        const availableCorners = bestMoves.filter(move => corners.includes(move));
        if (availableCorners.length > 0) {
            return availableCorners[Math.floor(Math.random() * availableCorners.length)];
        }


        return bestMoves[Math.floor(Math.random() * bestMoves.length)];
    }

    minimax(board, depth, isMaximizing, alpha, beta) {
        const result = this.checkWinner(board);
        if (result !== null) {
            if (result === this.aiSymbol) return 10 - depth;
            if (result === this.humanSymbol) return depth - 10;
            return 0;
        }

        if (isMaximizing) {
            let bestScore = -Infinity;
            for (let i = 0; i < board.length; i++) {
                if (board[i] === '') {
                    board[i] = this.aiSymbol;
                    let score = this.minimax(board, depth + 1, false, alpha, beta);
                    board[i] = '';
                    bestScore = Math.max(score, bestScore);
                    alpha = Math.max(alpha, bestScore);
                    if (beta <= alpha) break;
                }
            }
            return bestScore;
        } else {
            let bestScore = Infinity;
            for (let i = 0; i < board.length; i++) {
                if (board[i] === '') {
                    board[i] = this.humanSymbol;
                    let score = this.minimax(board, depth + 1, true, alpha, beta);
                    board[i] = '';
                    bestScore = Math.min(score, bestScore);
                    beta = Math.min(beta, bestScore);
                    if (beta <= alpha) break;
                }
            }
            return bestScore;
        }
    }

    checkWinner(board) {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }

        return board.includes('') ? null : 'draw';
    }
} 