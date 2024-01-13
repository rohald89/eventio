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
  unsubscribeLink: "",
};

export const EmailTemplateDummy: React.FC<{
  props: {
    name?: string | null;
    emailVerifyUrl: string | null;
    unsubscribeLink: string;
  };
}> = ({ props = defaultProps }) => {
  const { name } = props;

  return (
    <Html>
      <Head />
      <Preview>Welcome at Eventio!</Preview>
      <Body style={emailStyles.main}>
        <Container style={emailStyles.container}>
          <Section style={emailStyles.box}>
            <Header />
            <Text style={emailStyles.paragraph}>This is a dummy email!</Text>
            <MainButton href={baseUrl}>This is a dummy</MainButton>
            <Footer unsubscribeLink={props.unsubscribeLink} />
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default EmailTemplateDummy;
