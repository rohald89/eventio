import { isDev } from "@/config";
import { Resend } from "resend";
import { CreateEmailOptions } from "resend/build/src/emails/interfaces";
import { nodemailerAppTransport } from "./transports/nodemailer-app";
import { render } from "@react-email/render";
import { env } from "@/env.mjs";

const resend = new Resend(env.RESEND_API_KEY);

export const sendEmail = async ({ subject, to, react }) => {
  let message = {
    from: "onboarding@resend.dev",
    to,
    subject,
  };

  if (isDev) {
    const html = render(react);
    return nodemailerAppTransport.sendMail({
      ...message,
      html,
    });
  }
  return resend.emails.send({
    ...message,
    react,
  });
};
