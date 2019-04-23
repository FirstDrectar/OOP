"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const wallet_1 = require("./models/wallet");
let Storage = new wallet_1.WalletStorage();
try {
    Storage.fillAppStorage();
}
catch (err) {
    console.log(err.message);
}
//# sourceMappingURL=app.js.map