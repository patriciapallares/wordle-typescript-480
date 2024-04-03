import {Words} from "./Words.js";
import {Game} from "./Game.js";
import { UIChanger } from "./UIChanger.js";


// related to: word
const wordsCollection: Words = new Words(["JUEGO", "TALAR", "BAILE", "ANDAR", "MONTE", "PLAYA", "PLATA", "ARBOL", "QUESO"]);
 
// related to: word
const pickedWord: string = wordsCollection.getRandomWord();

console.log(pickedWord);

const cambiador: UIChanger = new UIChanger();

// inicia el juego con la palabra seleccionada
const game: Game = new Game(pickedWord, cambiador);

// related to: key clicked
Array.from(document.getElementsByClassName("key")).forEach(element => element.addEventListener("click", (e)=>{
    game.newKeyPressed((<HTMLButtonElement>e.target).value);
}));

// related to: key pressed
document.addEventListener("keydown", (e)=>{
    game.newKeyPressed(e.code);
    
});