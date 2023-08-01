import { Button } from "@react-email/components";
import React from "react";

const MainButton = (props) => {
  return <Button pX={10} pY={10} style={button} {...props} />;
};

export default MainButton;

const button = {
  backgroundColor: "#656ee8",
  borderRadius: "5px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "100%",
};
