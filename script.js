document.addEventListener("DOMContentLoaded", () => {
    const words = ["CERRADO", "ARARA", "CAPIVARA", "BURITIS", "SAVANA"];
    const grid = document.getElementById("puzzle-container");
    const tipsDiv = document.getElementById("tips");
    const resultDiv = document.getElementById("result");
    
    let puzzle = createPuzzle(words);
    
    function renderPuzzle() {
        grid.innerHTML = '';
        puzzle.forEach(row => {
            row.forEach(cell => {
                const div = document.createElement("div");
                div.className = "cell";
                div.textContent = cell;
                grid.appendChild(div);
            });
        });
    }
    
    function createPuzzle(words) {
        const size = 9;
        let grid = Array.from({ length: size }, () => Array(size).fill(''));
        words.forEach(word => {
            let placed = false;
            while (!placed) {
                let direction = Math.random() > 0.5 ? 'H' : 'V'; // Horizontal ou Vertical
                let row = Math.floor(Math.random() * size);
                let col = Math.floor(Math.random() * size);
                
                if (canPlaceWord(word, row, col, direction)) {
                    placeWord(word, row, col, direction);
                    placed = true;
                }
            }
        });
        return grid;
    }
    
    function canPlaceWord(word, row, col, direction) {
        if (direction === 'H') {
            if (col + word.length > 9) return false;
            for (let i = 0; i < word.length; i++) {
                if (grid[row][col + i] && grid[row][col + i] !== word[i]) return false;
            }
        } else {
            if (row + word.length > 6) return false;
            for (let i = 0; i < word.length; i++) {
                if (grid[row + i][col] && grid[row + i][col] !== word[i]) return false;
            }
        }
        return true;
    }
    
    function placeWord(word, row, col, direction) {
        if (direction === 'H') {
            for (let i = 0; i < word.length; i++) {
                grid[row][col + i] = word[i];
            }
        } else {
            for (let i = 0; i < word.length; i++) {
                grid[row + i][col] = word[i];
            }
        }
    }
    
    document.getElementById("check-words").addEventListener("click", () => {
        resultDiv.textContent = "Palavras verificadas!";
        // Lógica de verificação de palavras vai aqui
    });
    
    document.getElementById("show-tips").addEventListener("click", () => {
        tipsDiv.textContent = `Dicas: ${words.join(", ")}`;
    });
    
    renderPuzzle();
});
