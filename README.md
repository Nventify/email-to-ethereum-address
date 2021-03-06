# Email to Ethereum Address

An email to Ethereum address directory Web3 library. 
This library is a Web3js wrapper which manages interactions with an Ethereum smart contract application. 

`Note: This library currently runs on the Ethereum ROPSTEN (Revival) TESTNET and is intended for demonstration purposes only. This library requires a Web3 compatible client.`

![Workflow Diagram](images/workflow.png)

# Install
```bash
npm install email-to-ethereum-address
```

# Build (from source)
```bash
npm install

// Bundle for web browser use.
// Outputs to dist/EmailToEthereumAddress.web.js
npm run build
```

# Usage

## Node (ES6)

```javascript
const EmailToEthereumAddress = require('email-to-ethereum-address');
const Web3 = require("web3");

// The address transactions should be sent from.
const FROM_ACCOUNT = "0x0000000000000000000000000000000000000000";

// Initialize your web3 provider.
const web3 = new Web3.providers.HttpProvider("http://localhost:8545");

// Initialize the EmailToEthereumAddress library.
// Pass your web3 provider and account.
const emailToEthereumAddress = new EmailToEthereumAddress(web3, FROM_ACCOUNT);

// Request a new registration.
// On a successful request, a verification email will be sent to the provided email address.
emailToEthereumAddress.requestAddRecord("email@example.com").then(receipt => {
    console.log("TransactionHash: " + receipt.transactionHash);
});

// Lookup address from email.
emailToEthereumAddress.getAccount("email@example.com").then(address => {
    console.log("Address: " + address);
});
```

## Web

```html
<html>
<head>
    <script src="dist/EmailToEthereumAddress.web.js"></script>
</head>
</html>
<body>
<script>
    window.onload = function () {

        // Verify the browser has web3 injected.
        if (typeof web3 !== 'undefined') {

            // Lookup Etheruem accounts.
            web3.eth.getAccounts(function (err, accounts) {
                if (accounts.length > 0) {

                    // Grab account you wish to use.
                    var myAccount = accounts[0];

                    // Initial the EmailToEthereumAddress library.
                    // Pass your web3 provider and account.
                    var emailToEthereumAddress = new EmailToEthereumAddress(web3.currentProvider, myAccount);

                    // Request a new registration.
                    // On a successful request, a verification email will be sent to the provided email address.
                    emailToEthereumAddress.requestAddRecord("email@example.com", function (error, transactionHash) {
                        console.log("TransactionHash: " + transactionHash);
                    });

                    // Lookup address from email.
                    emailToEthereumAddress.getAccount("email@example.com", function (address) {
                        console.log(address);
                    });
                }
            });
        }
    };
</script>
</body>
```

# Samples

See the samples folder for both node.js and web examples.

## Node 

`Before running these samples, please modify your email and Ethereum addresses within the scripts.`

```bash
# Get account
node samples/node/get_account.js

# Request Add Record
node samples/node/request_add_record.js
```

## Web

`Before running these samples, please modify your email address in the HTML file.`

Open the HTML file in a web3 compatible browser.
- samples/web/get_account.html
- samples/web/request_add_record.html

# Live Demo
Please visit [here](https://whois.nventify.com/).
