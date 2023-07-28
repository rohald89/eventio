import Head from "next/head";
import { ReactNode } from "react";
import { BlitzLayout } from "@blitzjs/next";

type Props = {
  title?: string;
  children?: ReactNode;
  maxWidth?: number;
};
const Layout: BlitzLayout<Props> = ({ title, maxWidth = 800, children }) => {
  return (
    <>
      <Head>
        <title>{title || "eventio"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div
        style={{
          width: "100%",
          maxWidth: maxWidth,
        }}
      >
        {children}
      </div>
    </>
  );
};

export default Layout;
