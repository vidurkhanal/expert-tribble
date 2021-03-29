import { Request, Response } from "express";

export type betterRequest = Request & { userID: string };
export type betterResponse = Response;
