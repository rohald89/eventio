import { ContextModalProps } from "@mantine/modals";
import { Button } from "@mantine/core";
import { Horizontal, Vertical } from "mantine-layout-components";
import { ReactFC } from "types";

type InnerProps = {};

export const ReportBugModalComponent: ReactFC<ContextModalProps<InnerProps>> = ({
  context,
  id,
  innerProps,
}) => {
  const {} = innerProps;

  let closeModal = () => context.closeModal(id);

  return (
    <Vertical fullW spacing={15}>
      <Vertical>Hello from ReportBugModal!</Vertical>
      <Horizontal fullW spaceBetween>
        <Button color="gray" onClick={closeModal}>
          Cancel
        </Button>
        <Button
          onClick={() => {
            console.log("Submit");
          }}
        >
          Submit
        </Button>
      </Horizontal>
    </Vertical>
  );
};
