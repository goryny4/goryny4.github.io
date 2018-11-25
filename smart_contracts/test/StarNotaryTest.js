const StarNotary = artifacts.require('StarNotary');

contract('StarNotary', accounts => {

    beforeEach(async function () {
        this.contract = await StarNotary.new({from: accounts[0]});
    });

    describe('can create a star', () => {
        it('can create a star and get its name', async function () {

            await this.contract.createStar(
                'awesome star!',
                'awesome story!',
                '1', '2', '3',
                555
            );

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

            await this.contract.createStar(
                'awesome star!',
                'awesome story!',
                '5', '6', '7',
                556
            );

            const [starName, starStory, starDec, starMag, starCent] = await this.contract.tokenIdToStarInfo(555);

            assert.equal(starName,'awesome star!');
            assert.equal(starStory,'awesome story!');
            assert.equal(starDec,'1');
            assert.equal(starMag,'2');
            assert.equal(starCent,'3');
        });
    });
});