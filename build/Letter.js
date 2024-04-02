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
var _Letter_letter;
export class Letter {
    constructor(code) {
        _Letter_letter.set(this, "");
        __classPrivateFieldSet(this, _Letter_letter, this.transformCodeToLetter(code), "f");
    }
    transformCodeToLetter(code) {
        let letter = "";
        if (code === "Semicolon") {
            letter = "Ñ";
        }
        else {
            letter = code.split("y")[1];
        }
        return letter;
    }
    get letter() {
        return __classPrivateFieldGet(this, _Letter_letter, "f");
    }
    set letter(value) {
        __classPrivateFieldSet(this, _Letter_letter, value, "f");
    }
}
_Letter_letter = new WeakMap();
