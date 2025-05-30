// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title SimpleNFT
 * @dev NFT básico para demonstração na Base
 * Quarto contrato para a missão "Based Builder"
 */
contract SimpleNFT is ERC721, Ownable {
    uint256 public nextTokenId;
    uint256 public maxSupply = 1000;

    mapping(uint256 => string) private _tokenURIs;

    event NFTMinted(address to, uint256 tokenId);

    constructor() ERC721("Base Builder NFT", "BBN") Ownable(msg.sender) {
        nextTokenId = 1;
    }

    /**
     * @dev Mint um NFT para um endereço específico
     */
    function mint(address _to) public onlyOwner {
        require(nextTokenId <= maxSupply, "Supply maximo atingido");

        uint256 tokenId = nextTokenId;
        nextTokenId++;

        _safeMint(_to, tokenId);
        emit NFTMinted(_to, tokenId);
    }

    /**
     * @dev Mint um NFT para o próprio caller
     */
    function mintToSelf() public {
        require(nextTokenId <= maxSupply, "Supply maximo atingido");

        uint256 tokenId = nextTokenId;
        nextTokenId++;

        _safeMint(msg.sender, tokenId);
        emit NFTMinted(msg.sender, tokenId);
    }

    /**
     * @dev Define a URI de um token específico
     */
    function setTokenURI(uint256 _tokenId, string memory _tokenURI) public onlyOwner {
        require(ownerOf(_tokenId) != address(0), "Token nao existe");
        _tokenURIs[_tokenId] = _tokenURI;
    }

    /**
     * @dev Retorna a URI de um token
     */
    function tokenURI(uint256 _tokenId) public view override returns (string memory) {
        require(ownerOf(_tokenId) != address(0), "Token nao existe");

        string memory _tokenURI = _tokenURIs[_tokenId];
        string memory base = _baseURI();

        if (bytes(base).length == 0) {
            return _tokenURI;
        }

        if (bytes(_tokenURI).length > 0) {
            return string(abi.encodePacked(base, _tokenURI));
        }

        return string(abi.encodePacked(base, _tokenId));
    }

    /**
     * @dev Retorna o total de tokens mintados
     */
    function totalSupply() public view returns (uint256) {
        return nextTokenId - 1;
    }
}