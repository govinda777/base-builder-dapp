const hre = require("hardhat");
const fs = require("fs");

async function main() {
    const networkName = hre.network.name;
    const deploymentFile = `deployments-${networkName}.json`;

    if (!fs.existsSync(deploymentFile)) {
        console.log(`❌ Arquivo de deployment não encontrado: ${deploymentFile}`);
        console.log("Execute primeiro: npm run deploy:sepolia");
        return;
    }

    const deploymentData = JSON.parse(fs.readFileSync(deploymentFile, 'utf8'));

    console.log("🔍 Verificando contratos deployados...");
    console.log("Rede:", deploymentData.network);
    console.log("Deploy feito por:", deploymentData.deployer);
    console.log("Data:", new Date(deploymentData.timestamp).toLocaleString());

    for (const contract of deploymentData.contracts) {
        try {
            console.log(`\n📄 Verificando ${contract.name}...`);

            if (contract.name === "SimpleToken") {
                await hre.run("verify:verify", {
                    address: contract.address,
                    constructorArguments: [
                        "Base Builder Token",
                        "BBT", 
                        1000000,
                        10000
                    ],
                });
            } else {
                await hre.run("verify:verify", {
                    address: contract.address,
                    constructorArguments: [],
                });
            }

            console.log(`✅ ${contract.name} verificado com sucesso!`);

        } catch (error) {
            if (error.message.includes("Already Verified")) {
                console.log(`✅ ${contract.name} já estava verificado`);
            } else {
                console.log(`❌ Erro ao verificar ${contract.name}:`, error.message);
            }
        }
    }

    console.log("\n🎉 Verificação concluída!");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("❌ Erro:", error);
        process.exit(1);
    });