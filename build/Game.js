var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Game_pickedWord, _Game_actualWord, _Game_turn, _Game_actualPosition, _Game_validLetterCodes, _Game_userInterface, _Game_arrayOfCodes;
import { MAX_WORD_SIZE, MAX_ATTEMPTS } from "./env.js";
import { Letter } from "./Letter.js";
export class Game {
    constructor(pickedWord, cambiador) {
        _Game_pickedWord.set(this, void 0);
        _Game_actualWord.set(this, void 0);
        _Game_turn.set(this, void 0);
        _Game_actualPosition.set(this, void 0);
        _Game_validLetterCodes.set(this, void 0);
        _Game_userInterface.set(this, void 0);
        _Game_arrayOfCodes.set(this, void 0);
        // related to: word
        this.checkRightLetters = () => {
            for (let i = 0; i < MAX_WORD_SIZE; i++) {
                if (__classPrivateFieldGet(this, _Game_pickedWord, "f")[i] == __classPrivateFieldGet(this, _Game_actualWord, "f")[i]) {
                    __classPrivateFieldGet(this, _Game_userInterface, "f").changeBackgroundPosition(__classPrivateFieldGet(this, _Game_turn, "f"), i, "rightLetter");
                }
            }
        };
        // related to: word
        this.checkMisplacedLetters = () => {
            let actualLetter = "";
            let pattern;
            let numberOfCoincidencesPickedWord = 0;
            let numberOfCoincidencesActualWord = 0;
            let differenceOfCoincidences = 0;
            let isMisplacedLetter = true;
            for (let i = 0; i < MAX_WORD_SIZE; i++) {
                isMisplacedLetter = true;
                actualLetter = __classPrivateFieldGet(this, _Game_actualWord, "f")[i];
                pattern = new RegExp(actualLetter, "g");
                numberOfCoincidencesPickedWord = (__classPrivateFieldGet(this, _Game_pickedWord, "f").match(pattern) || [])
                    .length;
                numberOfCoincidencesActualWord = (__classPrivateFieldGet(this, _Game_actualWord, "f").match(pattern) || [])
                    .length;
                differenceOfCoincidences = Math.abs(numberOfCoincidencesActualWord - numberOfCoincidencesPickedWord);
                if (differenceOfCoincidences == 1) {
                    for (let j = 0; j < MAX_WORD_SIZE; j++) {
                        if (__classPrivateFieldGet(this, _Game_pickedWord, "f")[j] == actualLetter) {
                            isMisplacedLetter = false;
                            break;
                        }
                    }
                }
                if (differenceOfCoincidences == 0 &&
                    __classPrivateFieldGet(this, _Game_pickedWord, "f")[i] == __classPrivateFieldGet(this, _Game_actualWord, "f")[i]) {
                    isMisplacedLetter = false;
                }
                if (numberOfCoincidencesPickedWord > 0 && isMisplacedLetter)
                    __classPrivateFieldGet(this, _Game_userInterface, "f").changeBackgroundPosition(__classPrivateFieldGet(this, _Game_turn, "f"), i, "misplacedLetter");
            }
        };
        // related to: word
        this.checkWrongLetters = () => {
            let actualLetter = "";
            let pattern;
            let numberOfCoincidencesPickedWord = 0;
            for (let i = 0; i < MAX_WORD_SIZE; i++) {
                actualLetter = __classPrivateFieldGet(this, _Game_actualWord, "f")[i];
                pattern = new RegExp(actualLetter, "g");
                numberOfCoincidencesPickedWord = (__classPrivateFieldGet(this, _Game_pickedWord, "f").match(pattern) || [])
                    .length;
                if (numberOfCoincidencesPickedWord == 0)
                    __classPrivateFieldGet(this, _Game_userInterface, "f").changeBackgroundPosition(__classPrivateFieldGet(this, _Game_turn, "f"), i, "wrongLetter");
            }
        };
        this.updateAfterANewWord = () => {
            this.checkRightLetters();
            this.checkMisplacedLetters();
            this.checkWrongLetters();
            __classPrivateFieldSet(this, _Game_turn, __classPrivateFieldGet(this, _Game_turn, "f") + 1, "f");
            __classPrivateFieldSet(this, _Game_actualPosition, 0, "f");
            __classPrivateFieldSet(this, _Game_actualWord, "", "f");
            __classPrivateFieldSet(this, _Game_arrayOfCodes, [], "f");
            console.log(__classPrivateFieldGet(this, _Game_turn, "f"));
        };
        __classPrivateFieldSet(this, _Game_pickedWord, pickedWord, "f");
        __classPrivateFieldSet(this, _Game_actualWord, "", "f");
        __classPrivateFieldSet(this, _Game_turn, 1, "f");
        __classPrivateFieldSet(this, _Game_actualPosition, 0, "f");
        __classPrivateFieldSet(this, _Game_validLetterCodes, [
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
        ], "f");
        __classPrivateFieldSet(this, _Game_userInterface, cambiador, "f");
        __classPrivateFieldSet(this, _Game_arrayOfCodes, [], "f");
    }
    get pickedWord() {
        return __classPrivateFieldGet(this, _Game_pickedWord, "f");
    }
    set pickedWord(word) {
        __classPrivateFieldSet(this, _Game_pickedWord, word, "f");
    }
    get actualWord() {
        return __classPrivateFieldGet(this, _Game_actualWord, "f");
    }
    set actualWord(word) {
        __classPrivateFieldSet(this, _Game_actualWord, word, "f");
    }
    get turn() {
        return __classPrivateFieldGet(this, _Game_turn, "f");
    }
    set turn(num) {
        __classPrivateFieldSet(this, _Game_turn, num, "f");
    }
    get actualPosition() {
        return __classPrivateFieldGet(this, _Game_actualPosition, "f");
    }
    set actualPosition(num) {
        __classPrivateFieldSet(this, _Game_actualPosition, num, "f");
    }
    get validLetterCodes() {
        return __classPrivateFieldGet(this, _Game_validLetterCodes, "f");
    }
    set validLetterCodes(letters) {
        __classPrivateFieldSet(this, _Game_validLetterCodes, letters, "f");
    }
    get interface() {
        return __classPrivateFieldGet(this, _Game_userInterface, "f");
    }
    set interface(i) {
        __classPrivateFieldSet(this, _Game_userInterface, i, "f");
    }
    get codes() {
        return __classPrivateFieldGet(this, _Game_arrayOfCodes, "f");
    }
    set codes(codes) {
        __classPrivateFieldSet(this, _Game_arrayOfCodes, codes, "f");
    }
    // métodos de la clase Game
    /**
     * Toma un código como entrada y devuelve una letra como salida, según algunas reglas de transformación.
     *
     * letter = code.split("y")[1]: Divide la cadena code en partes usando el carácter "y" como separador (split("y")).
     * Luego, toma la segunda parte ([1]) del resultado y la asigna a la variable letter. Esto significa que si el código
     * no es "Semicolon", se espera que tenga el formato "algo_y_letra". Por lo tanto, la letra se extraerá de la parte
     * después de "y".
     */
    /*
    transformCodeToLetter(code: string): string {
      let letter: string = "";
      if (code == "Semicolon") {
        letter = "Ñ";
      } else {
        letter = code.split("y")[1];
        console.log("letter: " + letter);
      }
      return letter;
    }
    */
    // related to: word
    newLetter(code) {
        let letra = new Letter(code);
        // let letter: string = this.transformCodeToLetter(code);
        __classPrivateFieldGet(this, _Game_userInterface, "f").setNewLetter(this.turn, this.actualPosition, letra.letter);
        __classPrivateFieldSet(this, _Game_actualPosition, __classPrivateFieldGet(this, _Game_actualPosition, "f") + 1, "f");
        __classPrivateFieldSet(this, _Game_actualWord, __classPrivateFieldGet(this, _Game_actualWord, "f") + letra.letter, "f");
        console.log("actualWord:" + __classPrivateFieldGet(this, _Game_actualWord, "f"));
    }
    checkGameIsOver() {
        if (this.turn > MAX_ATTEMPTS) {
            location.assign("/loser");
        }
    }
    // related to: word
    checkWordIsRight() {
        if (__classPrivateFieldGet(this, _Game_actualWord, "f") == __classPrivateFieldGet(this, _Game_pickedWord, "f")) {
            location.assign("/winner");
        }
    }
    // related to: key
    enterPressed() {
        if (__classPrivateFieldGet(this, _Game_actualWord, "f").length == MAX_WORD_SIZE) {
            this.checkWordIsRight();
            this.checkGameIsOver();
            __classPrivateFieldGet(this, _Game_userInterface, "f").changeBackgroundKey(__classPrivateFieldGet(this, _Game_arrayOfCodes, "f"));
            console.log("Turno: " + this.turn);
            console.log("Max attempts: " + 6);
            this.updateAfterANewWord();
        }
    }
    // related to: key
    backspacePressed() {
        if (__classPrivateFieldGet(this, _Game_actualPosition, "f") > 0) {
            __classPrivateFieldSet(this, _Game_actualWord, __classPrivateFieldGet(this, _Game_actualWord, "f").slice(0, -1), "f");
            __classPrivateFieldSet(this, _Game_actualPosition, __classPrivateFieldGet(this, _Game_actualPosition, "f") - 1, "f");
            __classPrivateFieldGet(this, _Game_userInterface, "f").deleteLetter(__classPrivateFieldGet(this, _Game_turn, "f"), __classPrivateFieldGet(this, _Game_actualPosition, "f"));
        }
    }
    // related to: key
    newKeyPressed(code) {
        if (__classPrivateFieldGet(this, _Game_validLetterCodes, "f").includes(code) &&
            __classPrivateFieldGet(this, _Game_actualPosition, "f") < MAX_WORD_SIZE) {
            this.newLetter(code);
            __classPrivateFieldGet(this, _Game_arrayOfCodes, "f").push(code);
        }
        if (code == "Enter")
            this.enterPressed();
        if (code == "Backspace")
            this.backspacePressed();
        // Pendiente seguir corrigiendo
        // this.#userInterface.changeBackgroundKey(code);
    }
}
_Game_pickedWord = new WeakMap(), _Game_actualWord = new WeakMap(), _Game_turn = new WeakMap(), _Game_actualPosition = new WeakMap(), _Game_validLetterCodes = new WeakMap(), _Game_userInterface = new WeakMap(), _Game_arrayOfCodes = new WeakMap();
