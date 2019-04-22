"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const wallet_1 = require("./models/wallet");
let Storage = new wallet_1.WalletStorage();
Storage.pushPrototype(new wallet_1.USDWallet("qwe"));
Storage.pushPrototype(new wallet_1.RURWallet("qasd"));
try {
    Storage.fillAppStorage();
}
catch (err) {
    console.log(err.message);
}
//# sourceMappingURL=app.js.map