// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

/**
 * @title HelloWorld
 * @dev Contrato simples que retorna uma mensagem de saudação
 * Este é o primeiro contrato para completar a missão "Based Initiate"
 */
contract HelloWorld {
    string public greeting;
    address public owner;

    event GreetingChanged(string newGreeting, address changedBy);

    constructor() {
        greeting = "Hello, Base Blockchain!";
        owner = msg.sender;
    }

    /**
     * @dev Retorna a saudação atual
     */
    function getGreeting() public view returns (string memory) {
        return greeting;
    }

    /**
     * @dev Permite ao owner alterar a saudação
     */
    function setGreeting(string memory _newGreeting) public {
        require(msg.sender == owner, "Apenas o owner pode alterar a saudacao");
        greeting = _newGreeting;
        emit GreetingChanged(_newGreeting, msg.sender);
    }

    /**
     * @dev Retorna uma saudação personalizada
     */
    function sayHelloTo(string memory _name) public pure returns (string memory) {
        return string(abi.encodePacked("Hello, ", _name, "! Welcome to Base!"));
    }
}