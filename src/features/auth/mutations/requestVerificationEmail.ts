import React from "react";
import { resolver } from "@blitzjs/rpc";
import db from "db";
import { TokenType } from "@prisma/client";
import { sendEmail } from "mailers/sendEmail";
import { URL_ORIGIN } from "@/config";
import { regenerateToken } from "@/utils/blitz";
import EmailTemplateVerifyEmail from "mailers/react-email/emails/verify-email";

export const getEmailVerifyLink = async ({ userId, userEmail }): Promise<string> => {
  const token = await regenerateToken({
    userId,
    userEmail,
    tokenType: TokenType.VERIFY_EMAIL,
  });
  const link = `${URL_ORIGIN}/auth/verify-email?token=${token}`;
  return link;
};

export const sendVerificationEmail = async ({ userId, userEmail }): Promise<void> => {
  const emailVerifyUrl = await getEmailVerifyLink({
    userId,
    userEmail,
  });
  await sendEmail({
    to: userEmail,
    subject: "Verify your email address",
    react: React.createElement(EmailTemplateVerifyEmail, {
      props: {
        emailVerifyUrl,
      },
    }),
  });
};

export default resolver.pipe(resolver.authorize(), async (_, { session: { userId } }) => {
  const user = await db.user.findFirst({
    where: { id: userId },
  });

  if (!user) throw new Error("User not found");

  await sendVerificationEmail({
    userId: user.id,
    userEmail: user.email,
  });
  return true;
});
