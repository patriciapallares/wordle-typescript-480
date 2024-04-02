// Clase abstracta Key que proporciona una implementación base
abstract class Key {
    constructor(public code: string) {}

    abstract validate(): void;
}

// Clase LetterKey que hereda de Key y realiza la validación específica
class LetterKey extends Key {
    private validKeys: string[];

    constructor(code: string) {
        super(code);
        this.validKeys = ["KeyQ", "KeyW", "KeyE", "KeyR", "KeyT", "KeyY", "KeyU", "KeyI", "KeyO", "KeyP", "KeyA", "KeyS", "KeyD", "KeyF", "KeyG", "KeyH", "KeyJ", "KeyK", "KeyL", "KeyZ", "KeyX", "KeyC", "KeyV", "KeyB", "KeyN", "KeyM", "Semicolon"];
    }

    validate(): void {
        if (!this.validKeys.includes(this.code)) {
            throw new Error('La tecla proporcionada no es válida para LetterKey');
        }
    }
}

// Clase EnterKey que hereda de Key
class EnterKey extends Key {
    validate(): void {
        if (this.code !== "Enter") {
            throw new Error('El código de la tecla proporcionada no es válido para EnterKey');
        }
    }
}

// Clase BackspaceKey que hereda de Key
class BackspaceKey extends Key {
    validate(): void {
        if (this.code !== "Backspace") {
            throw new Error('El código de la tecla proporcionada no es válido para BackspaceKey');
        }
    }
}

// Función para validar cualquier tipo de tecla
function validateKey(key: Key) {
    key.validate();
}
/*
// Ejemplo de uso
try {
    const letterKey = new LetterKey("KeyA"); // Se construye correctamente
    validateKey(letterKey);

    const enterKey = new EnterKey("Enter"); // Se construye correctamente
    validateKey(enterKey);

    const backspaceKey = new BackspaceKey("Backspace"); // Se construye correctamente
    validateKey(backspaceKey);

    // Ejemplos de validación fallida
    // const invalidLetterKey = new LetterKey("InvalidKey");
    // validateKey(invalidLetterKey); // Se lanza un error

    // const invalidEnterKey = new EnterKey("KeyA");
    // validateKey(invalidEnterKey); // Se lanza un error

    // const invalidBackspaceKey = new BackspaceKey("Enter");
    // validateKey(invalidBackspaceKey); // Se lanza un error
} catch (error) {
    console.error(error.message);
}
*/