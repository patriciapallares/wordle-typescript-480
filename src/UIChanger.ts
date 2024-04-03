export class UIChanger {

    setNewLetter(turn: number,position: number, letter: string) {
        Array.from(document.getElementById(`row_${turn}`)!.children)[position].textContent = letter;
    }

    deleteLetter(turn: number, position: number) {
        Array.from(document.getElementById(`row_${turn}`)!.children)[position].textContent = "";
    }

    changeBackgroundPosition(turn: number, position: number, state: string){
        let positionClass = "cell-grey";
        if (state=="rightLetter") positionClass = "cell-green";
        if (state=="misplacedLetter") positionClass = "cell-orange";
        Array.from(document.getElementById(`row_${turn}`)!.children)[position].classList.add(positionClass);
    }

    /*
    changeBackgroundKey(code: string){
       const keys: any = document.getElementsByClassName("key");
       for (let key of keys) {
            if (key.value == code && code !== "Enter" && code !=="Backspace"){
                key.classList.add("keyPressed");
            }
       }
    }
*/
    changeBackgroundKey(codes: string[]){
        const keys: any = document.getElementsByClassName("key");
         for (let i = 0; i < codes.length; i++) {
             const element = codes[i];
            
             for (let key of keys) {
                 if (key.value == element && element !== "Enter"){
                     key.classList.add("keyPressed");
                 }
            }
    
         }
     }

}