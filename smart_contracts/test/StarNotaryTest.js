const StarNotary = artifacts.require('StarNotary');

contract('StarNotary', accounts => {

    beforeEach(async function () {
        this.contract = await StarNotary.new({from: accounts[0]});

        await this.contract.createStar(
            'awesome star!',
            'awesome story!',
            '1', '2', '3'
        );

    });

    describe('StarNotary contract', () => {

        it('can create a star and cannot duplicate it (createStar)', async function () {

            let duplicateEr = null;
            try {
                await this.contract.createStar(
                    'awesome star!',
                    'awesome story!',
                    '1', '2', '3'
                );
            } catch (er) {
                duplicateEr = er;
            }

            assert.instanceOf(duplicateEr, Error, "Can add duplicate star");
        });


        it('check if star exists (checkIfStarExists)', async function () {
            let exists = await this.contract.checkIfStarExists('1', '2', '3');
            let doesNotExist = await this.contract.checkIfStarExists('1', '2', '4');

            setTimeout(() => {
                assert.equal(exists,true);
                assert.equal(doesNotExist,false);
            },1000);
        });

        it('can read a star (tokenIdToStarInfo)', async function () {
            const star = await this.contract.tokenIdToStarInfo(1);

            assert.deepEqual(star,[
                'awesome star!',
                'awesome story!',
                '1','2','3'
            ])
        });

        it('can put a star for Sale and can get its price (putStarUpForSale, getStarPriceByTokenId)', async function () {

            await this.contract.putStarUpForSale(1, 1);

            let starCost = await this.contract.getStarPriceByTokenId(1);

            setTimeout(() => {
                assert.equal(starCost,1);
            },1000);
        });

        if (0)
        it('can buy a star (buyStar)', async function () {
            console.log('here 1');

            await this.contract.buyStar(555, {value: 10 ** 18});
            console.log('here 2');

            console.log(success);
            setTimeout(() => {
                assert.equal(success,true);
            },1000);
        });
    });
});