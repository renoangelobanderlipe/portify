export const toPascalCase = (str: string): string => {
  return str
    .replace(/^tabler[-:]?/, "")
    .split(/[-_]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
};

export const maskText = (text: string) => "*".repeat(text.length);
