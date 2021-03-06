import "dotenv-safe/config";
import { Bot, Message } from "viber-bot";
import express from "express";
import { config } from "./config";
import {
  categories,
  doctors,
  date_format,
  time_format,
  concerts,
  flights,
} from "./responses";
import { cleanUp, say, State } from "./util";
import logger from "./logger";

const bot = new Bot({
  logger: logger,
  authToken: config.AUTH_TOKEN,
  name: "woodybot",
  avatar: config.IMG_URL,
});

let state: State = {
  booking: null,
  date: null,
  time: null,
};

bot.onConversationStarted((userProfile, _isSubscribed, _context, onFinish) => {
  onFinish(
    new Message.Text(
      `Ahoy ${userProfile.name}, I am Woody Bot! 🤠🐴 If you want my service, type "booking" or just turn on "Receive Messages" in the settings.`
    )
  );
});

bot.onSubscribe((response) => {
  say(
    response,
    `Ahoy ${response.userProfile.name}! 🤠🐴 If you want to book, just type "booking".`
  );
});

bot.onTextMessage(/^\b(hi|hello)\b$/i, (_message, response) => {
  say(
    response,
    `Ahoy ${response.userProfile.name}, I am Woody Bot! 🤠🐴 If you want to book, just type "booking".`
  );
});

bot.onTextMessage(/^booking$/, (_message, response) => {
  say(response, "What would you want to set booking for?", categories);
});

bot.onTextMessage(/^category/, (message, response) => {
  // match doctor
  if (message.text === categories.Buttons[0].ActionBody) {
    say(response, doctors.ques, doctors.keyboard);
  }
  // match concert
  else if (message.text === categories.Buttons[1].ActionBody) {
    say(response, concerts.ques, concerts.keyboard);
  } else if (message.text === categories.Buttons[2].ActionBody) {
    say(response, flights.ques, flights.keyboard);
  }
});

bot.onTextMessage(/^doctor/i, (message, response) => {
  if (message.text === doctors.keyboard.Buttons[0].ActionBody) {
    state.booking = "Dr. Jessie";
    say(response, doctors.date_ques + "Jessie?" + date_format);
  } else if (message.text === doctors.keyboard.Buttons[1].ActionBody) {
    state.booking = "Dr. Potato";
    say(response, doctors.date_ques + "Potato?" + date_format);
  }
});

bot.onTextMessage(/^concert/i, (message, response) => {
  if (message.text === concerts.keyboard.Buttons[0].ActionBody) {
    state.booking = "The Rex Show";
    say(response, concerts.date_ques + " The Rex Show?" + date_format);
  } else if (message.text === concerts.keyboard.Buttons[1].ActionBody) {
    state.booking = "Wheezy's Musical";
    say(response, concerts.date_ques + " Wheezy's Musical?" + date_format);
  }
});

bot.onTextMessage(/^flight/i, (message, response) => {
  if (message.text === flights.keyboard.Buttons[0].ActionBody) {
    state.booking = "Al's Toy Barn";
    say(response, flights.date_ques + " to Al's Toy Barn" + date_format);
  } else if (message.text === flights.keyboard.Buttons[1].ActionBody) {
    state.booking = "Al's Apartment";
    say(response, flights.date_ques + " to Al's Apartment?" + date_format);
  }
});

bot.onTextMessage(
  /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/,
  (message, response) => {
    state.date = message.text;
    say(response, "When is the time?" + time_format);
  }
);

bot.onTextMessage(
  /^(0?[1-9]|1[012]):[0-5][0-9]\ \b(am|pm)\b$/,
  (message, response) => {
    state.time = message.text;
    if (!state.booking || !state.date) {
      say(
        response,
        'You have not set up booking properly. Please type "booking" again.'
      );
    } else {
      say(
        response,
        `Your booking for ${state.booking} is set on ${state.date} at ${state.time}. Have a nice day! 🤠🐴`
      );
    }
    cleanUp(state);
  }
);

bot.onTextMessage(/\w+/i, (_message, response) => {
  say(
    response,
    "I'm so sorry that I don't understand what you are saying 😵, if you would like to book, please type \"booking\". 🤠🐴"
  );
});

const app = express();

app.use(config.PATH, bot.middleware());

app.listen(config.PORT, () => {
  bot.setWebhook(config.WEBHOOK_URL + config.PATH).catch((error) => {
    logger.error(JSON.stringify(error));
    process.exit(1);
  });
  logger.info(`${config.WEBHOOK_URL}${config.PATH}`);
  logger.info(`Server is running on port ${config.PORT}`);
});
