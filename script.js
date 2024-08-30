const words = [
    "TAMANDUA", "IPE", "PEQUI", "SECO", "FERTIL"
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
    const direction = Math.floor(Math.random() * 8); // 0-7 para todas as direções
    let startRow, startCol;

    switch(direction) {
        case 0: // Horizontal
            startRow = Math.floor(Math.random() * gridSize);
            startCol = Math.floor(Math.random() * (gridSize - word.length));
            for (let i = 0; i < word.length; i++) {
                const cell = document.querySelector(`.cell[data-row='${startRow}'][data-col='${startCol + i}']`);
                cell.textContent = word[i];
                cell.dataset.word = word;
            }
            break;
        case 1: // Vertical
            startRow = Math.floor(Math.random() * (gridSize - word.length));
            startCol = Math.floor(Math.random() * gridSize);
            for (let i = 0; i < word.length; i++) {
                const cell = document.querySelector(`.cell[data-row='${startRow + i}'][data-col='${startCol}']`);
                cell.textContent = word[i];
                cell.dataset.word = word;
            }
            break;
        case 2: // Diagonal Descendente
            startRow = Math.floor(Math.random() * (gridSize - word.length));
            startCol = Math.floor(Math.random() * (gridSize - word.length));
            for (let i = 0; i < word.length; i++) {
                const cell = document.querySelector(`.cell[data-row='${startRow + i}'][data-col='${startCol + i}']`);
                cell.textContent = word[i];
                cell.dataset.word = word;
            }
            break;
        case 3: // Diagonal Ascendente
            startRow = Math.floor(Math.random() * word.length) + word.length - 1;
            startCol = Math.floor(Math.random() * (gridSize - word.length));
            for (let i = 0; i < word.length; i++) {
                const cell = document.querySelector(`.cell[data-row='${startRow - i}'][data-col='${startCol + i}']`);
                cell.textContent = word[i];
                cell.dataset.word = word;
            }
            break;
        case 4: // Horizontal Reversa
            startRow = Math.floor(Math.random() * gridSize);
            startCol = Math.floor(Math
