import { resolver } from "@blitzjs/rpc";
import db from "db";
import EmailTemplateDummy from "mailers/react-email/emails/dummy";
import { sendEmail } from "mailers/sendEmail";
import { z } from "zod";
import React from "react";
import { generateUnsubscribeLink } from "@/utils/email";

const Input = z.object({});

export default resolver.pipe(
  resolver.zod(Input),
  resolver.authorize(),
  async ({}, { session: { userId } }) => {
    const user = await db.user.findUnique({
      where: { id: userId },
    });

    if (!user) throw new Error("User not found");

    const unsubscribeLink = await generateUnsubscribeLink({
      userId: user.id,
      userEmail: user.email,
    });

    await sendEmail({
      to: user.email,
      subject: "HEY",
      react: React.createElement(EmailTemplateDummy, {
        props: {
          name: user.name,
          emailVerifyUrl: "",
          unsubscribeLink,
        },
      }),
    });
  }
);
