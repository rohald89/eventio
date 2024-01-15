import { isDev } from "@/config";
import { nodemailerAppTransport } from "./transports/nodemailer-app";
import { render } from "@react-email/render";
import { Email } from "./types";
import { EMAIL_DEFAULT_FROM, resend } from "./resend";

export const sendEmail = async ({ subject, to, react }: Email) => {
  let message = {
    from: EMAIL_DEFAULT_FROM,
    to,
    subject,
    text: ''
  };

  if (isDev) {
    const html = render(react);
    return nodemailerAppTransport.sendMail({
      ...message,
      html,
    });
  }4
  return resend.emails.send({
    ...message,
    react,
  });
};
