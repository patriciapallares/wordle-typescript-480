export class Word {

    #words: string[];
    constructor(wordsArray: string[]){
        this.#words = wordsArray;
    }

    get words(){
        return this.#words;
    }
    set words(wordsArray: string[]){
        this.#words = wordsArray;
    }

    /**
     * 
     * @returns palabra aleatoria de un conjunto de palabras almacenadas en un array
     */
    
    getRandomWord():string {
        const min = 0;
        const max = this.#words.length-1;
        return this.#words[Math.trunc(Math.random() * (max - min + 1))]
    }
    // Quizá aquí debería haber más métodos relacionados
    
}