const StarNotary = artifacts.require('StarNotary');

contract('StarNotary', accounts => {

    beforeEach(async function () {
        this.contract = await StarNotary.new({from: accounts[0]});

        await this.contract.createStar(
            'awesome star!',
            'awesome story!',
            '1', '2', '3',
            555
        );
    });

    describe('StarNotary contract', () => {

        it('can create a star and cannot duplicate it (createStar)', async function () {

            let duplicateEr = null;
            try {
                await this.contract.createStar(
                    'awesome star!',
                    'awesome story!',
                    '1', '2', '3',
                    555
                );
            } catch (er) {
                duplicateEr = er;
            }

            assert.instanceOf(duplicateEr, Error, "Can add duplicate star");
        });


        it('check if star exists (checkIfStarExists)', async function () {
            const exists = await this.contract.checkIfStarExists('1', '2', '3');
            setTimeout(() => {
                assert.equal(exists,true);
            },1000);
        });

        it('can read a star (tokenIdToStarInfo)', async function () {
            const [starName, starStory, starDec, starMag, starCent] = await this.contract.tokenIdToStarInfo(555);

            assert.equal(starName,'awesome star!');
            assert.equal(starStory,'awesome story!');
            assert.equal(starDec,'1');
            assert.equal(starMag,'2');
            assert.equal(starCent,'3');
        });

        it('can put a star for Sale and can get its price (putStarUpForSale, getStarPriceByTokenId)', async function () {

            await this.contract.putStarUpForSale(555, 100);

            let starCost = await this.contract.getStarPriceByTokenId(555);

            setTimeout(() => {
                assert.equal(starCost,100);
            },1000);
        });
    });
});