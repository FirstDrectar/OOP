import * as fs from "fs";
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
        let c = await fs.readFile(PATH, (err, data) => {
            if (err) throw new Error(`Incorrect path ${PATH}`);
            const st: WalletPrototype[] = JSON.parse(data.toString());
            return Promise.resolve(st);
        });

        console.log(this.hash);
        this.hash.clear();
        console.log(this.hash);
        // storage.forEach((value) => {
            this.pushPrototype(value);
            console.log(value);
        });
        console.log(this.hash);
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
export abstract class WalletPrototype {
    protected _ownerName: string;
    protected _cardNumber: string;
    protected _sum: number;
    protected _currency: Currency;
    get cardNumber(): string {
        return this._cardNumber;
    }
    set cardNumber(number: string) {
        if (number.length != 16 || !Array(number).every((numb) => typeof numb === `number`))
            return;
        this._cardNumber = number;
    }
    get sum(): number {
        return this._sum;
    }
    set sum(sum: number) {
        this.sum = sum;
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
    abstract toStr(): string;

}
export class USDWallet extends WalletPrototype {
    constructor(name: string) {
        super();
        this._ownerName = name;
        this._currency = Currency.USD;
        this._cardNumber = "1111222233334144";
        this._sum = 100;
    }
    toStr(): string {
        return `Wallet number ${this._cardNumber} | Currency ${this._currency} | Sum ${this._sum} | owner ${this._ownerName}`;
    }
}
export class UAHWallet extends WalletPrototype {
    constructor(name: string) {
        super();
        this._ownerName = name;
        this._currency = Currency.UAH;
        this._cardNumber = "1112222223333444";
        this._sum = 100;
    }
    toStr(): string {
        return `Wallet number ${this._cardNumber} | Currency ${this._currency} | Sum ${this._sum} | owner ${this._ownerName}`;
    }
}
export class EURWallet extends WalletPrototype {
    constructor(name: string) {
        super();
        this._ownerName = name;
        this._currency = Currency.EUR;
        this._cardNumber = "1111224433334444";
        this._sum = 100;
    }
    toStr(): string {
        return `Wallet number ${this._cardNumber} | Currency ${this._currency} | Sum ${this._sum} | owner ${this._ownerName}`;
    }
}
export class RURWallet extends WalletPrototype {
    constructor(name: string) {
        super();
        this._ownerName = name;
        this._currency = Currency.RUR;
        this._cardNumber = "1111222233334244";
        this._sum = 100;
    }
    toStr(): string {
        return `Wallet number ${this._cardNumber} | Currency ${this._currency} | Sum ${this._sum} | owner ${this._ownerName}`;
    }
}
