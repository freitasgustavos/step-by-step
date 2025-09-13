/**
 * Removes all non-numeric characters from the input string.
 *
 * @param input - The string to be filtered.
 * @returns A string containing only numeric characters from the input.
 */
export function onlyNumbers(input: string): string {
  return input.replace(/\D/g, "");
}

/**
 * Formats a Brazilian document number (CPF or CNPJ).
 *
 * - If the input is a CPF (11 digits), it formats as `XXX.XXX.XXX-XX`.
 * - If the input is a CNPJ (14 digits), it formats as `XX.XXX.XXX/XXXX-XX`.
 * - If the input is undefined or empty, returns an empty string.
 * - If the input does not match CPF or CNPJ length, returns the original input.
 *
 * @param doc - The document number as a string (may contain non-digit characters).
 * @returns The formatted document string, or the original input if not CPF/CNPJ.
 */
export const formatDocument = (doc?: string) => {
  if (!doc) return "";
  const cleaned = doc.replace(/\D/g, "");

  if (cleaned.length === 11) {
    return cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  }

  if (cleaned.length === 14) {
    return cleaned.replace(
      /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
      "$1.$2.$3/$4-$5"
    );
  }

  return doc;
};

/**
 * Formats a phone number string into the pattern "(XX) XXXXX-XXXX" or "(XX) XXXX-XXXX".
 *
 * Removes all non-digit characters from the input and applies formatting.
 * If the input is undefined or empty, returns an empty string.
 *
 * @param phone - The phone number string to format.
 * @returns The formatted phone number string, or an empty string if input is invalid.
 */
export const formatPhone = (phone?: string) => {
  if (!phone) return "";
  const cleaned = phone.replace(/\D/g, "");
  return cleaned.replace(/(\d{2})(\d{4,5})(\d{4})/, "($1) $2-$3");
};

/**
 * Formats a Brazilian CEP (postal code) string by inserting a hyphen after the fifth digit.
 *
 * - Removes all non-digit characters from the input.
 * - Returns the formatted CEP in the pattern `12345-678`.
 * - If no CEP is provided, returns an empty string.
 *
 * @param cep - The CEP string to format.
 * @returns The formatted CEP string, or an empty string if input is undefined or empty.
 */
export const formatCep = (cep?: string) => {
  if (!cep) return "";
  const cleaned = cep.replace(/\D/g, "");
  return cleaned.replace(/(\d{5})(\d{3})/, "$1-$2");
};
