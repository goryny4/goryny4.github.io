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

// Get and display star name
/*
starNotary.starIsForSale(123, function (error, result) {
if (!error) {
    document.getElementById('stars-for-sale').innerText = result
} else {
    console.log(error);
}
});
*/
// Get and display star owner
/*starNotary.starOwner(function (error, result) {
    if (!error) {
        document.getElementById('star-owner').innerText = result
    } else {
        console.log(error);
    }
});*/


// Enable claim button being clicked
function claimButtonClicked() {
    web3.eth.getAccounts(function(error, accounts) {
        if (error) {
            console.log(error);
            return
        }
        let account = accounts[0];

        let starName = document.getElementById('new-star-name').value;
        let starStory = document.getElementById('new-star-story').value;
        let starDec = document.getElementById('new-star-dec').value;
        let starMag = document.getElementById('new-star-mag').value;
        let starCent = document.getElementById('new-star-cent').value;
        let starToken = document.getElementById('new-star-token').value;

        starNotary.createStar(starName,starStory,starDec,starMag,starCent,starToken,function (error, result) {
            if (!error) {
                /*
                let starClaimedEvent = starNotary.starClaimed({from: account});
                starClaimedEvent.watch(function(error, result) {
                    if (!error) {
                        location.reload();
                    } else {
                        console.log('watching for star claimed event is failing');
                    }
                }); */
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
        let account = accounts[0];

        let starStory = document.getElementById('star-story').value;

        starNotary.createStar('name',starStory,'dec','mag','cent','tokenId',function (error, result) {
            if (!error) {
                console.log(result);
                /*
                let starClaimedEvent = starNotary.starClaimed({from: account});
                starClaimedEvent.watch(function(error, result) {
                    if (!error) {
                        location.reload();
                    } else {
                        console.log('watching for star claimed event is failing');
                    }
                }); */
            } else {
                console.log(error);
            }
        });

    })
}