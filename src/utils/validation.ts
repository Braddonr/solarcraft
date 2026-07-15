// Validation patterns for Solarcraft forms (Kenya context)

export function validateEmail(email: string): string | null {
  if (!email.trim()) return "Email is required";
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!re.test(email)) return "Please enter a valid email address";
  return null;
}

export function validatePhone(phone: string, required = false): string | null {
  if (!phone.trim()) {
    return required ? "Phone number is required" : null;
  }
  const digits = phone.replace(/[\s\-()]/g, "");
  // Kenya: 07XXXXXXXX, 01XXXXXXXX, +2547XXXXXXXX, +2541XXXXXXXX
  const kenyaRe = /^(\+?254|0)[17]\d{8}$/;
  if (!kenyaRe.test(digits)) return "Enter a valid Kenyan phone number";
  return null;
}

export function validateName(name: string): string | null {
  if (!name.trim()) return "Name is required";
  if (name.trim().length < 2) return "Name must be at least 2 characters";
  if (/\d/.test(name)) return "Name should not contain numbers";
  return null;
}

export function validateCheckout(fields: { name: string; email: string; phone: string }): Record<string, string> {
  const errors: Record<string, string> = {};
  const n = validateName(fields.name); if (n) errors.name = n;
  const e = validateEmail(fields.email); if (e) errors.email = e;
  const p = validatePhone(fields.phone, true); if (p) errors.phone = p;
  return errors;
}

export function validateQuote(fields: { name: string; email: string; phone: string }): Record<string, string> {
  const errors: Record<string, string> = {};
  const n = validateName(fields.name); if (n) errors.name = n;
  const e = validateEmail(fields.email); if (e) errors.email = e;
  const p = validatePhone(fields.phone, false); if (p) errors.phone = p;
  return errors;
}
