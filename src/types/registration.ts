export interface IdentificationData {
  name: string;
  email: string;
}

export interface DocumentData {
  document: string;
}

export interface ContactData {
  phone: string;
}

export interface AddressData {
  cep: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
}

export interface Submission {
  id: string;
  status: "IN_PROGRESS" | "COMPLETED";
  current_step: number;
  form_data: Record<string, unknown>;
  started_at: string;
  last_updated_at: string;
  completed_at?: string | null;
}

export interface CepResponse {
  cep: string;
  street: string;
  neighborhood: string;
  city: string;
  state: string;
}
