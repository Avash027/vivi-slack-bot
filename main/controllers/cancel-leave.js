const LeaveTracker = require("../database/leave-tracker.db");

module.exports = async ({ message, say }) => {
  const { text, user, userDetails } = message;

  if (text.split(" ").length !== 2) {
    await say("Invalid leaveID");
    return;
  }

  const leaveID = text.split(" ")[1];

  if (Number.isNaN(leaveID)) {
    await say("Invalid LeaveID");
    return;
  }

  const [userID, err] = await LeaveTracker.findUserID(leaveID);

  if (!userID) {
    await say(err);
    return;
  }

  if (userID !== user && !userDetails.isAdmin) {
    await say("You are not authorized to cancel this leave");
    return;
  }
  const [, error] = await LeaveTracker.cancelLeave(leaveID);

  if (error) {
    await say("There was some error in the database");
    return;
  }

  await say("Your leave was cancelled");
};
