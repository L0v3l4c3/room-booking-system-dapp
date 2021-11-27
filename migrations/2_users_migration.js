const BookingSystem = artifacts.require("BookingSystem");

module.exports = function (deployer) {
  deployer.deploy(BookingSystem);
};
