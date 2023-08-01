import { Hr, Text } from "@react-email/components";
import { emailStyles } from "../../styles";
import React from "react";

const Footer = () => {
  return (
    <>
      <Text style={emailStyles.paragraph}>— The Eventio team</Text>
      <Hr style={emailStyles.hr} />
      <Text style={footer}>Eventio, 1234 Chuckle Street, GiggleTown, LOL 98765</Text>
    </>
  );
};

export default Footer;

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "16px",
};
