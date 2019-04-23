"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const util = require("util");
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
        const readFile = util.promisify(fs.readFile);
        try {
            let data = await readFile(PATH);
            const storage = JSON.parse(data.toString());
            console.log(storage);
            this.hash.clear();
            storage.forEach((value) => {
                let n;
                switch (value._currency) {
                    case Currency.USD:
                        n = new USDWallet(value._ownerName);
                        n.cardNumber = value._cardNumber;
                        n.sum = value._sum;
                        this.pushPrototype(n);
                        break;
                    case Currency.UAH:
                        n = new UAHWallet(value._ownerName);
                        n.cardNumber = value._cardNumber;
                        n.sum = value._sum;
                        this.pushPrototype(n);
                        break;
                    case Currency.RUR:
                        n = new RURWallet(value._ownerName);
                        n.cardNumber = value._cardNumber;
                        n.sum = value._sum;
                        this.pushPrototype(n);
                        break;
                    case Currency.EUR:
                        n = new EURWallet(value._ownerName);
                        n.cardNumber = value._cardNumber;
                        n.sum = value._sum;
                        this.pushPrototype(n);
                        break;
                    default: console.log("Error");
                }
            });
            console.log(this.hash);
        }
        catch (err) {
            console.log(err.message);
        }
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
        if (number.length != 16 || Array(number).every(value => isNaN(parseInt(value)))) {
            this._cardNumber = "Error bratka";
            return;
        }
        this._cardNumber = number;
    }
    get ownerName() {
        return this._ownerName;
    }
    set ownerName(name) {
        this._ownerName = name;
    }
    get sum() {
        return this._sum;
    }
    set sum(sum) {
        this._sum = sum;
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
    toStr() {
        return `Wallet number ${this._cardNumber} | Currency ${this._currency} | Sum ${this._sum} | owner ${this._ownerName}`;
    }
}
exports.WalletPrototype = WalletPrototype;
class USDWallet extends WalletPrototype {
    constructor(name) {
        super();
        this.ownerName = name;
        this.currency = Currency.USD;
        this.cardNumber = "1111222233334144";
        this.sum = 100;
    }
}
exports.USDWallet = USDWallet;
class UAHWallet extends WalletPrototype {
    constructor(name) {
        super();
        this.ownerName = name;
        this.currency = Currency.UAH;
        this.cardNumber = "1112222223333444";
        this.sum = 100;
    }
}
exports.UAHWallet = UAHWallet;
class EURWallet extends WalletPrototype {
    constructor(name) {
        super();
        this.ownerName = name;
        this.currency = Currency.EUR;
        this.cardNumber = "1111224433334444";
        this.sum = 100;
    }
}
exports.EURWallet = EURWallet;
class RURWallet extends WalletPrototype {
    constructor(name) {
        super();
        this.ownerName = name;
        this.currency = Currency.RUR;
        this.cardNumber = "1111222233334244";
        this.sum = 100;
    }
}
exports.RURWallet = RURWallet;
//# sourceMappingURL=wallet.js.map