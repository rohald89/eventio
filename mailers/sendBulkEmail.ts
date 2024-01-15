import { isDev } from "@/config";
import { Email } from "./types";
import { sendEmail } from "./sendEmail";
import { EMAIL_DEFAULT_FROM, resend } from "./resend";

type EmailWithText = Email & { text: string, from: string}

export const sendBulkEmail = async ({emails}: {emails: Email[]}) => {
  console.log('emails', emails  )
    if(isDev) {
      console.log('sending a bunch of emails in dev mode')
      for(const email of emails) {
        console.log('sending email', email)
        await sendEmail(email);
      }
    } else {
      const mappedEmails: EmailWithText[] = emails.map((email) => ({
        ...email,
        from: EMAIL_DEFAULT_FROM,
        text: ''
      }))

      const maxBatchSize = 100;
      if(mappedEmails.length > maxBatchSize) {
        throw new Error(`You can only send ${maxBatchSize} emails at a time using Resend`)
      }

      return resend.batch.send(mappedEmails)
    }
}