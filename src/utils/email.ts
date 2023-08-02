import { TokenType } from "@prisma/client";
import { regenerateToken } from "./blitz";
import { URL_ORIGIN } from "@/config";

export const generateUnsubscribeLink = async ({ userId, userEmail }) => {
  const token = await regenerateToken({
    tokenType: TokenType.UNSUBSCRIBE_EMAIL,
    userId: userId,
    userEmail: userEmail,
    expiryHours: 72,
    deleteExisting: false,
  });

  const unsubscribeLink = `${URL_ORIGIN}/unsubscribe?token=${token}`;

  return unsubscribeLink;
};
