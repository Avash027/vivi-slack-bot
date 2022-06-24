const RoleTracker = require("../database/role-tracker.db");

module.exports = async function ({ message, say }) {
  if (message.text.split(" ").length < 3) {
    await say("Please provide a user and role to remove");
    return;
  }

  let [, user, role] = message.text.split(" ");
  user = user.substring(2, user.length - 1);

  const [, err] = await RoleTracker.removeRole(user, role);

  if (err) {
    await say(`There was an error`);
    return;
  }

  await say(`Removed ${role} from <@${user}>`);
};
