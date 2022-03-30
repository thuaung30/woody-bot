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
import { cleanUp, say } from "./util";
import logger from "./logger";

let booking: string | undefined;
let date: string | undefined;
let time: string | undefined;

const bot = new Bot({
  logger: logger,
  authToken: config.AUTH_TOKEN,
  name: "woodybot",
  avatar: config.IMG_URL,
});

bot.onConversationStarted((response) => {
  say(
    response,
    `Hi there ${response.userProfile.name}, I am Woody Bot! If you want to set booking, type "booking".`
  );
});

bot.onSubscribe((userProfile, _isSubscribed, _context, onFinish) => {
  onFinish(
    new Message.Text(
      `Hi there ${userProfile.name}, I am Woody Bot! If you want to set booking, just type "booking".`
    )
  );
});

bot.onTextMessage(/^booking$/, (_message, response) => {
  say(response, "What would you want to set booking for?", categories);
});

bot.onTextMessage(/^category:/, (message, response) => {
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
    booking = doctors.keyboard.Buttons[0].Text;
    say(response, doctors.date_ques + "Jessie?" + date_format);
  } else if (message.text === doctors.keyboard.Buttons[1].ActionBody) {
    booking = doctors.keyboard.Buttons[1].Text;
    say(response, doctors.date_ques + "Potato?" + date_format);
  }
});

bot.onTextMessage(/^concert/i, (message, response) => {
  if (message.text === concerts.keyboard.Buttons[0].ActionBody) {
    booking = concerts.keyboard.Buttons[0].Text;
    say(response, concerts.date_ques + " The Rex Show?" + date_format);
  } else if (message.text === concerts.keyboard.Buttons[1].ActionBody) {
    booking = concerts.keyboard.Buttons[1].Text;
    say(response, concerts.date_ques + " Wheezy's Musical?" + date_format);
  }
});

bot.onTextMessage(/^flight/i, (message, response) => {
  if (message.text === flights.keyboard.Buttons[0].ActionBody) {
    booking = flights.keyboard.Buttons[0].Text;
    say(response, flights.date_ques + " to Al's Toy Barn" + date_format);
  } else if (message.text === flights.keyboard.Buttons[1].ActionBody) {
    booking = flights.keyboard.Buttons[1].Text;
    say(response, flights.date_ques + " to Al's Apartment?" + date_format);
  }
});

bot.onTextMessage(/\d{2}\/\d{2}\/\d{2}/, (message, response) => {
  date = message.text;
  say(response, "When is the time?" + time_format);
});

bot.onTextMessage(/\d{2}:\d{2}\ am|pm/i, (message, response) => {
  time = message.text;
  if (!booking || !date) {
    say(
      response,
      'You have not set up booking properly. Please type "booking" again.'
    );
  } else {
    say(response, `Your booking for ${booking} is set on ${date} at ${time}.`);
  }
  cleanUp(booking, date, time);
});

bot.onTextMessage(/\w+/i, (_message, response) => {
  say(
    response,
    'I don\'t understand what you are saying, if you would like to book, please type "booking".'
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
