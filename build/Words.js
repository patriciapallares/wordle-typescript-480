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
var _Words_words;
export class Words {
    constructor(wordsArray) {
        _Words_words.set(this, void 0);
        __classPrivateFieldSet(this, _Words_words, wordsArray, "f");
    }
    get words() {
        return __classPrivateFieldGet(this, _Words_words, "f");
    }
    set words(wordsArray) {
        __classPrivateFieldSet(this, _Words_words, wordsArray, "f");
    }
    /**
     *
     * @returns palabra aleatoria de un conjunto de palabras almacenadas en un array
     */
    getRandomWord() {
        const min = 0;
        const max = __classPrivateFieldGet(this, _Words_words, "f").length - 1;
        return __classPrivateFieldGet(this, _Words_words, "f")[Math.trunc(Math.random() * (max - min + 1))];
    }
}
_Words_words = new WeakMap();
