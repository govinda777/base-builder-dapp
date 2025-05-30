// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

/**
 * @title SimpleStorage
 * @dev Contrato para armazenar e recuperar um número
 * Segundo contrato para a missão "Based Builder"
 */
contract SimpleStorage {
    uint256 public storedNumber;
    address public lastUpdater;

    event NumberUpdated(uint256 newNumber, address updatedBy, uint256 timestamp);

    constructor() {
        storedNumber = 42; // Número inicial
        lastUpdater = msg.sender;
    }

    /**
     * @dev Armazena um número
     */
    function store(uint256 _number) public {
        storedNumber = _number;
        lastUpdater = msg.sender;
        emit NumberUpdated(_number, msg.sender, block.timestamp);
    }

    /**
     * @dev Recupera o número armazenado
     */
    function retrieve() public view returns (uint256) {
        return storedNumber;
    }

    /**
     * @dev Incrementa o número armazenado
     */
    function increment() public {
        storedNumber += 1;
        lastUpdater = msg.sender;
        emit NumberUpdated(storedNumber, msg.sender, block.timestamp);
    }

    /**
     * @dev Multiplica o número por um fator
     */
    function multiplyBy(uint256 _factor) public {
        storedNumber *= _factor;
        lastUpdater = msg.sender;
        emit NumberUpdated(storedNumber, msg.sender, block.timestamp);
    }
}