import { WalletStorage, USDWallet, RURWallet } from "./models/wallet";
let Storage = new WalletStorage();
try {
    Storage.fillAppStorage();
}
catch (err) {
    console.log(err.message);
}