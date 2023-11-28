const words = [
  'Apple', 'computer', 'game', 'moon', 'house',
  'elephant', 'orange', 'flower', 'guitar', 'Family'
];
const spanishHints = [
  'Manzana', 'Computadora', 'Juego', 'Luna', 'Hogar',
  'elefante', 'naranja', 'Flores', 'guitarra', 'Familia'
];
let selectedWord = words[Math.floor(Math.random() * words.length)];
let guessedWord = Array.from('_'.repeat(selectedWord.length));
let attempts = 0;

const wordDisplay = document.getElementById('word-display');
const lettersContainer = document.getElementById('letters');
const hangman = document.getElementById('hangman');
const spanishWord = document.getElementById('spanish-word');

wordDisplay.textContent = guessedWord.join(' ');

spanishWord.textContent = `Pista: ${spanishHints[words.indexOf(selectedWord)]}`;

for (let i = 65; i <= 90; i++) {
  const letter = String.fromCharCode(i).toLowerCase();
  const button = document.createElement('button');
  button.textContent = letter;
  button.addEventListener('click', function() {
    checkLetter(letter);
    this.disabled = true;
  });
  lettersContainer.appendChild(button);
}

function checkLetter(letter) {
  let found = false;
  for (let i = 0; i < selectedWord.length; i++) {
    if (selectedWord[i] === letter) {
      guessedWord[i] = letter;
      found = true;
    }
  }
  wordDisplay.textContent = guessedWord.join(' ');

  if (!guessedWord.includes('_')) {
    alert('¡Felicidades! Has adivinado la palabra.');
    resetGame();
  }

  if (!found) {
    attempts++;
    updateHangman();
  }
}

function updateHangman() {
  const hangmanProgress = [
    `
     _______
    |       |
    |       O
    |
    |
    |
  `,
    `
     _______
    |       |
    |       O
    |       |
    |
    |
  `,
    `
     _______
    |       |
    |       O
    |      /|
    |
    |
  `,
    `
     _______
    |       |
    |       O
    |      /|\\
    |
    |
  `,
    `
     _______
    |       |
    |       O
    |      /|\\
    |      /
    |
  `,
    `
     _______
    |       |
    |       O
    |      /|\\
    |      / \\
    |
  `
 ];

  hangman.textContent = hangmanProgress[attempts];
  if (attempts === hangmanProgress.length - 1) {
    alert('¡Has perdido! La palabra era: ' + selectedWord);
    resetGame();
  }
}

function resetGame() {
  selectedWord = words[Math.floor(Math.random() * words.length)];
  guessedWord = Array.from('_'.repeat(selectedWord.length));
  wordDisplay.textContent = guessedWord.join(' ');
  spanishWord.textContent = `Pista: ${spanishHints[words.indexOf(selectedWord)]}`;

  lettersContainer.innerHTML = ''; // Limpiar los botones existentes

  for (let i = 65; i <= 90; i++) {
    const letter = String.fromCharCode(i).toLowerCase();
    const button = document.createElement('button');
    button.textContent = letter;
    button.addEventListener('click', function() {
      checkLetter(letter);
      this.disabled = true;
    });
    lettersContainer.appendChild(button);
  }

  attempts = 0;
  hangman.textContent = '';
}

