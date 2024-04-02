export class Letter {
    #letter: string = "";

    constructor(code: string) {
        this.#letter = this.transformCodeToLetter(code);
    }

    private transformCodeToLetter(code: string): string {
        let letter: string = "";
        if (code === "Semicolon") {
            letter = "Ñ";
        } else {
            letter = code.split("y")[1];
        }
        return letter;
    }

    get letter(): string {
        return this.#letter;
    }

    set letter(value: string) {
        this.#letter = value;
    }
}

