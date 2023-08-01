import { Body, Container, Head, Html, Preview, Section, Text } from "@react-email/components";
import * as React from "react";
import Header from "../components/Header";
import MainButton from "../components/MainButton";
import Footer from "../components/Footer";
import { emailStyles } from "../../styles";

const defaultProps = {
  emailVerifyUrl: "Test user",
};

export const EmailTemplateVerifyEmail: React.FC<{
  props: {
    emailVerifyUrl: string;
  };
}> = ({ props = defaultProps }) => {
  const { emailVerifyUrl } = props;
  return (
    <Html>
      <Head />
      <Preview>Please verify your email for Eventio!</Preview>
      <Body style={emailStyles.main}>
        <Container style={emailStyles.container}>
          <Section style={emailStyles.box}>
            <Header />
            <Text style={emailStyles.paragraph}>
              Hello, you are receiving this email because you have created an account on Eventio.
              Please click the button below to verify your email address.
            </Text>

            <MainButton href={emailVerifyUrl}>Click here to verify your account</MainButton>
            <Footer />
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default EmailTemplateVerifyEmail;
