import {MAX_WORD_SIZE, MAX_ATTEMPTS} from "./env.js";
import {UIChanger} from "./UIChanger.js";

export class Game {
    #pickedWord: string
    #actualWord: string
    #turn: number
    #actualPosition: number
    #validLetterCodes: string[]
    #userInterface: UIChanger
    constructor(pickedWord: string){
        this.#pickedWord = pickedWord;
        this.#actualWord = "";
        this.#turn = 1;
        this.#actualPosition = 0;
        this.#validLetterCodes = ["KeyQ", "KeyW", "KeyE", "KeyR", "KeyT", "KeyY", "KeyU", "KeyI", "KeyO", "KeyP", "KeyA", "KeyS", "KeyD", "KeyF", "KeyG", "KeyH", "KeyJ", "KeyK", "KeyL", "KeyZ", "KeyX", "KeyC", "KeyV", "KeyB", "KeyN", "KeyM", "Semicolon"];
        // No se debería instanciar aquí. Debería ser en script.ts y pasarlo por parámetro
        this.#userInterface = new UIChanger();
    }

    get pickedWord(){
        return this.#pickedWord;
    }
    set pickedWord(word){
        this.#pickedWord = word;
    }

    get actualWord(){
        return this.#actualWord;
    }
    set actualWord(word){
        this.#actualWord = word;
    }

    get turn(){
        return this.#turn;
    }
    set turn(num){
        this.#turn = num;
    }

    get actualPosition(){
        return this.#actualPosition;
    }
    set actualPosition(num){
        this.#actualPosition = num;
    }

    get validLetterCodes() {
        return this.#validLetterCodes
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

    // métodos de la clase Game
    
    // related to: key
    isValidLetter(code: string):boolean {
        return  this.#validLetterCodes.includes(code) && this.#actualPosition < MAX_WORD_SIZE;
     }
    // related to: key
    isEnterKey(code: string):boolean {
        return code=="Enter";
    }
    // related to: key
    isBackspaceKey(code: string):boolean{
        return code=="Backspace";
    }


    /**
     * Toma un código como entrada y devuelve una letra como salida, según algunas reglas de transformación.
     * 
     * letter = code.split("y")[1]: Divide la cadena code en partes usando el carácter "y" como separador (split("y")). 
     * Luego, toma la segunda parte ([1]) del resultado y la asigna a la variable letter. Esto significa que si el código 
     * no es "Semicolon", se espera que tenga el formato "algo_y_letra". Por lo tanto, la letra se extraerá de la parte 
     * después de "y".
     */
    transformCodeToLetter(code: string):string{
        let letter: string = "";
        if (code=="Semicolon") {
            letter = "Ñ"
        }
        else{          
            letter = code.split("y")[1]
            console.log("letter: "+ letter);
            
        };
        return letter;
    }

    // related to: word
    newLetter(code: string):void{
        let letter: string = this.transformCodeToLetter(code);
        this.#userInterface.setNewLetter(this.turn, this.actualPosition, letter);
        this.#actualPosition = this.#actualPosition + 1;
        this.#actualWord += letter;
        console.log("actualWord:" + this.#actualWord);
    }

    // related to: word
    checkWordIsRight():void{
        if (this.#actualWord == this.#pickedWord){
            location.assign("/winner");
        }
    }

    // related to: word
    checkRightLetters = ():void=>{
        for(let i=0; i<MAX_WORD_SIZE; i++){
            if (this.#pickedWord[i]==this.#actualWord[i]){
                this.#userInterface.changeBackgroundPosition(this.#turn, i, "rightLetter");
            }
        }
    }
    // related to: word
    checkMisplacedLetters = ():void=> {
        let actualLetter: string = "";
        let pattern: RegExp;
        let numberOfCoincidencesPickedWord: number = 0;
        let numberOfCoincidencesActualWord: number = 0;
        let differenceOfCoincidences: number = 0;
        let isMisplacedLetter: boolean = true;
        for (let i=0; i<MAX_WORD_SIZE; i++){
            isMisplacedLetter = true;
            actualLetter = this.#actualWord[i];
            pattern = new RegExp(actualLetter,"g");
            numberOfCoincidencesPickedWord = (this.#pickedWord.match(pattern)||[]).length;
            numberOfCoincidencesActualWord = (this.#actualWord.match(pattern)||[]).length;
            differenceOfCoincidences = Math.abs(numberOfCoincidencesActualWord - numberOfCoincidencesPickedWord);
            if (differenceOfCoincidences==1){
                for (let j=0; j<MAX_WORD_SIZE; j++){
                    if(this.#pickedWord[j]==actualLetter) {
                        isMisplacedLetter = false;
                        break;
                    }
                }
            }
            if (differenceOfCoincidences==0 && this.#pickedWord[i]==this.#actualWord[i]){
                isMisplacedLetter=false;
            }
            if (numberOfCoincidencesPickedWord>0 && isMisplacedLetter) this.#userInterface.changeBackgroundPosition(this.#turn, i, "misplacedLetter");
            
        }
    }
    // related to: word
    checkWrongLetters = ():void=>{
        let actualLetter = "";
        let pattern:RegExp;
        let numberOfCoincidencesPickedWord = 0;
        for (let i=0; i<MAX_WORD_SIZE; i++){
            actualLetter = this.#actualWord[i];
            pattern = new RegExp(actualLetter,"g");
            numberOfCoincidencesPickedWord = (this.#pickedWord.match(pattern)||[]).length;
            if (numberOfCoincidencesPickedWord==0) this.#userInterface.changeBackgroundPosition(this.#turn, i, "wrongLetter");
        }
    }

    
    updateAfterANewWord = ():void=>{
        this.checkRightLetters();
        this.checkMisplacedLetters();
        this.checkWrongLetters();
        this.#turn = this.#turn + 1;
        this.#actualPosition = 0;
        this.#actualWord = "";
    }

    checkGameIsOver():void{
        if (this.turn == MAX_ATTEMPTS){
            location.assign("/loser");
        }
    }
    // related to: key
    enterPressed():void{
        if (this.#actualWord.length == MAX_WORD_SIZE){
            this.checkWordIsRight();
            this.checkGameIsOver();
            this.updateAfterANewWord();
        }
    }
    // related to: key
    backspacePressed():void{
        if (this.#actualPosition > 0) {
            this.#actualPosition -= 1;
            this.#userInterface.deleteLetter(this.#turn, this.#actualPosition);
        }
    }
    // related to: key
    newKeyPressed(code: string):void{ 
        console.log(code);
        // si es una letra válida:
        if (this.isValidLetter(code)) this.newLetter(code);
        // si es enter
        if (this.isEnterKey(code)) this.enterPressed();
        // si es la tecla de borrar
        if (this.isBackspaceKey(code)) this.backspacePressed();
        // Pendiente seguir corrigiendo
        //  this.#userInterface.changeBackgroundKey(code);
    }

    
}