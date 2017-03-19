import * as jwt from "jsonwebtoken";
import { IUser } from "../model/user";

const EXPIRES_IN = "1440m";
const JWTKey: string = process.env.JWTKEY;

export function getToken(user: IUser) {
  return jwt.sign(user, JWTKey, {
    algorithm: "HS512",
    expiresIn: EXPIRES_IN,
  } as jwt.SignOptions);
}

export function getUserFromToken(token: string) {
  return jwt.verify(token, JWTKey);
}
