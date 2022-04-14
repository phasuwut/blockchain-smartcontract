# Basic Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help
```

ใช้ account 0x7B8aE3C8C0F2d663F64cD37DE7b7084fDea23075
Contract deployed to address: 0xD938e15C48c0408eC658726ef3D30d0Af11789CB


npx hardhat verify --network ropsten 0xD938e15C48c0408eC658726ef3D30d0Af11789CB 

<!-- 
(base) phasuwut@Phasuwuts-MacBook-Pro-2 blockchain-smartcontract % npx hardhat verify --network ropsten 0xD938e15C48c0408eC658726ef3D30d0Af11789CB 
Nothing to compile
Successfully submitted source code for contract
contracts/Lottery.sol:Lottery at 0xD938e15C48c0408eC658726ef3D30d0Af11789CB
for verification on the block explorer. Waiting for verification result...

Successfully verified contract Lottery on Etherscan.
https://ropsten.etherscan.io/address/0xD938e15C48c0408eC658726ef3D30d0Af11789CB#code
 -->

