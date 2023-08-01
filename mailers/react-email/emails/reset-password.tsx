import { Body, Container, Head, Html, Preview, Section, Text } from "@react-email/components";
import * as React from "react";
import MainButton from "../components/MainButton";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { emailStyles } from "../../styles";

const defaultProps = {
  resetPasswordUrl: "http://localhost:3000",
};

export const EmailTemplateResetPassword: React.FC<{
  props: {
    resetPasswordUrl: string;
  };
}> = ({ props = defaultProps }) => {
  const { resetPasswordUrl } = props;
  return (
    <Html>
      <Head />
      <Preview>Reset your Eventio password!</Preview>
      <Body style={emailStyles.main}>
        <Container style={emailStyles.container}>
          <Section style={emailStyles.box}>
            <Header />
            <Text style={emailStyles.paragraph}>
              You recently requested to reset your password for your Eventio account. Click the
              button below to reset it. If you did not request a password reset, please ignore this
              email or reply to let us know.
            </Text>

            <MainButton href={resetPasswordUrl}>Click here to reset your password</MainButton>
            <Footer />
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default EmailTemplateResetPassword;
