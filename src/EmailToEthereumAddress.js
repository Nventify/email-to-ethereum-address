const openpgp = require('openpgp');
const Web3 = require('web3');

const NVENTIFY_PUB_KEY = '-----BEGIN PGP PUBLIC KEY BLOCK-----\r\nVersion: OpenPGP.js v3.0.7\r\nComment: https://openpgpjs.org\r\n\r\n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\n3Rg=\r\n=oabM\r\n-----END PGP PUBLIC KEY BLOCK-----\r\n\r\n';
const CONTRACT_ADDRESS = "0x954ab8eb30f4a0efd98d2c844f74dad5242eff90";
const GAS = "20000000000";
const CONTRACT_ABI = [{
    "constant": false, "inputs": [{
        "name": "emailHash",
        "type": "string"
    }, {
        "name": "encryptedEmail",
        "type": "string"
    }], "name": "requestAddRecord",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "constant": true, "inputs": [{
        "name": "emailHash",
        "type": "string"
    }], "name": "getAccount",
    "outputs": [{
        "name": "",
        "type": "address"
    }], "payable": false,
    "stateMutability": "view",
    "type": "function"
}];

class EmailToEthereumAddress {

    /**
     * The EmailToEthereumAddress class constructor.
     *
     * @constructor
     * @param web3Provider - The injected web3 provider.
     * @param account - The address transactions should be sent from.
     * @param [options] - Optional abi and address object.
     */
    constructor(web3Provider, account, options = {}) {
        this.myWeb3 = this.initializeWeb3(web3Provider);
        this.contract = this.initializeContract(account, options)
    }

    /**
     * Initialize Web3
     *
     * @param web3Provider - The injected web3 provider.
     */
    initializeWeb3(web3Provider) {
        if (typeof web3Provider === 'undefined') {
            throw new Error("missing web3Provider parameter");
        }

        return new Web3(web3Provider);
    }

    /**
     * Initialize the web3 smart contract
     *
     * @param account - The address transactions should be sent from.
     * @param [options] - Optional abi and address object.
     * @returns {Contract}
     */
    initializeContract(account, options = {}) {
        if (typeof account === 'undefined') {
            throw new Error("missing account parameter");
        }

        const defaultOptions = Object.assign({}, {
            abi: CONTRACT_ABI,
            from: CONTRACT_ADDRESS
        }, options);

        return new this.myWeb3.eth.Contract(defaultOptions.abi, defaultOptions.from, {
            gasPrice: GAS,
            from: account
        });
    }

    /**
     * Encrypt an email address using Nventify's public PGP key
     *
     * @param email - The email address to encrypt.
     * @returns {Promise<*>}
     */
    async encryptEmail(email) {
        if (typeof email === 'undefined') {
            throw new Error("missing email parameter");
        }

        const options = {
            data: email,
            publicKeys: openpgp.key.readArmored(NVENTIFY_PUB_KEY).keys,
            compression: openpgp.enums.compression.zip
        };

        const out = await openpgp.encrypt(options);
        return out.data;
    }

    /**
     * Requests add new record by email
     *
     * @param email - The email address with which to request a new record.
     * @callback [callback] - The callback which handles the response.
     * @returns {Promise<*>}
     */
    async requestAddRecord(email, callback) {
        if (typeof email === 'undefined') {
            throw new Error("missing email parameter");
        }

        // Use the Nventify's PGP public key to encrypt the email address before sending to the blockchain.
        // This action will ensure anonymity of the email address in the public blockchain.
        const encryptedEmail = await this.encryptEmail(email);

        // Hash the email address using sha3. This action will allow for a one-way lookup of the email address
        // without losing anonymity of the email address in the blockchain.
        const hashedEmail = this.myWeb3.utils.sha3(email);

        // Send the "requestAddTransaction" contract method transaction.
        // This method of the smart contract will notify Nventify to start the verification process.
        // The sent encrypted email address will receive an email from the Nventify servers
        // with instructions to complete the process.
        if (callback) {
            return this.contract.methods.requestAddRecord(hashedEmail, encryptedEmail).send({}, callback);
        }

        return this.contract.methods.requestAddRecord(hashedEmail, encryptedEmail).send();
    }

    /**
     * Returns an Ethereum account address by an email address
     *
     * @param email - The email address with which to look up an account.
     * @callback [callback] - The callback which handles the response.
     * @returns {Promise<*>}
     */
    async getAccount(email, callback) {
        if (typeof email === 'undefined') {
            throw new Error("missing email parameter");
        }

        // Hash the email address using sha3. This hash will be used to lookup the record in the blockchain.
        const hashedEmail = this.myWeb3.utils.sha3(email);

        // Make a call to the blockchain to lookup the record which contains an Ethereum address.
        let address = await this.contract.methods.getAccount(hashedEmail).call();

        // Check for the existence of the record.
        // An address of 0x0000000000000000000000000000000000000000 indicates the non-existent of a record.
        if (address === "0x0000000000000000000000000000000000000000") {
            address = null;
        }

        if (callback) {
            return callback(address);
        }

        return address;
    }
}

module.exports = EmailToEthereumAddress;
