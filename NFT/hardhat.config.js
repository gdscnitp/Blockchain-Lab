
/** 
 *  @type import('hardhat/config').HardhatUserConfig
*/

require("dotenv").config();
require("@nomiclabs/hardhat-ethers");
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const { task } = require("hardhat/config");
const { API_URL_SEPOLIA, 
  API_URL_MUMBAI,
  PRIVATE_KEY,
} = process.env;

task("account", "returns nonce and balance for specified address on multiple networks")
  .addParam("address")
  .setAction(async address => {
    const web3Mumbai = createAlchemyWeb3(API_URL_MUMBAI);
    const web3Sepolia = createAlchemyWeb3(API_URL_SEPOLIA);
    const networkIDArr = ["Ethereum Sepolia:", "Polygon  Mumbai:"];
    const providerArr = [web3Sepolia, web3Mumbai];
    const resultArr = [];

    // console.log(providerArr);
    for (let i = 0; i < providerArr.length; i++) {
      const nonce = await providerArr[i].eth.getTransactionCount(address.address, "latest");
      const balance = await providerArr[i].eth.getBalance(address.address)
      resultArr.push([networkIDArr[i], nonce, parseFloat(providerArr[i].utils.fromWei(balance, "ether")).toFixed(2) + "ETH"]);
    }
    resultArr.unshift(["  |NETWORK|   |NONCE|   |BALANCE|  "])
    console.log(resultArr);
  });

//0xBF936510E8f62493e58890596380c28038523Ef8
module.exports = {
  solidity: "0.8.9",
  defaultNetwork: "mumbai",
  networks: {
    hardhat: {},
    sepolia: {
      url: API_URL_SEPOLIA,
      accounts: [`0x${PRIVATE_KEY}`],
    },
    mumbai: {
      url: API_URL_MUMBAI,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
};








