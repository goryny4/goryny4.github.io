# Udacity Blockchain Term 1 final project

#### Contract address 
> 0x0c6685bee9dc1b6f0c809ae3e8dddf362e501371
#### Transaction ID
> 0xec7a884fd420f5e1f62f0ff84f6391791f7be3845b17445fd2af882b23d8af5a

https://rinkeby.etherscan.io/address/0x0c6685bee9dc1b6f0c809ae3e8dddf362e501371

## Project testing steps

### 1. Set env vars
Create .env file inside smart_contracts folder
> cp .env.example .env

Set MNEMONIC and INFURA_API_KEY

### 2. Run local network, set MNEMONIC as your env var
> ganache-cli -e 100 -m $MNEMONIC

### 3. Compile and push contracts to the network
> truffle migrate --compile-all --reset --network ganache

### 4. Set ABI code
The ABI code is pasted into script.abi.js file
> node copy-abi

### 5. Set contract address
Manually copy address from the previous command output
> StarNotary: {copy-this-address}

Manually paste it in script.address.js file

### 6. Run the tests
> truffle test

### 7. Run local server and open the frontend
> http://localhost:8000

Check that your Eth account in MetaMask has some money

### 8. Claim a Star
Fill the fields and press the button

### 9. Put a star up for sale (console)
> starNotary.putStarUpForSale(12345678,500,function(error,result){})

### 10. Check star price (console)
> starNotary.getStarPriceByTokenId(12345678,(er,result)=>{console.log(JSON.stringify(result))}) 

500 is expected
