const Web3 = require("web3");

// For this demo we will use a relative path for the module
const EmailToEthereumAddress = require('../../lib/EmailToEthereumAddress');

// The address transactions should be sent from.
const FROM_ACCOUNT = "0x0000000000000000000000000000000000000000";

// Initialize your web3 provider.
const web3 = new Web3.providers.HttpProvider("http://localhost:8545");

// Initial the EmailToEthereumAddress library.
// Pass your web3 provider and account.
const emailToEthereumAddress = new EmailToEthereumAddress(web3, FROM_ACCOUNT);

// Request a new registration.
// On a successful request, a verification email will be sent to the provided email address.
emailToEthereumAddress.requestAddRecord("email@example.com").then(receipt => {
    console.log("TransactionHash: " + receipt.transactionHash);
});