import { Text } from "@mantine/core";
import { modals } from "@mantine/modals";

type Options = {
  text?: string;
  title?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onCancel?: () => void;
};

export const confirmDelete = (cb, options: Options) => {
  const {
    onCancel,
    text = "Are you sure you want to delete this? This action might be irreversible.",
    title = "Confirm Deletion",
    confirmLabel = "Delete",
    cancelLabel = "Cancel",
  } = options;
  return modals.openConfirmModal({
    title,
    centered: true,
    children: <Text size="sm">{text}</Text>,
    labels: { confirm: confirmLabel, cancel: cancelLabel },
    confirmProps: { color: "red" },
    onCancel,
    onConfirm: () => {
      cb();
    },
  });
};
