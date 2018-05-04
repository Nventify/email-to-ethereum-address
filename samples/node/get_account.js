// For this demo we will use a relative path for the module
const EmailToEthereumAddress = require('../../lib/EmailToEthereumAddress');

const Web3 = require("web3");

// The address transactions should be sent from.
const FROM_ACCOUNT = "0x0000000000000000000000000000000000000000";

// Initialize your web3 provider.
const web3 = new Web3.providers.HttpProvider("http://localhost:8545");

// Initialize the EmailToEthereumAddress library.
// Pass your web3 provider and account.
const emailToEthereumAddress = new EmailToEthereumAddress(web3, FROM_ACCOUNT);

// Lookup address from email.
emailToEthereumAddress.getAccount("email@example.com").then(address => {
    console.log("Address: " + address);
});