// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

/**
 * @title Counter
 * @dev Contrato contador simples com funcionalidades básicas
 * Terceiro contrato para a missão "Based Builder"
 */
contract Counter {
    uint256 public count;
    address public owner;

    event CountIncremented(uint256 newCount, address incrementedBy);
    event CountDecremented(uint256 newCount, address decrementedBy);
    event CountReset(address resetBy);

    constructor() {
        count = 0;
        owner = msg.sender;
    }

    /**
     * @dev Incrementa o contador
     */
    function increment() public {
        count += 1;
        emit CountIncremented(count, msg.sender);
    }

    /**
     * @dev Decrementa o contador (não pode ficar negativo)
     */
    function decrement() public {
        require(count > 0, "Contador nao pode ser negativo");
        count -= 1;
        emit CountDecremented(count, msg.sender);
    }

    /**
     * @dev Reseta o contador para zero (apenas owner)
     */
    function reset() public {
        require(msg.sender == owner, "Apenas o owner pode resetar");
        count = 0;
        emit CountReset(msg.sender);
    }

    /**
     * @dev Retorna o valor atual do contador
     */
    function getCount() public view returns (uint256) {
        return count;
    }

    /**
     * @dev Adiciona um valor específico ao contador
     */
    function addToCount(uint256 _value) public {
        count += _value;
        emit CountIncremented(count, msg.sender);
    }
}