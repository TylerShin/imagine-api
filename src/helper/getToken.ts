import * as jwt from "jsonwebtoken";
import { IUser } from "../model/user";

const EXPIRES_IN = "1440m";

export default function getToken(user: IUser) {
  const JWTKey: string = process.env.JWTKEY;

  return jwt.sign(user, JWTKey, {
    algorithm: "HS512",
    expiresIn: EXPIRES_IN,
  } as jwt.SignOptions);
}
