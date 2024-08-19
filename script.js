const words = ['Cerrado', 'Capivara', 'Buritis', 'Pequi', 'Riqueza', 'Cactos', 'Jacarandá', 'Onça', 'Fazenda', 'Mangaba'];

const gridSize = 10; // Tamanho da grade do caça-palavras
const puzzleContainer = document.getElementById('puzzle-container');
const wordsList = document.getElementById('words');
const statusText = document.getElementById('status-text');

let puzzle = [];
let foundWords = [];

// Cria a grade do caça-palavras
function createPuzzle() {
    // Inicializa a grade com espaços vazios
    for (let i = 0; i < gridSize; i++) {
        puzzle[i] = [];
        for (let j = 0; j < gridSize; j++) {
            puzzle[i][j] = '';
        }
    }

    // Preenche a grade com as palavras
    words.forEach(word => placeWord(word.toUpperCase()));

    // Exibe a grade
    displayPuzzle();
}

// Coloca uma palavra na grade
function placeWord(word) {
    const directions = ['horizontal', 'vertical']; // Direções possíveis
    const direction = directions[Math.floor(Math.random() * directions.length)];
    let placed = false;

    while (!placed) {
        const startRow = Math.floor(Math.random() * gridSize);
        const startCol = Math.floor(Math.random() * gridSize);

        if (canPlaceWord(word, startRow, startCol, direction)) {
            for (let i = 0; i < word.length; i++) {
                if (direction === 'horizontal') {
                    puzzle[startRow][startCol + i] = word[i];
                } else {
                    puzzle[startRow + i][startCol] = word[i];
                }
            }
            placed = true;
        }
    }
}

// Verifica se a palavra pode ser colocada na grade
function canPlaceWord(word, row, col, direction) {
    if (direction === 'horizontal') {
        if (col + word.length > gridSize) return false;
        for (let i = 0; i < word.length; i++) {
            if (puzzle[row][col + i] !== '' && puzzle[row][col + i] !== word[i]) return false;
        }
    } else {
        if (row + word.length > gridSize) return false;
        for (let i = 0; i < word.length; i++) {
            if (puzzle[row + i][col] !== '' && puzzle[row + i][col] !== word[i]) return false;
        }
    }
    return true;
}

// Exibe a grade do caça-palavras
function displayPuzzle() {
    puzzleContainer.innerHTML = '';
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = i;
            cell.dataset.col = j;
            cell.innerText = puzzle[i][j] || '';
            cell.addEventListener('click', () => handleCellClick(i, j));
            puzzleContainer.appendChild(cell);
        }
    }
}

// Atualiza a lista de palavras
function updateWordList() {
    wordsList.innerHTML = '';
    words.forEach(word => {
        const listItem = document.createElement('li');
        listItem.innerText = word;
        wordsList.appendChild(listItem);
    });
}

// Manipula o clique em uma célula
function handleCellClick(row, col) {
    const cell = document.querySelector(`.cell[data-row='${row}'][data-col='${col}']`);
    if (cell.classList.contains('selected')) {
        cell.classList.remove('selected');
    } else {
        cell.classList.add('selected');
        checkWord(row, col);
    }
}

// Verifica se o jogador encontrou uma palavra
function checkWord(row, col) {
    const selectedCells = Array.from(document.querySelectorAll('.cell.selected'));
    const selectedWord = selectedCells.map(cell => cell.innerText).join('');
    const wordIndex = words.indexOf(selectedWord);
    if (wordIndex !== -1) {
        foundWords.push(selectedWord);
        words.splice(wordIndex, 1);
        selectedCells.forEach(cell => cell.classList.add('found'));
        statusText.innerText = `Palavras Encontradas: ${foundWords.join(', ')}`;
        if (words.length === 0) {
            statusText.innerText = 'Parabéns! Você encontrou todas as palavras!';
        }
    }
}

// Inicializa o jogo
createPuzzle();
updateWordList();
