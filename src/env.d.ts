declare namespace NodeJS {
  interface ProcessEnv {
    AUTH_TOKEN: string;
    IMG_URL: string;
    WEBHOOK_URL: string;
    PORT: string;
    GOOGLE_CREDENTIALS: string;
    CALENDAR_ID: string;
  }
}
