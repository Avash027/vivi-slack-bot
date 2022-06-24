const { WebClient } = require("@slack/web-api");

class webClient {
  client;

  init(token) {
    this.client = new WebClient(token);
  }

  async getUserDetails(userID) {
    const userDetails = await this.client.users.info({ user: userID });

    return userDetails;
  }
}

module.exports = new webClient();
