const fs = require("fs");
const openpgp = require('openpgp');

const ADDRESS = "0x954ab8eb30f4a0efd98d2c844f74dad5242eff90";
const ABI_FILENAME ="EmailToEthereumAddressAbi.json";
const GAS = "20000000000";

class EmailToEthereumAddress {

    constructor(myWeb3, account) {
        this.myWeb3 = myWeb3;
        this.contract = this.initializeContract(account)
    }

    /**
     * Initialize the web3 smart contract
     *
     * @param account
     * @returns {Contract}
     */
    initializeContract(account) {
        return new this.myWeb3.eth.Contract(this.getAbi(), ADDRESS, {
            gasPrice: GAS,
            from: account
        });
    }

    /**
     * Return the smart contract's ABI
     *
     * @returns {Object}
     */
    getAbi() {
        const input = fs.readFileSync(__dirname + "/" + ABI_FILENAME);
        return JSON.parse(input);
    }

    /**
     * Return Nventify's PGP public key
     */
    get pgpPublicKey() {
        return fs.readFileSync(__dirname + "/" + ABI_FILENAME);
    }

    /**
     * Encrypt an email address using Nventify's public PGP key
     *
     * @param emailAddress
     * @returns {Promise<*>}
     */
    async encryptEmail(emailAddress) {
        const options = {
            data: emailAddress,
            publicKeys: openpgp.key.readArmored(this.pgpPublicKey()).keys,
            compression: openpgp.enums.compression.zip
        };

        const out = await openpgp.encrypt(options);
        return out.data;
    }

    /**
     * Requests add new record by email
     *
     * @param email
     * @returns {Promise<void>}
     */
    async requestAddRecord(email) {

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
        this.contract.methods.requestAddRecord(hashedEmail, encryptedEmail).send();
    }

    /**
     * Returns an Ethereum account address by an email address
     *
     * @param email
     * @returns {Promise<*>}
     */
    async getRecord(email) {

        // Hash the email address using sha3. This hash will be used to lookup the record in the blockchain.
        const hashedEmail = this.myWeb3.utils.sha3(email);

        // Make a call to the blockchain to lookup the record which contains an Ethereum address.
        const address = await this.contract.methods.getAccount(hashedEmail).call();

        // Check for the existence of the record.
        // An address of 0x0000000000000000000000000000000000000000 indicates the non-existent of a record.
        if (address && address !== "0x0000000000000000000000000000000000000000") {
            return address;
        } else {
            return null;
        }
    }
}

module.exports = EmailToEthereumAddress;
