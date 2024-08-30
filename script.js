const words = [
    "TAMANDUA", "IPE", "PEQUI", "SECO", "FERTIL"
];

const gridSize = 10;
let selectedCells = [];
let foundWords = new Set();

const wordsearch = document.getElementById('wordsearch');

function createGrid() {
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = i;
            cell.dataset.col = j;
            cell.addEventListener('click', () => selectCell(cell));
            wordsearch.appendChild(cell);
        }
    }
    fillGridWithRandomLetters();
    placeWordsInGrid();
}

function fillGridWithRandomLetters() {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    document.querySelectorAll('.cell').forEach(cell => {
        cell.textContent = letters[Math.floor(Math.random() * letters.length)];
    });
}

function placeWordsInGrid() {
    words.forEach(word => {
        let placed = false;
        while (!placed) {
            const direction = Math.floor(Math.random() * 8); // 0-7 para todas as direções
            const {startRow, startCol, valid} = getStartPosition(word, direction);
            if (valid) {
                placeWord(word, startRow, startCol, direction);
                placed = true;
            }
        }
    });
}

function getStartPosition(word, direction) {
    let startRow, startCol, valid = true;

    switch(direction) {
        case 0: // Horizontal
            startRow = Math.floor(Math.random() * gridSize);
            startCol = Math.floor(Math.random() * (gridSize - word.length));
            if (!canPlaceWord(startRow, startCol, word.length, direction)) valid = false;
            break;
        case 1: // Vertical
            startRow = Math.floor(Math.random() * (gridSize - word.length));
            startCol = Math.floor(Math.random() * gridSize);
            if (!canPlaceWord(startRow, startCol, word.length, direction)) valid = false;
            break;
        case 2: // Diagonal Descendente
            startRow = Math.floor(Math.random() * (gridSize - word.length));
            startCol = Math.floor(Math.random() * (gridSize - word.length));
            if (!canPlaceWord(startRow, startCol, word.length, direction)) valid = false;
            break;
        case 3: // Diagonal Ascendente
            startRow = Math.floor(Math.random() * word.length) + word.length - 1;
            startCol = Math.floor(Math.random() * (gridSize - word.length));
            if (!canPlaceWord(startRow, startCol, word.length, direction)) valid = false;
            break;
        case 4: // Horizontal Reversa
            startRow = Math.floor(Math.random() * gridSize);
            startCol = Math.floor(Math.random() * (gridSize - word.length)) + word.length - 1;
            if (!canPlaceWord(startRow, startCol, word.length, direction)) valid = false;
            break;
        case 5: // Vertical Reversa
            startRow = Math.floor(Math.random() * (gridSize - word.length)) + word.length - 1;
            startCol = Math.floor(Math.random() * gridSize);
            if (!canPlaceWord(startRow, startCol, word.length, direction)) valid = false;
            break;
        case 6: // Diagonal Ascendente Reversa
            startRow = Math.floor(Math.random() * (gridSize - word.length));
            startCol = Math.floor(Math.random() * (gridSize - word.length));
            if (!canPlaceWord(startRow + word.length - 1, startCol, word.length, direction)) valid = false;
            break;
        case 7: // Diagonal Descendente Reversa
            startRow = Math.floor(Math.random() * (gridSize - word.length));
            startCol = Math.floor(Math.random() * (gridSize - word.length));
            if (!canPlaceWord(startRow, startCol + word.length - 1, word.length, direction)) valid = false;
            break;
        default:
            valid = false;
    }
    return {startRow, startCol, valid};
}

function canPlaceWord(row, col, length, direction) {
    for (let i = 0; i < length; i++) {
        const r = row + (direction === 1 ? i : 0) + (direction === 3 ? -i : 0);
        const c = col + (direction === 0 ? i : 0) + (direction === 2 ? i : 0) + (direction === 6 ? -i : 0) + (direction === 7 ? -i : 0);
        const cell = document.querySelector(`.cell[data-row='${r}'][data-col='${c}']`);
        if (!cell || (cell.textContent !== "" && cell.textContent !== word[i])) {
            return false;
        }
    }
    return true;
}

function placeWord(word, startRow, startCol, direction) {
    for (let i = 0; i < word.length; i++) {
        const r = startRow + (direction === 1 ? i : 0) + (direction === 3 ? -i : 0);
        const c = startCol + (direction === 0 ? i : 0) + (direction === 2 ? i : 0) + (direction === 6 ? -i : 0) + (direction === 7 ? -i : 0);
        const cell = document.querySelector(`.cell[data-row='${r}'][data-col='${c}']`);
        cell.textContent = word[i];
        cell.dataset.word = word;
    }
}

function selectCell(cell) {
    if (selectedCells.length === 2) {
        selectedCells[0].classList.remove('selected');
        selectedCells[1].classList.remove('selected');
        selectedCells = [];
    }

    selectedCells.push(cell);
    cell.classList.add('selected');

    if (selectedCells.length === 2) {
        checkSelection();
    }
}

function checkSelection() {
    const [cell1, cell2] = selectedCells;
    const word = extractWordFromSelection(cell1, cell2);

    if (correctWords.has(word)) {
        foundWords.add(word);
        document.getElementById('result').textContent = `Palavra encontrada: ${word}`;
        cell1.classList.add('found');
        cell2.classList.add('found');
    } else {
        cell1.classList.remove('selected');
        cell2.classList.remove('selected');
    }

    selectedCells = [];
}

function extractWordFromSelection(cell1, cell2) {
    const word = [];
    const row1 = parseInt(cell1.dataset.row);
    const col1 = parseInt(cell1.dataset.col);
    const row2 = parseInt(cell2.dataset.row);
    const col2 = parseInt(cell2.dataset.col);

    if (row1 === row2) { // Horizontal
        const start = Math.min(col1, col2);
        for (let i = start; i <= Math.max(col1, col2); i++) {
            word.push(document.querySelector(`.cell[data-row='${row1}'][data-col='${i}']`).textContent);
        }
    } else if (col1 === col2) { // Vertical
        const start = Math.min(row1, row2);
        for (let i = start; i <= Math.max(row1, row2); i++) {
            word.push(document.querySelector(`.cell[data-row='${i}'][data-col='${col1}']`).textContent);
        }
    } else if (row1 - row2 === col1 - col2) { // Diagonal Descendente
        const startRow = Math.min(row1, row2);
        const startCol = Math.min(col1, col2);
        for (let i = 0; i <= Math.abs(row1 - row2); i++) {
            word.push(document.querySelector(`.cell[data-row='${startRow + i}'][data-col='${startCol + i}']`).textContent);
        }
    } else if (row2 - row1 === col1 - col2) { // Diagonal Ascendente
        const startRow = Math.min(row1, row2);
        const startCol = Math.max(col1, col2);
        for (let i = 0; i <= Math.abs(row1 - row2); i++) {
            word.push(document.querySelector(`.cell[data-row='${startRow + i}'][data-col='${startCol - i}']`).textContent);
        }
    }

    return word.join('');
}

function checkWords() {
    const found = Array.from(foundWords).join(', ');
    document.getElementById('result').textContent = `Palavras encontradas: ${found}`;
}

createGrid();
