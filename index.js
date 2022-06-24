const SlackBot = require("./main/app");
require("dotenv").config();

const Bot = new SlackBot({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

console.log(process.env.PORT);

Bot.startServer(process.env.PORT || 3000);

Bot.connectDatabase(
  process.env.ENV === "DEVELOPMENT"
    ? {
        host: process.env.DB_HOST,
        database: process.env.DB_DATABASE,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        max: process.env.DB_MAX,
      }
    : {
        connectionString: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false,
        },
      }
);
