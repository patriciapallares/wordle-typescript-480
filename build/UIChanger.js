export class UIChanger {
    setNewLetter(turn, position, letter) {
        Array.from(document.getElementById(`row_${turn}`).children)[position].textContent = letter;
    }
    deleteLetter(turn, position) {
        Array.from(document.getElementById(`row_${turn}`).children)[position].textContent = "";
    }
    changeBackgroundPosition(turn, position, state) {
        let positionClass = "cell-grey";
        if (state == "rightLetter")
            positionClass = "cell-green";
        if (state == "misplacedLetter")
            positionClass = "cell-orange";
        Array.from(document.getElementById(`row_${turn}`).children)[position].classList.add(positionClass);
    }
    changeBackgroundKey(codes) {
        const keys = document.getElementsByClassName("key");
        for (let i = 0; i < codes.length; i++) {
            const element = codes[i];
            for (let key of keys) {
                if (key.value == element && element !== "Enter") {
                    key.classList.add("keyPressed");
                }
            }
        }
    }
}
