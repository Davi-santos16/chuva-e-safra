import "dotenv/config";
import type { SignOptions } from "jsonwebtoken";

const expiresIn = (process.env.JWT_EXPIRES_IN ?? "1d") as SignOptions["expiresIn"];

const authConfig = {
  jwt: {
    secret: process.env.JWT_SECRET ?? "",
    expiresIn,
  },
};

export { authConfig };
