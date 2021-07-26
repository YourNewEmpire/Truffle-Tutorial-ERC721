const nft = artifacts.require("GameItem");

module.exports = async function (deployer) {
 await deployer.deploy(nft);
};
