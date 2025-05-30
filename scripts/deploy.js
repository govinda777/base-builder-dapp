const hre = require("hardhat");
const fs = require("fs");

async function main() {
    console.log("🚀 Iniciando deploy de todos os contratos na rede Base...");
    console.log("Rede:", hre.network.name);

    // Obter o signer
    const [deployer] = await hre.ethers.getSigners();
    console.log("📝 Deploy será feito com a conta:", deployer.address);

    // Verificar saldo
    const balance = await deployer.provider.getBalance(deployer.address);
    console.log("💰 Saldo da conta:", hre.ethers.formatEther(balance), "ETH");

    if (balance === 0n) {
        console.log("❌ Saldo insuficiente! Use um faucet para obter ETH de teste.");
        return;
    }

    const deployedContracts = [];

    try {
        // 1. Deploy HelloWorld
        console.log("\n📄 Fazendo deploy do HelloWorld...");
        const HelloWorld = await hre.ethers.getContractFactory("HelloWorld");
        const helloWorld = await HelloWorld.deploy();
        await helloWorld.waitForDeployment();

        const helloWorldAddress = await helloWorld.getAddress();
        console.log("✅ HelloWorld deployed em:", helloWorldAddress);
        deployedContracts.push({
            name: "HelloWorld",
            address: helloWorldAddress,
            contract: helloWorld
        });

        // 2. Deploy SimpleStorage
        console.log("\n📄 Fazendo deploy do SimpleStorage...");
        const SimpleStorage = await hre.ethers.getContractFactory("SimpleStorage");
        const simpleStorage = await SimpleStorage.deploy();
        await simpleStorage.waitForDeployment();

        const simpleStorageAddress = await simpleStorage.getAddress();
        console.log("✅ SimpleStorage deployed em:", simpleStorageAddress);
        deployedContracts.push({
            name: "SimpleStorage",
            address: simpleStorageAddress,
            contract: simpleStorage
        });

        // 3. Deploy Counter
        console.log("\n📄 Fazendo deploy do Counter...");
        const Counter = await hre.ethers.getContractFactory("Counter");
        const counter = await Counter.deploy();
        await counter.waitForDeployment();

        const counterAddress = await counter.getAddress();
        console.log("✅ Counter deployed em:", counterAddress);
        deployedContracts.push({
            name: "Counter",
            address: counterAddress,
            contract: counter
        });

        // 4. Deploy SimpleNFT
        console.log("\n📄 Fazendo deploy do SimpleNFT...");
        const SimpleNFT = await hre.ethers.getContractFactory("SimpleNFT");
        const simpleNFT = await SimpleNFT.deploy();
        await simpleNFT.waitForDeployment();

        const simpleNFTAddress = await simpleNFT.getAddress();
        console.log("✅ SimpleNFT deployed em:", simpleNFTAddress);
        deployedContracts.push({
            name: "SimpleNFT",
            address: simpleNFTAddress,
            contract: simpleNFT
        });

        // 5. Deploy SimpleToken
        console.log("\n📄 Fazendo deploy do SimpleToken...");
        const SimpleToken = await hre.ethers.getContractFactory("SimpleToken");
        const simpleToken = await SimpleToken.deploy(
            "Base Builder Token",  // nome
            "BBT",                 // símbolo
            1000000,              // max supply (1M tokens)
            10000                 // initial supply (10K tokens)
        );
        await simpleToken.waitForDeployment();

        const simpleTokenAddress = await simpleToken.getAddress();
        console.log("✅ SimpleToken deployed em:", simpleTokenAddress);
        deployedContracts.push({
            name: "SimpleToken",
            address: simpleTokenAddress,
            contract: simpleToken
        });

        // Resumo final
        console.log("\n🎉 DEPLOY CONCLUÍDO COM SUCESSO!");
        console.log("📊 Resumo dos contratos deployados:");
        console.log("=====================================");

        deployedContracts.forEach((contract, index) => {
            console.log(`${index + 1}. ${contract.name}: ${contract.address}`);
        });

        // Salvar endereços em arquivo
        const deploymentData = {
            network: hre.network.name,
            deployer: deployer.address,
            timestamp: new Date().toISOString(),
            contracts: deployedContracts.map(c => ({
                name: c.name,
                address: c.address
            }))
        };

        fs.writeFileSync(
            `deployments-${hre.network.name}.json`,
            JSON.stringify(deploymentData, null, 2)
        );

        console.log(`\n💾 Endereços salvos em: deployments-${hre.network.name}.json`);

        // Instruções para as missões Galxe
        console.log("\n🎯 MISSÕES GALXE:");
        console.log("✅ Based Initiate: Complete! (1+ contratos deployados)");
        console.log("✅ Based Builder: Complete! (5 contratos deployados)");

        console.log("\n📋 Próximos passos:");
        console.log("1. Aguarde alguns minutos para os contratos serem indexados");
        console.log("2. Conecte sua carteira na Galxe");
        console.log("3. Vá para as missões Based Initiate e Based Builder");
        console.log("4. A verificação deve ser automática!");

        if (hre.network.name !== "hardhat") {
            console.log("\n🔍 Para verificar os contratos no BaseScan:");
            deployedContracts.forEach((contract) => {
                const explorerUrl = hre.network.name === "base-sepolia" 
                    ? "https://sepolia.basescan.org" 
                    : "https://basescan.org";
                console.log(`${contract.name}: ${explorerUrl}/address/${contract.address}`);
            });
        }

    } catch (error) {
        console.error("❌ Erro durante o deploy:", error);
        process.exit(1);
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("❌ Erro fatal:", error);
        process.exit(1);
    });