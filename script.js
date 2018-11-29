window.addEventListener('load', async () => {
    if (typeof web3 !== 'undefined') {

    if (window.ethereum) {
        window.web3 = new Web3(ethereum);
        try {
            // Request account access if needed
            await ethereum.enable();
            // Acccounts now exposed
            web3.eth.sendTransaction({/* ... */});
        } catch (error) {
            // User denied account access...
        }
    } else {
        web3 = new Web3(web3.currentProvider) // what Metamask injected
    }
} else {
    // Instantiate and set Ganache as your provider
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

});


// The default (top) wallet account from a list of test accounts
web3.eth.defaultAccount = web3.eth.accounts[0];

// The interface definition for your smart contract (the ABI)
let StarNotary = web3.eth.contract(ABI);
// Grab the contract at specified deployed address with the interface defined by the ABI
let starNotary = StarNotary.at(ADDRESS);

// write to console on star creation
let event = starNotary.StarCreated(function(error, result) {
    if (!error)
        console.log(result);
    else
        console.log('some error');
});

// Enable claim button being clicked
function claimButtonClicked() {
    web3.eth.getAccounts(function(error, accounts) {
        if (error) {
            console.log(error);
            return;
        }

        let starName = document.getElementById('new-star-name').value;
        let starStory = document.getElementById('new-star-story').value;
        let starDec = document.getElementById('new-star-dec').value;
        let starMag = document.getElementById('new-star-mag').value;
        let starCent = document.getElementById('new-star-cent').value;
        let starToken = document.getElementById('new-star-token').value;

        starNotary.createStar(starName,starStory,starDec,starMag,starCent,starToken,function (error, result) {
            if (!error) {
                console.log('successfully sent to the blockchain');
            } else {
                console.log(error);
            }
        });

    })
}


// Enable read button being clicked
function readButtonClicked() {
    web3.eth.getAccounts(function(error, accounts) {
        if (error) {
            console.log(error);
            return
        }

        let starToken = document.getElementById('star-token').value;

        let starName = document.getElementById('star-name');
        let starStory = document.getElementById('star-story');
        let starDec = document.getElementById('star-dec');
        let starMag = document.getElementById('star-mag');
        let starCent = document.getElementById('star-cent');

        starNotary.tokenIdToStarInfo(starToken ,function (error, result) {
            if (!error) {
                starName.innerHTML = result[0];
                starStory.innerHTML = result[1];
                starDec.innerHTML = result[2];
                starMag.innerHTML = result[3];
                starCent.innerHTML = result[4];

                starName.parentElement.style.display = '';
                starStory.parentElement.style.display = '';
                starDec.parentElement.style.display = '';
                starMag.parentElement.style.display = '';
                starCent.parentElement.style.display = '';

                console.log(result);
            } else {
                console.log(error);
            }
        });

    })
}