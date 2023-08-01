import { Body, Container, Head, Html, Preview, Section, Text } from "@react-email/components";
import * as React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { emailStyles } from "../../styles";
import MainButton from "../components/MainButton";

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

const defaultProps = {
  name: "Test user",
};

export const EmailTemplateWelcome: React.FC<{
  props: {
    name?: string | null;
    emailVerifyUrl: string | null;
  };
}> = ({ props = defaultProps }) => {
  const { name } = props;
  const welcomeMessage = name ? `Hey there ${name}` : "Hello";

  return (
    <Html>
      <Head />
      <Preview>Welcome at Eventio!</Preview>
      <Body style={emailStyles.main}>
        <Container style={emailStyles.container}>
          <Section style={emailStyles.box}>
            <Header />
            <Text style={emailStyles.paragraph}>{welcomeMessage}, Thanks for signing up!</Text>
            <MainButton href={baseUrl}>Click here to verify your account</MainButton>
            <Footer />
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default EmailTemplateWelcome;
