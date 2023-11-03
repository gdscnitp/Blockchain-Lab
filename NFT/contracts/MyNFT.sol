//SPDX-License-Identifier: MIT

pragma solidity >=0.5.0 < 0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract MyNFT is ERC721URIStorage , Ownable {
    
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIds;

    // Define a struct to store NFT information
    struct NFTWithRoyalties {
        string tokenURI;
        uint256 royaltiesPercentage;
    }

    // Mapping from token ID to NFT information.
    mapping(uint256 => NFTWithRoyalties) private _nfts;


    constructor() ERC721("Code Eater", "CER") {}

    function mintNFT(address recipient, string memory tokenURI, uint256 royaltiesPercentage) public onlyOwner returns (uint) {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);

         _nfts[newItemId] = NFTWithRoyalties(tokenURI, royaltiesPercentage);

        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }

    // Function to get the royalties percentage for a specific NFT.
    function getRoyaltiesPercentage(uint256 tokenId) public view returns (uint256) {
        return _nfts[tokenId].royaltiesPercentage;
    }
}