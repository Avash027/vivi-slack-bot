const RoleTracker = require("../database/role-tracker.db");

module.exports = async function ({ message, say }) {
  const { user } = message;

  const [roles, err] = await RoleTracker.findRolesFromUser(user);

  if (err) {
    await say(`There was an error`);
    return;
  }

  await say("Your roles are: " + roles.join(", "));
};
