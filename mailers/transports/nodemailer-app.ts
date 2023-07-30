import { env } from "@/env.mjs";
import * as nodemailer from "nodemailer";

let user = env.NODEMAILER_LOCAL_USER;
let pass = env.NODEMAILER_LOCAL_PASS;

export const nodemailerAppTransport = nodemailer.createTransport({
  host: "localhost",
  port: 1025,
  auth: {
    user,
    pass,
  },
});
