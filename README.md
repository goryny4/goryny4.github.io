# Udacity Blockchain Term 1 final project

### 1. Set env vars
Create .env file inside smart_contracts folder
> cp .env.example .env

Set MNEMONIC and INFURA_API_KEY

### 2. Run local network, set MNEMONIC as your env var
> ganache-cli -e 100 -m $MNEMONIC

### 3. Compile and push contracts to the network
> truffle compile
> truffle migrate --reset --network ganache

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
