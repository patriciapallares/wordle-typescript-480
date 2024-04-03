import { MAX_WORD_SIZE, MAX_ATTEMPTS } from "./env.js";
import { Letter } from "./Letter.js";
import { UIChanger } from "./UIChanger.js";

export class Game {
  #pickedWord: string;
  #actualWord: string;
  #turn: number;
  #actualPosition: number;
  #validLetterCodes: string[];
  #userInterface: UIChanger;
  #arrayOfCodes: string[];
  constructor(pickedWord: string, cambiador: UIChanger) {
    this.#pickedWord = pickedWord;
    this.#actualWord = "";
    this.#turn = 1;
    this.#actualPosition = 0;
    this.#validLetterCodes = [
      "KeyQ",
      "KeyW",
      "KeyE",
      "KeyR",
      "KeyT",
      "KeyY",
      "KeyU",
      "KeyI",
      "KeyO",
      "KeyP",
      "KeyA",
      "KeyS",
      "KeyD",
      "KeyF",
      "KeyG",
      "KeyH",
      "KeyJ",
      "KeyK",
      "KeyL",
      "KeyZ",
      "KeyX",
      "KeyC",
      "KeyV",
      "KeyB",
      "KeyN",
      "KeyM",
      "Semicolon",
    ];
    this.#userInterface = cambiador;
    this.#arrayOfCodes = [];
  }

  get pickedWord() {
    return this.#pickedWord;
  }
  set pickedWord(word) {
    this.#pickedWord = word;
  }

  get actualWord() {
    return this.#actualWord;
  }
  set actualWord(word) {
    this.#actualWord = word;
  }

  get turn() {
    return this.#turn;
  }
  set turn(num) {
    this.#turn = num;
  }

  get actualPosition() {
    return this.#actualPosition;
  }
  set actualPosition(num) {
    this.#actualPosition = num;
  }

  get validLetterCodes() {
    return this.#validLetterCodes;
  }
  set validLetterCodes(letters) {
    this.#validLetterCodes = letters;
  }

  get interface() {
    return this.#userInterface;
  }
  set interface(i) {
    this.#userInterface = i;
  }
  get codes(): string[] {
    return this.#arrayOfCodes;
  }

  set codes(codes: string[]) {
    this.#arrayOfCodes = codes;
  }

  // related to: word
  newLetter(code: string): void {
    let letra: Letter = new Letter(code);
    this.#userInterface.setNewLetter(
      this.turn,
      this.actualPosition,
      letra.letter
    );
    this.#actualPosition = this.#actualPosition + 1;
    this.#actualWord += letra.letter;
    // console.log("actualWord:" + this.#actualWord);
  }

  // related to: word
  checkRightLetters = (): void => {
    for (let i = 0; i < MAX_WORD_SIZE; i++) {
      if (this.#pickedWord[i] == this.#actualWord[i]) {
        this.#userInterface.changeBackgroundPosition(
          this.#turn,
          i,
          "rightLetter"
        );
      }
    }
  };

  // related to: word
  checkMisplacedLetters = (): void => {
    let actualLetter: string = "";
    let pattern: RegExp;
    let numberOfCoincidencesPickedWord: number = 0;
    let numberOfCoincidencesActualWord: number = 0;
    let differenceOfCoincidences: number = 0;
    let isMisplacedLetter: boolean = true;
    for (let i = 0; i < MAX_WORD_SIZE; i++) {
      isMisplacedLetter = true;
      actualLetter = this.#actualWord[i];
      pattern = new RegExp(actualLetter, "g");
      numberOfCoincidencesPickedWord = (this.#pickedWord.match(pattern) || [])
        .length;
      numberOfCoincidencesActualWord = (this.#actualWord.match(pattern) || [])
        .length;
      differenceOfCoincidences = Math.abs(
        numberOfCoincidencesActualWord - numberOfCoincidencesPickedWord
      );
      if (differenceOfCoincidences == 1) {
        for (let j = 0; j < MAX_WORD_SIZE; j++) {
          if (this.#pickedWord[j] == actualLetter) {
            isMisplacedLetter = false;
            break;
          }
        }
      }
      if (
        differenceOfCoincidences == 0 &&
        this.#pickedWord[i] == this.#actualWord[i]
      ) {
        isMisplacedLetter = false;
      }
      if (numberOfCoincidencesPickedWord > 0 && isMisplacedLetter)
        this.#userInterface.changeBackgroundPosition(
          this.#turn,
          i,
          "misplacedLetter"
        );
    }
  };

  // related to: word
  checkWrongLetters = (): void => {
    let actualLetter = "";
    let pattern: RegExp;
    let numberOfCoincidencesPickedWord = 0;
    for (let i = 0; i < MAX_WORD_SIZE; i++) {
      actualLetter = this.#actualWord[i];
      pattern = new RegExp(actualLetter, "g");
      numberOfCoincidencesPickedWord = (this.#pickedWord.match(pattern) || [])
        .length;
      if (numberOfCoincidencesPickedWord == 0)
        this.#userInterface.changeBackgroundPosition(
          this.#turn,
          i,
          "wrongLetter"
        );
    }
  };

  updateAfterANewWord = (): void => {
    this.checkRightLetters();
    this.checkMisplacedLetters();
    this.checkWrongLetters();
    this.#turn = this.#turn + 1;
    this.#actualPosition = 0;
    this.#actualWord = "";
    this.#arrayOfCodes = [];
  };

  checkGameIsOver(): void {
    if (this.#actualWord == this.#pickedWord) {
      location.assign("/winner");
    } else if (this.turn >= MAX_ATTEMPTS) {
      location.assign("/loser");
    }
  }

  // related to: word

  checkWordIsRight(): void {
    if (this.#actualWord == this.#pickedWord) {
      location.assign("/winner");
    }
  }

  // related to: key
  enterPressed(): void {
    if (this.#actualWord.length == MAX_WORD_SIZE) {
      // this.checkWordIsRight();
      this.checkGameIsOver();

      this.#userInterface.changeBackgroundKey(this.#arrayOfCodes);

      console.log("Turno: " + this.turn);
      console.log("Max attempts: " + 6);

      this.updateAfterANewWord();
    }
  }
  // related to: key
  backspacePressed(): void {
    if (this.#actualPosition > 0) {
      this.#actualWord = this.#actualWord.slice(0, -1);
      this.#actualPosition -= 1;
      this.#userInterface.deleteLetter(this.#turn, this.#actualPosition);
    }
  }

  // related to: key
  newKeyPressed(code: string): void {
    if (
      this.#validLetterCodes.includes(code) &&
      this.#actualPosition < MAX_WORD_SIZE
    ) {
      this.newLetter(code);
      this.#arrayOfCodes.push(code);
    }

    if (code == "Enter") this.enterPressed();
    if (code == "Backspace") this.backspacePressed();
  }
}
