import { ContextModalProps } from "@mantine/modals";
import { Button, Modal } from "@mantine/core";
import { Horizontal, Vertical } from "mantine-layout-components";
import { ReactFC } from "types";
import { useBoolean } from "react-hanger";

type InnerProps = {
  price: number;
};

export const BecomeProModalComponent: ReactFC<ContextModalProps<InnerProps>> = ({
  context,
  id,
  innerProps,
}) => {
  const { price } = innerProps;

  let closeModal = () => context.closeModal(id);

  const tellMeMoreOpened = useBoolean(false);

  return (
    <Vertical fullW spacing={15}>
      <Vertical>You can purchase pro for ${price}</Vertical>
      <Button onClick={tellMeMoreOpened.setTrue}>Tell me more</Button>

      <Modal
        zIndex={400}
        overlayProps={{ blur: 2 }}
        title="More Info"
        opened={tellMeMoreOpened.value}
        onClose={tellMeMoreOpened.setFalse}
      >
        More info about the pro plan
      </Modal>

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
