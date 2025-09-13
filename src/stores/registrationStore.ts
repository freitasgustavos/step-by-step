import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import type {
  IdentificationData,
  DocumentData,
  ContactData,
  AddressData,
} from "@/types/registration";

interface RegistrationState {
  submissionId: string | null;
  identification?: IdentificationData;
  document?: DocumentData;
  contact?: ContactData;
  address?: AddressData;
}

interface RegistrationActions {
  setSubmissionId: (id: string) => void;
  setIdentificationData: (data: IdentificationData) => void;
  setDocumentData: (data: DocumentData) => void;
  setContactData: (data: ContactData) => void;
  setAddressData: (data: AddressData) => void;
  reset: () => void;
}

export const useRegistrationStore = create<
  RegistrationState & RegistrationActions
>()(
  persist(
    (set) => ({
      submissionId: null,
      identification: undefined,
      document: undefined,
      contact: undefined,
      address: undefined,

      setSubmissionId: (id) => set(() => ({ submissionId: id })),
      setIdentificationData: (data) => set(() => ({ identification: data })),
      setDocumentData: (data) => set(() => ({ document: data })),
      setContactData: (data) => set(() => ({ contact: data })),
      setAddressData: (data) => set(() => ({ address: data })),

      reset: () =>
        set(() => ({
          submissionId: null,
          identification: undefined,
          document: undefined,
          contact: undefined,
          address: undefined,
        })),
    }),
    {
      name: "registration",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
