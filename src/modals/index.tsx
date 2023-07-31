import { BecomeProModalComponent } from "@/modals/components/BecomeProModal";
import { ReportBugModalComponent } from "./components/ReportBugModal";

export enum GlobalModal {
  becomePro = "becomePro",
  reportBug = "reportBug",
}

export const globalModals = {
  [GlobalModal.becomePro]: BecomeProModalComponent,
  [GlobalModal.reportBug]: ReportBugModalComponent,
};

declare module "@mantine/modals" {
  export interface MantineModalOverride {
    modals: typeof globalModals;
  }
}
