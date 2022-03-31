import { Message } from "viber-bot";

export function say(response: any, message: string, ...args) {
  response.send(new Message.Text(message, ...args));
}

export type State = {
  booking: string | null;
  date: string | null;
  time: string | null;
};

export function cleanUp(state: State) {
  state.booking = null;
  state.time = null;
  state.date = null;
}
