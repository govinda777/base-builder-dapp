// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title SimpleToken
 * @dev Token ERC20 básico para demonstração na Base
 * Quinto contrato para completar a missão "Based Builder"
 */
contract SimpleToken is ERC20, Ownable {
    uint256 public maxSupply;
    uint256 public mintPrice;
    bool public mintingEnabled;

    event TokensMinted(address to, uint256 amount);
    event MintingToggled(bool enabled);
    event PriceUpdated(uint256 newPrice);

    constructor(
        string memory _name,
        string memory _symbol,
        uint256 _maxSupply,
        uint256 _initialSupply
    ) ERC20(_name, _symbol) Ownable(msg.sender) {
        maxSupply = _maxSupply * 10**decimals();
        mintPrice = 0.001 ether; // Preço inicial para mint
        mintingEnabled = true;

        // Mint supply inicial para o owner
        if (_initialSupply > 0) {
            _mint(msg.sender, _initialSupply * 10**decimals());
        }
    }

    /**
     * @dev Mint tokens pagando ETH
     */
    function mint(uint256 _amount) public payable {
        require(mintingEnabled, "Minting desabilitado");
        require(_amount > 0, "Quantidade deve ser maior que zero");
        require(totalSupply() + _amount <= maxSupply, "Excede supply maximo");
        require(msg.value >= mintPrice * _amount / 10**decimals(), "ETH insuficiente");

        _mint(msg.sender, _amount);
        emit TokensMinted(msg.sender, _amount);
    }

    /**
     * @dev Mint gratuito para o owner
     */
    function ownerMint(address _to, uint256 _amount) public onlyOwner {
        require(_amount > 0, "Quantidade deve ser maior que zero");
        require(totalSupply() + _amount <= maxSupply, "Excede supply maximo");

        _mint(_to, _amount);
        emit TokensMinted(_to, _amount);
    }

    /**
     * @dev Toggle do minting público
     */
    function toggleMinting() public onlyOwner {
        mintingEnabled = !mintingEnabled;
        emit MintingToggled(mintingEnabled);
    }

    /**
     * @dev Atualiza o preço do mint
     */
    function updateMintPrice(uint256 _newPrice) public onlyOwner {
        mintPrice = _newPrice;
        emit PriceUpdated(_newPrice);
    }

    /**
     * @dev Saque dos fundos do contrato
     */
    function withdraw() public onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "Sem fundos para sacar");

        (bool success, ) = payable(owner()).call{value: balance}("");
        require(success, "Falha no saque");
    }

    /**
     * @dev Burn tokens do próprio saldo
     */
    function burn(uint256 _amount) public {
        _burn(msg.sender, _amount);
    }

    /**
     * @dev Retorna informações do contrato
     */
    function getContractInfo() public view returns (
        uint256 _totalSupply,
        uint256 _maxSupply,
        uint256 _mintPrice,
        bool _mintingEnabled
    ) {
        return (
            totalSupply(),
            maxSupply,
            mintPrice,
            mintingEnabled
        );
    }
}