"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const PATH = './storage/walletStorage.json';
var Currency;
(function (Currency) {
    Currency["UAH"] = "UAH";
    Currency["USD"] = "USD";
    Currency["RUR"] = "RUR";
    Currency["EUR"] = "EUR";
})(Currency = exports.Currency || (exports.Currency = {}));
class WalletStorage {
    constructor() {
        this.hash = new Map();
    }
    pushPrototype(prototype) {
        console.log(prototype.cardNumber);
        this.hash.set(prototype.cardNumber, prototype);
    }
    getPrototype(cardNumber) {
        return this.hash.get(cardNumber).Clone();
    }
    async fillAppStorage() {
        const data = await fs.readFile(PATH, (err, data) => {
            if (err)
                throw new Error(`Incorrect path ${PATH}`);
            const storage = JSON.parse(data.toString());
            console.log(this.hash);
            this.hash.clear();
            console.log(this.hash);
            storage.forEach((value) => {
                this.pushPrototype(value);
                console.log(value);
            });
            console.log(this.hash);
        });
    }
    reloadStorage() {
        let walletArray = new Array();
        this.hash.forEach((value) => {
            walletArray.push(value);
        });
        fs.writeFile(PATH, JSON.stringify(walletArray, null, 3), (err) => {
            if (err)
                throw err;
            console.log('The file has been saved!');
        });
    }
}
exports.WalletStorage = WalletStorage;
class WalletPrototype {
    get cardNumber() {
        return this._cardNumber;
    }
    set cardNumber(number) {
        if (number.length != 16 || !Array(number).every((numb) => typeof numb === `number`))
            return;
        this._cardNumber = number;
    }
    get sum() {
        return this._sum;
    }
    set sum(sum) {
        this.sum = sum;
    }
    get currency() {
        return this._currency;
    }
    set currency(curr) {
        this._currency = curr;
    }
    Clone() {
        return Object.assign({}, this);
    }
}
exports.WalletPrototype = WalletPrototype;
class USDWallet extends WalletPrototype {
    constructor(name) {
        super();
        this._ownerName = name;
        this._currency = Currency.USD;
        this._cardNumber = "1111222233334144";
        this._sum = 100;
    }
    toStr() {
        return `Wallet number ${this._cardNumber} | Currency ${this._currency} | Sum ${this._sum} | owner ${this._ownerName}`;
    }
}
exports.USDWallet = USDWallet;
class UAHWallet extends WalletPrototype {
    constructor(name) {
        super();
        this._ownerName = name;
        this._currency = Currency.UAH;
        this._cardNumber = "1112222223333444";
        this._sum = 100;
    }
    toStr() {
        return `Wallet number ${this._cardNumber} | Currency ${this._currency} | Sum ${this._sum} | owner ${this._ownerName}`;
    }
}
exports.UAHWallet = UAHWallet;
class EURWallet extends WalletPrototype {
    constructor(name) {
        super();
        this._ownerName = name;
        this._currency = Currency.EUR;
        this._cardNumber = "1111224433334444";
        this._sum = 100;
    }
    toStr() {
        return `Wallet number ${this._cardNumber} | Currency ${this._currency} | Sum ${this._sum} | owner ${this._ownerName}`;
    }
}
exports.EURWallet = EURWallet;
class RURWallet extends WalletPrototype {
    constructor(name) {
        super();
        this._ownerName = name;
        this._currency = Currency.RUR;
        this._cardNumber = "1111222233334244";
        this._sum = 100;
    }
    toStr() {
        return `Wallet number ${this._cardNumber} | Currency ${this._currency} | Sum ${this._sum} | owner ${this._ownerName}`;
    }
}
exports.RURWallet = RURWallet;
//# sourceMappingURL=wallet.js.map