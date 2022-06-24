const RoleTracker = require("../database/role-tracker.db");

module.exports = async function ({ say }) {
  const [userRoles, err] = await RoleTracker.getUsersAndTheirRoles();

  if (err) {
    await say(`Something went wrong`);
    return;
  }

  const users = Object.keys(userRoles);

  const blocks = [
    {
      type: "header",
      text: {
        type: "plain_text",
        text: "User Roles",
      },
    },
    {
      type: "divider",
    },
  ];
  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    const roles = userRoles[user];

    blocks.push({
      accessory: {
        type: "image",
        image_url: roles.avatar,
        alt_text: "User Avatar",
      },
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*${user}* has role(s): *${roles.roles.join(", ")}*`,
      },
    });

    blocks.push({
      type: "divider",
    });
  }

  await say({ blocks });
};
