const LeaveTracker = require("../database/leave-tracker.db");

module.exports = async ({ message, say }) => {
  const { text, user, userDetails } = message;
  const dates = text
    .split(" ")
    .filter((word) => !Number.isNaN(Date.parse(word)));

  const reason = text
    .split(" ")
    .filter((word) => Number.isNaN(Date.parse(word)) && word[0] !== ".")
    .join(" ");

  console.log(reason);

  if (dates.length !== 2) {
    await say("Dates are invalid");
  } else if (Date.parse(dates[0]) > Date.parse(dates[1])) {
    await say("Start date is greater than end date");
  } else {
    const [leaveId, err] = await LeaveTracker.registerLeave(
      user,
      dates[0],
      dates[1],
      reason,
      userDetails.avatar,
      userDetails.name
    );

    if (err) {
      await say("Your leave was not registered");
      return;
    }

    await say(
      `Your leave id ${leaveId} is registered. To unsubscribe, type .cancel-leave ${leaveId}`
    );
  }
};
