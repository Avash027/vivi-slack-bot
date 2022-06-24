const RoleTracker = require("../database/role-tracker.db");
const webClient = require("../config/web-client");

module.exports = async function ({ message, say }) {
  if (message.text.split(" ").length < 3) {
    await say(
      "Invalid syntax. Please use the following syntax: `.assign-role <user> <role>`"
    );
    return;
  }

  const role = message.text.split(" ")[2];
  let user = message.text.split(" ")[1];

  user = user.substring(2, user.length - 1);

  const { user: userDetails } = await webClient.getUserDetails(user);

  if (role[0] !== "@" || user.length === 0 || role.length === 0) {
    await say(
      "Invalid syntax. Please use the following syntax: `.assign-role <user> <role>`"
    );
    return;
  }

  const [, err] = await RoleTracker.insertUserRole(
    user,
    role,
    userDetails.name,
    userDetails.profile.image_192
  );

  if (err) {
    await say("There was an issue with database");
    return;
  }

  await say("User successfully assigned role");
};
