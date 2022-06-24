const webClient = require("../config/web-client");

module.exports = async ({ message, next }) => {
  const { user } = message;

  const userDetails = (await webClient.getUserDetails(user)).user;

  message.userDetails = {};

  message.userDetails.name = userDetails.name;
  message.userDetails.avatar = userDetails.profile.image_192;
  message.userDetails.isAdmin = userDetails.is_admin;
  message.userDetails.isOwner = userDetails.is_owner;

  next();
};
