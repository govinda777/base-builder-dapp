# 🚀 Base Builder Quest - Projeto Completo

**Projeto completo para completar as missões "Based Initiate" e "Based Builder" na plataforma Galxe**

Este projeto contém tudo que você precisa para fazer deploy de smart contracts na rede Base e completar as missões da Galxe que recompensam desenvolvedores que contribuem para o ecossistema Base.

## 🎯 Objetivos das Missões

### Based Initiate 
- **Requisito**: Deploy de **1 smart contract** na rede Base
- **Recompensa**: Papel "Based Initiate" no Discord da Base

### Based Builder
- **Requisito**: Deploy de **5 smart contracts** na rede Base  
- **Recompensa**: Papel "Based Builder" no Discord da Base

## 📁 Estrutura do Projeto

```
base-builder-quest/
├── contracts/              # Smart contracts
│   ├── HelloWorld.sol      # Contrato básico de saudação
│   ├── SimpleStorage.sol   # Armazenamento de números
│   ├── Counter.sol         # Contador com incremento/decremento
│   ├── SimpleNFT.sol       # NFT ERC721 básico
│   └── SimpleToken.sol     # Token ERC20 básico
├── scripts/                # Scripts de deploy
│   ├── deploy.js           # Deploy de todos os contratos
│   ├── deploy-single.js    # Deploy individual
│   └── verify.js           # Verificação no BaseScan
├── test/                   # Testes dos contratos
│   └── test-contracts.js   # Testes automatizados
├── package.json            # Dependências do projeto
├── hardhat.config.js       # Configuração do Hardhat
├── .env.example            # Exemplo de variáveis de ambiente
└── README.md               # Esta documentação
```

## 🛠️ Configuração Inicial

### 1. Pré-requisitos

- **Node.js** v18+ instalado
- **Carteira Web3** (MetaMask, Coinbase Wallet, etc.)
- **ETH na rede Base Sepolia** (testnet)

## Como executar o projeto base-builder-dapp usando Yarn

Você pode rodar o projeto base-builder-dapp localmente usando Yarn em vez de npm, já que o Yarn é totalmente compatível com projetos Node.js que usam `package.json`[2][5]. Veja o passo a passo adaptado para Yarn:

---

### **1. Pré-requisitos**

- Node.js instalado (versão 18 ou superior recomendada)
- Yarn instalado (`npm install -g yarn`)

---

### **2. Clone o repositório**

```bash
git clone https://github.com/govinda777/base-builder-dapp.git
cd base-builder-dapp
```

---

### **3. Instale as dependências**

```bash
yarn
```
Isso instalará todas as dependências listadas no `package.json` e criará um arquivo `yarn.lock`[2][5].

---

### **4. Configure as variáveis de ambiente**

- Copie o arquivo de exemplo:
  ```bash
  cp .env.example .env
  ```
- Edite o arquivo `.env` e preencha com sua chave privada de teste e (opcionalmente) a chave da BaseScan.

---

### **5. Compile os contratos**

```bash
yarn compile
```
Esse comando executa o script de compilação dos contratos Solidity.

---

### **6. Execute os testes**

```bash
yarn test
```
Isso roda os testes automatizados do projeto.

---

### **7. Faça deploy dos contratos**

- Para deploy em Base Sepolia (testnet):
  ```bash
  yarn deploy:sepolia
  ```
- Para deploy individual de um contrato, use:
  ```bash
  yarn hardhat run scripts/deploy-single.js --network base-sepolia -- 
  ```
  Substitua `` pelo nome do contrato desejado (ex: `HelloWorld`).

---

### **8. (Opcional) Verifique contratos no BaseScan**

Se configurou a chave da BaseScan no `.env`, rode:
```bash
yarn verify
```

---

### **Resumo dos comandos Yarn equivalentes ao npm**

| npm                | Yarn               |
|--------------------|--------------------|
| npm install        | yarn               |
| npm run build      | yarn build         |
| npm run test       | yarn test          |
| npm run    | yarn       |

Yarn pode ser usado em qualquer projeto Node.js sem necessidade de alterar o `package.json`[2].

### 3. Configurar Variáveis de Ambiente

Edite o arquivo `.env` e configure:

