import { WalletStorage, USDWallet, RURWallet } from "./models/wallet";
let Storage = new WalletStorage();
Storage.pushPrototype(new USDWallet("qwe"));
Storage.pushPrototype(new RURWallet("qasd"));
try {
    Storage.fillAppStorage();
}
catch (err) {
    console.log(err.message);
}