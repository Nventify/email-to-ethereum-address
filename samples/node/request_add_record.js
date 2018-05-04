const Web3 = require("web3");

// For this demo we will use a relative path for the module
const EmailToEthereumAddress = require('../../lib/EmailToEthereumAddress');

const EMAIL_ADDRESS = 'email@example.com'; // The email address with which to request a new record.
const FROM_ACCOUNT = '0x0000000000000000000000000000000000000000'; // The address transactions should be sent from.
const ETHEREUM_GATEWAY = 'http://localhost:8545';

// Initialize your web3 provider.
const web3 = new Web3.providers.HttpProvider(ETHEREUM_GATEWAY);

// Initial the EmailToEthereumAddress library.
// Pass your web3 provider and account.
const emailToEthereumAddress = new EmailToEthereumAddress(web3, FROM_ACCOUNT);

// Request a new registration.
// On a successful request, a verification email will be sent to the provided email address.
emailToEthereumAddress.requestAddRecord(EMAIL_ADDRESS).then(receipt => {
    console.log('TransactionHash: ' + receipt.transactionHash);
});