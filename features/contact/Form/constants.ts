import type { FormValues } from "./types";

export const MAX_MSG = 1000;

export function validate(values: FormValues): Partial<FormValues> {
  const errors: Partial<FormValues> = {};

  if (!values.name.trim() || values.name.trim().length < 2)
    errors.name = "Please enter your name (at least 2 characters)";

  if (!values.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
    errors.email = "Please enter a valid email address";

  if (!values.message.trim() || values.message.trim().length < 20)
    errors.message = "Message must be at least 20 characters";

  return errors;
}
