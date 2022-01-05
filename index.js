const MyCatLikesFirebase = require("./classes/MyCatLikesFirebase");
const MyCatLikesFirebaseServer = require("./classes/MyCatLikesFirebaseServer");

module.exports = {
  ...MyCatLikesFirebase,
  ...MyCatLikesFirebaseServer,
};
