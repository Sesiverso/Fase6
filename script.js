const words = [
    "CAATINGA", "CAPIVARA", "CERRADO", "IPÊ", "BURITI"
];

const correctWords = new Set(words);
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
    fillGrid();
}

function fillGrid() {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    document.querySelectorAll('.cell').forEach(cell => {
        const randomLetter = letters[Math.floor(Math.random() * letters.length)];
        cell.textContent = randomLetter;
    });

    words.forEach(word => {
        placeWordInGrid(word);
    });
}

function placeWordInGrid(word) {
    const direction = Math.floor(Math.random() * 3);
    let startRow, startCol;

    switch(direction) {
        case 0:
            startRow = Math.floor(Math.random() * gridSize);
            startCol = Math.floor(Math.random() * (gridSize - word.length));
            for (let i = 0; i < word.length; i++) {
                const cell = document.querySelector(`.cell[data-row='${startRow}'][data-col='${startCol + i}']`);
                cell.textContent = word[i];
                cell.dataset.word = word;
            }
            break;
        case 1:
            startRow = Math.floor(Math.random() * (gridSize - word.length));
            startCol = Math.floor(Math.random() * gridSize);
            for (let i = 0; i < word.length; i++) {
                const cell = document.querySelector(`.cell[data-row='${startRow + i}'][data-col='${startCol}']`);
                cell.textContent = word[i];
                cell.dataset.word = word;
            }
            break;
        case 2:
            startRow = Math.floor(Math.random() * (gridSize - word.length));
            startCol = Math.floor(Math.random() * (gridSize - word.length));
            for (let i = 0; i < word.length; i++) {
                const cell = document.querySelector(`.cell[data-row='${startRow + i}'][data-col='${startCol + i}']`);
                cell.textContent = word[i];
                cell.dataset.word = word;
            }
            break;
    }
}

function selectCell(cell) {
    if (!cell.classList.contains('selected')) {
        cell.classList.add('selected');
        selectedCells.push(cell);
    } else {
        cell.classList.remove('selected');
        selectedCells = selectedCells.filter(c => c !== cell);
    }
}

function checkWords() {
    const selectedWord = selectedCells.map(cell => cell.textContent).join('');
    const result = document.getElementById('result');

    if (correctWords.has(selectedWord)) {
        result.textContent = `Parabéns! Você encontrou uma característica do Cerrado: ${selectedWord}!`;
        disableWordCells(selectedWord);
        foundWords.add(selectedWord);
        selectedCells = [];
    } else {
        result.textContent = 'Palavra incorreta. Tente novamente.';
    }
}

function disableWordCells(word) {
    document.querySelectorAll(`.cell[data-word='${word}']`).forEach(cell => {
        cell.classList.add('found');
        cell.removeEventListener('click', () => selectCell(cell));
        cell.style.backgroundColor = '#28a745';
    });
}

createGrid();
