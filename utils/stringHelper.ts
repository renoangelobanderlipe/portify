export const toPascalCase = (str: string): string => {
  return str
    .replace(/^tabler[-:]?/, "")
    .split(/[-_]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
};

export const maskText = (text: string) => "*".repeat(text.length);

export const formatFullName = ({
  firstName,
  lastName,
}: {
  firstName?: string | null;
  lastName?: string | null;
}): string => {
  if (!firstName && !lastName) return "";

  return [firstName, lastName].filter(Boolean).join(" ").trim();
};
