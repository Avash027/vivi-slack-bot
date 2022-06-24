const RoleTracker = require("../database/role-tracker.db");

module.exports = async function ({ message, say }) {
  const roles = message.text
    .split(" ")
    .filter((role) => role.length > 0 && role[0] === "@");

  console.log(roles);

  const additionalMessage = message.text
    .split(" ")
    .filter((word) => word.length > 0 && word[0] !== "@" && word[0] !== ".")
    .join(" ");

  if (roles.length === 0) {
    await say(
      "Invalid syntax. Please use the following syntax: `.ping-users <role>`"
    );
    return;
  }

  const [users, err] = await RoleTracker.findUsersFromRoles(roles);

  if (err) {
    await say("There was an issue with database");
    return;
  }

  await say({
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `Heyy ${users.join(
            " "
          )}. Here's a message *${additionalMessage}*`,
        },
      },
    ],
  });
};
