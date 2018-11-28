# Udacity Blockchain Term 1 final project

### 1. Set env vars
Create .env file inside smart_contracts folder
> cp .env.example .env

Set MNEMONIC and INFURA_API_KEY

### 2. Run local network
> ganache-cli -e 100

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

### 6. Run local server and open the frontend
> http://localhost:8000

### 7. Claim a Star
Fill the fields and press the button

