import { Message } from "viber-bot";

export function say(response: any, message: string, ...args) {
  response.send(new Message.Text(message, ...args));
}

export function cleanUp(booking?: string, date?: string, time?: string) {
  booking = undefined;
  date = undefined;
  time = undefined;
}
