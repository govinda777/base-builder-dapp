const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("🧪 Teste dos Contratos Base Builder", function () {
    let deployer, addr1, addr2;
    let helloWorld, simpleStorage, counter, simpleNFT, simpleToken;

    beforeEach(async function () {
        [deployer, addr1, addr2] = await ethers.getSigners();

        // Deploy de todos os contratos antes de cada teste
        const HelloWorld = await ethers.getContractFactory("HelloWorld");
        helloWorld = await HelloWorld.deploy();

        const SimpleStorage = await ethers.getContractFactory("SimpleStorage");
        simpleStorage = await SimpleStorage.deploy();

        const Counter = await ethers.getContractFactory("Counter");
        counter = await Counter.deploy();

        const SimpleNFT = await ethers.getContractFactory("SimpleNFT");
        simpleNFT = await SimpleNFT.deploy();

        const SimpleToken = await ethers.getContractFactory("SimpleToken");
        simpleToken = await SimpleToken.deploy(
            "Test Token",
            "TST", 
            1000000,
            10000
        );
    });

    describe("HelloWorld", function () {
        it("Deve ter a saudação inicial correta", async function () {
            expect(await helloWorld.getGreeting()).to.equal("Hello, Base Blockchain!");
        });

        it("Deve permitir alterar a saudação pelo owner", async function () {
            await helloWorld.setGreeting("Nova saudacao!");
            expect(await helloWorld.getGreeting()).to.equal("Nova saudacao!");
        });

        it("Deve retornar saudação personalizada", async function () {
            const result = await helloWorld.sayHelloTo("Desenvolvedor");
            expect(result).to.equal("Hello, Desenvolvedor! Welcome to Base!");
        });
    });

    describe("SimpleStorage", function () {
        it("Deve ter número inicial 42", async function () {
            expect(await simpleStorage.retrieve()).to.equal(42);
        });

        it("Deve permitir armazenar um novo número", async function () {
            await simpleStorage.store(123);
            expect(await simpleStorage.retrieve()).to.equal(123);
        });

        it("Deve incrementar corretamente", async function () {
            await simpleStorage.increment();
            expect(await simpleStorage.retrieve()).to.equal(43);
        });
    });

    describe("Counter", function () {
        it("Deve iniciar com contador zero", async function () {
            expect(await counter.getCount()).to.equal(0);
        });

        it("Deve incrementar corretamente", async function () {
            await counter.increment();
            expect(await counter.getCount()).to.equal(1);
        });

        it("Deve adicionar valor ao contador", async function () {
            await counter.addToCount(5);
            expect(await counter.getCount()).to.equal(5);
        });
    });

    describe("SimpleNFT", function () {
        it("Deve ter nome e símbolo corretos", async function () {
            expect(await simpleNFT.name()).to.equal("Base Builder NFT");
            expect(await simpleNFT.symbol()).to.equal("BBN");
        });

        it("Deve permitir mint pelo owner", async function () {
            await simpleNFT.mint(addr1.address);
            expect(await simpleNFT.ownerOf(1)).to.equal(addr1.address);
            expect(await simpleNFT.totalSupply()).to.equal(1);
        });

        it("Deve permitir mint para si mesmo", async function () {
            await simpleNFT.connect(addr1).mintToSelf();
            expect(await simpleNFT.ownerOf(1)).to.equal(addr1.address);
        });
    });

    describe("SimpleToken", function () {
        it("Deve ter nome e símbolo corretos", async function () {
            expect(await simpleToken.name()).to.equal("Test Token");
            expect(await simpleToken.symbol()).to.equal("TST");
        });

        it("Deve ter supply inicial correto", async function () {
            const expectedSupply = ethers.parseUnits("10000", 18);
            expect(await simpleToken.totalSupply()).to.equal(expectedSupply);
        });

        it("Deve permitir mint com pagamento", async function () {
            const mintAmount = ethers.parseUnits("100", 18);
            const mintPrice = await simpleToken.mintPrice();
            const payment = (mintPrice * 100n); // 100 tokens

            await simpleToken.connect(addr1).mint(mintAmount, { value: payment });
            expect(await simpleToken.balanceOf(addr1.address)).to.equal(mintAmount);
        });
    });

    it("🎉 Todos os contratos devem estar deployados", async function () {
        expect(await helloWorld.getAddress()).to.not.be.undefined;
        expect(await simpleStorage.getAddress()).to.not.be.undefined;
        expect(await counter.getAddress()).to.not.be.undefined;
        expect(await simpleNFT.getAddress()).to.not.be.undefined;
        expect(await simpleToken.getAddress()).to.not.be.undefined;

        console.log("✅ Todos os 5 contratos testados com sucesso!");
        console.log("✅ Projeto pronto para as missões Based Initiate e Based Builder!");
    });
});