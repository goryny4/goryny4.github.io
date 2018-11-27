// run "node copy-abi" after truffle migrate
// script.abi.js is then loaded in index.html

const contractName = 'StarNotary';
const fs = require('fs');
const contract = JSON.parse(fs.readFileSync('./build/contracts/' + contractName + '.json', 'utf8'));
// console.log(JSON.stringify(contract.abi));
fs.writeFileSync('../script.abi.js','let ABI = ' + JSON.stringify(contract.abi) + ';');