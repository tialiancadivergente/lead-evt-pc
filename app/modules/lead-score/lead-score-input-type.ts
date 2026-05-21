export function normalizeInputType(inputType?: string): string {
  return (inputType || "single").toLowerCase().trim();
}

export function isOpenInputType(inputType: string): boolean {
  return ["open", "text", "textarea", "short_text", "long_text"].includes(
    normalizeInputType(inputType)
  );
}

export function isMultipleInputType(inputType: string): boolean {
  return ["multiple", "multi", "checkbox", "multiple_choice"].includes(
    normalizeInputType(inputType)
  );
}

export function isNumericInputType(inputType: string): boolean {
  return ["number", "numeric", "integer", "float", "currency"].includes(
    normalizeInputType(inputType)
  );
}

export function isBooleanInputType(inputType: string): boolean {
  return ["boolean", "bool", "switch", "toggle", "yes_no"].includes(
    normalizeInputType(inputType)
  );
}