```env
# Sua chave privada (NUNCA compartilhe!)
PRIVATE_KEY=sua_chave_privada_aqui_sem_0x

# API Key do BaseScan (opcional, para verificação)
BASESCAN_API_KEY=sua_api_key_basescan_aqui
```

⚠️ **IMPORTANTE**: Nunca compartilhe sua chave privada! Use uma carteira separada apenas para desenvolvimento.

### 4. Obter ETH de Teste

Você precisa de ETH na rede Base Sepolia para pagar as taxas de gas. Use um dos faucets:

- **[Coinbase Developer Platform Faucet](https://portal.cdp.coinbase.com/products/faucet)**
- **[Chainstack Faucet](https://faucet.chainstack.com/base-sepolia-faucet)**
- **[QuickNode Faucet](https://faucet.quicknode.com/base/sepolia)**
- **[Alchemy Faucet](https://sepoliafaucet.com/)**

## 📄 Descrição dos Contratos

### 1. HelloWorld.sol
- **Função**: Contrato básico que retorna saudações
- **Recursos**: Alteração de mensagem, saudação personalizada
- **Uso**: Ideal para primeira experiência com smart contracts

### 2. SimpleStorage.sol  
- **Função**: Armazena e manipula números
- **Recursos**: Store, retrieve, increment, multiply
- **Uso**: Demonstra armazenamento de estado

### 3. Counter.sol
- **Função**: Contador simples
- **Recursos**: Incremento, decremento, reset, adição de valores
- **Uso**: Padrão comum em dApps

### 4. SimpleNFT.sol
- **Função**: NFT básico compatível com ERC721
- **Recursos**: Mint, transfer, metadata
- **Uso**: Base para projetos de NFT

### 5. SimpleToken.sol
- **Função**: Token compatível com ERC20
- **Recursos**: Mint pago, burn, withdraw
- **Uso**: Base para projetos de DeFi

## 🎯 Completando as Missões

### Passo a Passo:

1. **Configure o projeto** seguindo as instruções acima
2. **Execute o deploy** na Base Sepolia:
   ```bash
   npm run deploy:sepolia
   ```
3. **Aguarde alguns minutos** para os contratos serem indexados
4. **Vá para a Galxe** e conecte a mesma carteira usada no deploy
5. **Procure pelas missões**:
   - "Based Initiate" - deve aparecer como completa
   - "Based Builder" - deve aparecer como completa
6. **Reivindique suas recompensas!**

### Solução de Problemas:

**❌ "No access" na missão:**
- Verifique se usou a carteira correta
- Aguarde mais tempo para indexação
- Confirme que os contratos foram deployados com sucesso

**❌ Falha no deploy:**
- Verifique sua chave privada no `.env`
- Confirme que tem ETH suficiente na carteira
- Tente novamente após alguns minutos

## 🔍 Verificação Manual

Após o deploy, você pode verificar seus contratos:

1. **No BaseScan**: `https://sepolia.basescan.org/address/[SEU_ENDERECO_DO_CONTRATO]`
2. **No arquivo de deployment**: `deployments-base-sepolia.json`

## 🌐 Redes Suportadas

- **Base Sepolia** (Testnet) - Para as missões
- **Base Mainnet** - Para projetos reais
- **Hardhat Network** - Para desenvolvimento local

## 📚 Recursos Adicionais

- **[Documentação da Base](https://docs.base.org/)**
- **[Faucets da Base](https://docs.base.org/chain/network-faucets)**
- **[Discord da Base](https://discord.gg/buildonbase)**
- **[BaseScan](https://basescan.org/)**

## 🤝 Contribuindo

Encontrou um bug ou quer melhorar algo?

1. Abra uma issue
2. Faça um fork do projeto  
3. Crie uma branch para sua feature
4. Faça commit das mudanças
5. Abra um Pull Request

## 📄 Licença

Este projeto está licenciado sob a licença MIT.

## ⚠️ Disclaimer

Este projeto é para fins educacionais e de demonstração. Os contratos não passaram por auditoria de segurança e não devem ser usados em produção sem revisão adequada.

---

**🎉 Boa sorte completando suas missões na Base! 🚀**

Se este projeto te ajudou, considere dar uma ⭐ no repositório!