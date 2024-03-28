import {Word} from "./Word.js";
import {Game} from "./Game.js";

// related to: word
const wordsCollection: Word = new Word(["JUEGO", "TALAR", "BAILE", "ANDAR", "MONTE", "PLAYA", "PLATA", "ARBOL", "QUESO"]);
// related to: word
const pickedWord: string = wordsCollection.getRandomWord();

console.log(pickedWord);

// inicia el juego con la palabra seleccionada
const game: Game = new Game(pickedWord);


// related to: key clicked
Array.from(document.getElementsByClassName("key")).forEach(element => element.addEventListener("click", (e)=>{
    game.newKeyPressed((<HTMLButtonElement>e.target).value);
}));

// related to: key pressed
document.addEventListener("keydown", (e)=>{
    game.newKeyPressed(e.code);
});