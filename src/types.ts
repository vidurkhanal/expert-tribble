import { Request, Response } from "express";
import { Session, SessionData } from "express-session";
import { RedisClient } from "redis";

export type betterRequest = Request & {
  session: Session & Partial<SessionData> & { userId?: string };
};
export type betterResponse = Response;
export type betterRedis = RedisClient;
