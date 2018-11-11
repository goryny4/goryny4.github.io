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

            assert.equal(await this.contract.tokenIdToStarInfo(555).name,'awesome star!');
            assert.equal(await this.contract.tokenIdToStarInfo(555).story,'awesome story!');
            assert.equal(await this.contract.tokenIdToStarInfo(555).dec,'1');
            assert.equal(await this.contract.tokenIdToStarInfo(555).mag,'2');
            assert.equal(await this.contract.tokenIdToStarInfo(555).cent,'3');
        });
    });
});