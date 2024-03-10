import { create } from "zustand";

export type AlertType =
  | "confirm-email"
  | "delete-profile-image"
  | "confirm-email-change"
  | "change-password"
  | "delete-account";

interface AlertData {
  registeredEmail?: string;
  newEmail?: string;
  action?: () => Promise<void>;
}
type openComponent = "alert-dialog" | "alert-banner";

interface AlertStore {
  alertType: AlertType | null;
  alertData: AlertData;
  component: openComponent | "alert-dialog";
  isAlertOpen: boolean;
  onAlertOpen: (
    type: AlertType,
    data?: AlertData,
    component?: openComponent,
  ) => void;
  onAlertClose: () => void;
}

export const useAlert = create<AlertStore>((set) => ({
  alertType: null,
  component: "alert-dialog",
  alertData: {},
  isAlertOpen: false,
  onAlertOpen: (alertType, alertData = {}, component) =>
    set({ isAlertOpen: true, alertType, alertData, component }),
  onAlertClose: () => set({ alertType: null, isAlertOpen: false }),
}));
