import { ButtonProps, MantineThemeOverride } from "@mantine/core";

const ButtonDefaultProps: Partial<ButtonProps> = {
  size: "md",
};

export const theme: MantineThemeOverride = {
  loader: "bars",
  cursorType: "pointer",
  primaryColor: "violet",
  components: {
    Button: {
      defaultProps: ButtonDefaultProps,
    },
  },
};
