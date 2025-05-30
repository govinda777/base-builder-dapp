const hre = require("hardhat");

async function deployContract(contractName, constructorArgs = []) {
    console.log(`🚀 Fazendo deploy do ${contractName}...`);

    // Obter o signer
    const [deployer] = await hre.ethers.getSigners();
    console.log("📝 Deploy será feito com a conta:", deployer.address);

    // Verificar saldo
    const balance = await deployer.provider.getBalance(deployer.address);
    console.log("💰 Saldo da conta:", hre.ethers.formatEther(balance), "ETH");

    if (balance === 0n) {
        console.log("❌ Saldo insuficiente! Use um faucet para obter ETH de teste.");
        return null;
    }

    try {
        // Deploy do contrato
        const ContractFactory = await hre.ethers.getContractFactory(contractName);
        const contract = await ContractFactory.deploy(...constructorArgs);
        await contract.waitForDeployment();

        const contractAddress = await contract.getAddress();
        console.log(`✅ ${contractName} deployed em:`, contractAddress);

        // Informações adicionais
        console.log("🌐 Rede:", hre.network.name);
        console.log("⛽ Gas usado: Verificar na transação");

        if (hre.network.name !== "hardhat") {
            const explorerUrl = hre.network.name === "base-sepolia" 
                ? "https://sepolia.basescan.org" 
                : "https://basescan.org";
            console.log(`🔍 Ver no explorer: ${explorerUrl}/address/${contractAddress}`);
        }

        return {
            contract,
            address: contractAddress
        };

    } catch (error) {
        console.error("❌ Erro durante o deploy:", error);
        return null;
    }
}

// Função principal
async function main() {
    const contractName = process.argv[2];

    if (!contractName) {
        console.log("❌ Especifique o nome do contrato!");
        console.log("Uso: npx hardhat run scripts/deploy-single.js --network base-sepolia -- <ContractName>");
        console.log("\nContratos disponíveis:");
        console.log("- HelloWorld");
        console.log("- SimpleStorage");
        console.log("- Counter");
        console.log("- SimpleNFT");
        console.log("- SimpleToken");
        return;
    }

    let result;

    switch (contractName) {
        case "HelloWorld":
            result = await deployContract("HelloWorld");
            break;
        case "SimpleStorage":
            result = await deployContract("SimpleStorage");
            break;
        case "Counter":
            result = await deployContract("Counter");
            break;
        case "SimpleNFT":
            result = await deployContract("SimpleNFT");
            break;
        case "SimpleToken":
            result = await deployContract("SimpleToken", [
                "Base Builder Token",  // nome
                "BBT",                 // símbolo  
                1000000,              // max supply
                10000                 // initial supply
            ]);
            break;
        default:
            console.log("❌ Contrato não encontrado:", contractName);
            return;
    }

    if (result) {
        console.log("\n🎉 Deploy concluído com sucesso!");
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("❌ Erro fatal:", error);
        process.exit(1);
    });