const LeaveTracker = require("../database/leave-tracker.db");

module.exports = async ({ say }) => {
  const [userOnLeaves, err] = await LeaveTracker.getCurrentLeaves();

  if (err) {
    await say("Could not fetch employees who are in leaves");
    return;
  }

  if (userOnLeaves === 0) {
    await say("No employees are in leaves");
    return;
  }

  const blocks = [
    {
      type: "header",
      text: {
        type: "plain_text",
        text: "Employyes in leaves are",
      },
    },
    {
      type: "divider",
    },
  ];

  userOnLeaves.forEach((user) => {
    blocks.push({
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*${user.name}* is on leave from *${user.startDate}* to *${user.endDate}*`,
      },
      accessory: {
        type: "image",
        image_url: user.avatar,
        alt_text: "User avatar",
      },
    });
    blocks.push({
      type: "divider",
    });
  });

  await say({ blocks });
};
