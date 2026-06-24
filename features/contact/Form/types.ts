export interface FormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
  /** Honeypot: hidden field — bots fill it, humans don't. Never sent to real users. */
  website: string;
}

export type FormStatus = "idle" | "submitting" | "success" | "error";

export interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  placeholder?: string;
  error?: string;
  onChange: (val: string) => void;
  onBlur?: () => void;
  disabled?: boolean;
  required?: boolean;
}
