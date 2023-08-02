import { Hr, Link, Text } from "@react-email/components";
import { emailStyles } from "../../styles";
import React from "react";

const Footer = ({ unsubscribeLink }: { unsubscribeLink?: string }) => {
  return (
    <>
      <Text style={emailStyles.paragraph}>— The Eventio team</Text>
      {unsubscribeLink && (
        <>
          <Hr style={emailStyles.hr} />
          <Text style={footer}>
            <Link href={unsubscribeLink}>Unsubscribe</Link>
          </Text>
        </>
      )}
    </>
  );
};

export default Footer;

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "16px",
  textAlign: "center" as any,
};
