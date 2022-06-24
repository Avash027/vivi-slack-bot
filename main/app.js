const { App } = require("@slack/bolt");
const webClient = require("./config/web-client");
const pool = require("./config/db");

class SlackBot {
  app;

  constructor({ token, appToken, signingSecret }) {
    this.app = new App({
      signingSecret,
      token,
      socketMode: true,
      appToken,
    });

    this.configureMiddlewares();
    this.configureControllers();
    this.configureWebClient(token);
  }

  connectDatabase(config) {
    pool.connect(config);
  }

  configureMiddlewares() {
    this.app.use(require("./middleware/userDetails"));
  }

  configureControllers() {
    this.app.message(
      /.register-leave */,
      require("./controllers/register-leave")
    );
    this.app.message(/.cancel-leave */, require("./controllers/cancel-leave"));
    this.app.message(/.show-leaves/, require("./controllers/show-leaves"));
    this.app.message(/.assign-role */, require("./controllers/assign-role"));
    this.app.message(/.ping-users */, require("./controllers/ping-users"));
    this.app.message(/.my-roles */, require("./controllers/my-roles"));
    this.app.message(/.remove-role */, require("./controllers/remove-roles"));
    this.app.message(
      /.show-all-roles */,
      require("./controllers/show-all-roles")
    );
  }

  configureWebClient(token) {
    webClient.init(token);
  }

  async startServer(port) {
    console.log(port);
    await this.app.start(port);

    console.log("⚡️ Bolt app is running!");
  }
}

module.exports = SlackBot;
