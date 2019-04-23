import * as fs from "fs";
import * as  util from 'util';
import { plainToClass } from 'class-transformer';


const PATH = './storage/walletStorage.json';
export enum Currency {
    UAH = "UAH",
    USD = "USD",
    RUR = "RUR",
    EUR = "EUR"
}
export class WalletStorage {
    private hash = new Map<string, WalletPrototype>();
    constructor() {

    }
    pushPrototype(prototype: WalletPrototype) {
        console.log(prototype.cardNumber);
        this.hash.set(prototype.cardNumber, prototype);
    }
    getPrototype(cardNumber: string): WalletPrototype {
        return this.hash.get(cardNumber).Clone();
    }
    async fillAppStorage() {
        const readFile = util.promisify(fs.readFile)
        try {
            let data = await readFile(PATH);
            const storage = JSON.parse(data.toString());
            console.log(storage);
            this.hash.clear();

            storage.forEach((value) => {
                let n;
                switch (value._currency) {
                    case Currency.USD: n = new USDWallet(value._ownerName); n.cardNumber = value._cardNumber; n.sum = value._sum; this.pushPrototype(n); break;
                    case Currency.UAH: n = new UAHWallet(value._ownerName); n.cardNumber = value._cardNumber; n.sum = value._sum; this.pushPrototype(n); break;
                    case Currency.RUR: n = new RURWallet(value._ownerName); n.cardNumber = value._cardNumber; n.sum = value._sum; this.pushPrototype(n); break;
                    case Currency.EUR: n = new EURWallet(value._ownerName); n.cardNumber = value._cardNumber; n.sum = value._sum; this.pushPrototype(n); break;
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
        let walletArray = new Array<WalletPrototype>();
        this.hash.forEach((value) => {
            walletArray.push(value);
        });
        fs.writeFile(PATH, JSON.stringify(walletArray, null, 3), (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
        });
    }

}
export class WalletPrototype {
    protected _ownerName: string;
    protected _cardNumber: string;
    protected _sum: number;
    protected _currency: Currency;
    get cardNumber(): string {
        return this._cardNumber;
    }
    set cardNumber(number: string) {
        if (number.length != 16 || Array(number).every(value => isNaN(parseInt(value)))) {
            this._cardNumber = "Error bratka";
            return;
        }
        this._cardNumber = number;
    }
    get ownerName(): string {
        return this._ownerName;
    }
    set ownerName(name: string) {
        this._ownerName = name;
    }
    get sum(): number {
        return this._sum;
    }
    set sum(sum: number) {
        this._sum = sum;
    }
    get currency(): Currency {
        return this._currency;
    }
    set currency(curr: Currency) {
        this._currency = curr;
    }
    Clone(): WalletPrototype {

        return Object.assign({}, this);

    }
    toStr(): string {
        return `Wallet number ${this._cardNumber} | Currency ${this._currency} | Sum ${this._sum} | owner ${this._ownerName}`;
    }

}
export class USDWallet extends WalletPrototype {
    constructor(name: string) {
        super();
        this.ownerName = name;
        this.currency = Currency.USD;
        this.cardNumber = "1111222233334144";
        this.sum = 100;
    }

}
export class UAHWallet extends WalletPrototype {
    constructor(name: string) {
        super();
        this.ownerName = name;
        this.currency = Currency.UAH;
        this.cardNumber = "1112222223333444";
        this.sum = 100;
    }

}
export class EURWallet extends WalletPrototype {
    constructor(name: string) {
        super();
        this.ownerName = name;
        this.currency = Currency.EUR;
        this.cardNumber = "1111224433334444";
        this.sum = 100;
    }

}
export class RURWallet extends WalletPrototype {
    constructor(name: string) {
        super();
        this.ownerName = name;
        this.currency = Currency.RUR;
        this.cardNumber = "1111222233334244";
        this.sum = 100;
    }

}
