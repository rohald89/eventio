import { resolver } from "@blitzjs/rpc";
import db from "../../../../db";
import EmailTemplateDummy from "../../../../mailers/react-email/emails/dummy";
import { z } from "zod";
import React from "react";
import { generateUnsubscribeLink } from "@/utils/email";
import { EmailList } from "@/features/email/types";
import { chunk } from "lodash";
import { isDev } from "@/config";
import { Email } from "../../../../mailers/types";
import { sendBulkEmail } from "../../../../mailers/sendBulkEmail";

const Input = z.object({
  list: z.nativeEnum(EmailList)
});

export default resolver.pipe(
  resolver.zod(Input),
  resolver.authorize(),
  async ({list}, { session: { userId } }) => {
    const user = await db.user.findUnique({
      where: { id: userId },
    });

    if (!user) throw new Error("User not found");

    console.log('list is', list);

    const users = await db.user.findMany({
      where: {
        AND: [
          {
            ...list === EmailList.Product && { settingsEmailProduct: true },
          },
          {
            ...list === EmailList.Marketing && { settingsEmailMarketing: true },
          }, {
          id: { not: user.id }
          }
        ]
      },
    })


    const CHUNK_SIZE = isDev ? 3 : 100;
    const chunks = chunk(users, CHUNK_SIZE)

    for(const chunk of chunks) {
      // create unsubscribe link and email for each user
      const emails: Email[] = await Promise.all(
        chunk.map(async (user): Promise<Email> => {
          const unsubscribeLink = await generateUnsubscribeLink({
            userId: user.id,
            userEmail: user.email
          })
          return {
            to: user.email,
            subject: `Hey there ${user.name}`,
            react: React.createElement(EmailTemplateDummy, {
              props: {
                name: user.name,
                emailVerifyUrl: "",
                unsubscribeLink

              }
            })
          }
        }
      ))

      await sendBulkEmail({emails})
    }
  }
);
