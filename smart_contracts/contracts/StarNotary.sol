pragma solidity ^0.4.23;

import 'openzeppelin-solidity/contracts/token/ERC721/ERC721.sol';

contract StarNotary is ERC721 {

    struct Star { 
        string name;
        string story;
        string dec;
        string mag;
        string cent;
        bool exists;
    }

    mapping(uint256 => Star) public tokenIdToStarInfo;
    mapping(uint256 => uint256) public starsForSale;
    // mapping(string => mapping(string => mapping (string => uint256))) coordinatesToStarId;
    mapping(bytes32 => bool) coordinatesToStarId;
    uint256 public starCount;

    event StarCreated(
          uint256 starToken
    );

    function checkIfStarExists(
        string _dec,
        string _mag,
        string _cent
    )   view
    public
    returns (bool)
    {
        bytes32 hash = keccak256(abi.encodePacked(_dec, _mag, _cent));
        return coordinatesToStarId[hash] == true;
    }

    modifier isUniqueStar(string _dec, string _mag, string _cent) {
        require(!checkIfStarExists(_dec, _mag, _cent), "Star exists");
        _;
    }

    function createStar (
        string _name,
        string _story,
        string _dec,
        string _mag,
        string _cent
    )
        public
        isUniqueStar( _dec, _mag, _cent)
        returns (uint256)
    {
        bytes32 hash = keccak256(abi.encodePacked(_dec, _mag, _cent));
        coordinatesToStarId[hash] = true;

        starCount = starCount + 1;
        uint256 token = starCount;

        Star memory newStar = Star(_name, _story, _dec, _mag, _cent, true);

        tokenIdToStarInfo[token] = newStar;
        Star storage star = tokenIdToStarInfo[token];
        string storage starName = star.name;
        _mint(msg.sender, token);

        emit StarCreated(token);
    }


    function putStarUpForSale(uint256 _tokenId, uint256 _price) public {
        require(this.ownerOf(_tokenId) == msg.sender, "You are not an owner of this Star");

        starsForSale[_tokenId] = _price;
    }

    function getStarPriceByTokenId(uint256 _tokenId) public view returns(uint256) {
        require(starsForSale[_tokenId] > 0, "This star is not for sale!");

        return starsForSale[_tokenId];
    }


    function buyStar(uint256 _tokenId) public payable {
        require(starsForSale[_tokenId] > 0, "This star is not for sale!");
        
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

}