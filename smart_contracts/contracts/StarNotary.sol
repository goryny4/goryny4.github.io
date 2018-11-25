pragma solidity ^0.4.23;

import 'openzeppelin-solidity/contracts/token/ERC721/ERC721.sol';

contract StarNotary is ERC721 {

    struct Star { 
        string name;
        string story;
        string dec;
        string mag;
        string cent;
    }

    mapping(uint256 => Star) public tokenIdToStarInfo;
    mapping(uint256 => uint256) public starsForSale;
    mapping(string => mapping(string => mapping (string => uint256))) coordinatesToStarId;

    modifier isUniqueStar(string _dec, string _mag, string _cent) {
        require(!checkIfStarExists(_dec, _mag, _cent), "Star exists");
        _;
    }

    function createStar (
        string _name,
        string _story,
        string _dec,
        string _mag,
        string _cent,
        uint256 _tokenId
    )
        public
        isUniqueStar( _dec, _mag, _cent)
    {
        Star memory newStar = Star(_name, _story, _dec, _mag, _cent);

        tokenIdToStarInfo[_tokenId] = newStar;

        _mint(msg.sender, _tokenId);
    }

    function putStarUpForSale(uint256 _tokenId, uint256 _price) public { 
        require(this.ownerOf(_tokenId) == msg.sender, "You are not an owner of this Star");

        starsForSale[_tokenId] = _price;
    }


    // checks -> effects -> interaction (money move) (important pattern! fallback function)
    function buyStar(uint256 _tokenId) public payable { 
        require(starsForSale[_tokenId] > 0, "This star is not for sale");
        
        uint256 starCost = starsForSale[_tokenId];
        address starOwner = this.ownerOf(_tokenId);
        require(msg.value >= starCost);

        _removeTokenFrom(starOwner, _tokenId);
        _addTokenTo(msg.sender, _tokenId);
        
        starOwner.transfer(starCost);

        if (msg.value > starCost) {
            msg.sender.transfer(msg.value - starCost);
        }
    }

    function tokenIdToStarInfo(uint256 tokenId) public view returns (string, string, string, string, string) {
        return (
            tokenIdToStarInfo[tokenId].name,
            tokenIdToStarInfo[tokenId].story,
            tokenIdToStarInfo[tokenId].dec,
            tokenIdToStarInfo[tokenId].mag,
            tokenIdToStarInfo[tokenId].cent
        );
    }

    //   mapping(string => mapping(string => mapping (string => uint256))) coordinatesToStarId;
    function checkIfStarExists(
        string _dec,
        string _mag,
        string _cent
    )
        public
        returns (bool)
    {
        return coordinatesToStarId[_dec][_mag][_cent] > 0;
    }


    function starsForSale(uint256 _tokenId) public view returns (uint256) {
        return starsForSale[_tokenId];
    }
}