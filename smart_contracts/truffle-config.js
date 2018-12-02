/*
 * NB: since truffle-hdwallet-provider 0.0.5 you must wrap HDWallet providers in a
 * function when declaring them. Failure to do so will cause commands to hang. ex:
 * ```
 * mainnet: {
 *     provider: function() {
 *       return new HDWalletProvider(mnemonic, 'https://mainnet.infura.io/<infura-key>')
 *     },
 *     network_id: '1',
 *     gas: 4500000,
 *     gasPrice: 10000000000,
 *   },
 */

const HDWalletProvider = require('truffle-hdwallet-provider');

require('dotenv').config();  // Store environment-specific variable from '.env' to process.env

module.exports = {
    networks: {
        ganache: {
            host: "127.0.0.1",
            port: 8545,
            network_id: "*" // Match any network id
        },
        rinkeby: {
            provider: () => new HDWalletProvider(process.env.MNENOMIC, "https://rinkeby.infura.io/v3/" + process.env.INFURA_API_KEY),
            network_id: '4',
            gas: 6612388, // Gas limit used for deploys
            gasPrice: 41000000000,
        },
    },
    mocha: {
        reporter: 'eth-gas-reporter',
        reporterOptions : {
            currency: 'USD',
            gasPrice: 10
        }
    }
};
