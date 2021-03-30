export const __PORT__ = 3000;
export const __prod__ = process.env.NODE_ENV === "production";
export const ADMIN_PWD = process.env.ADMIN_PASSWORD as string;
export const COOKIE_NAME = "exodus_authKey";
