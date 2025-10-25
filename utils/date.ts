export const isValidDate = (date: Date | undefined) => {
  if (!date) {
    return false;
  }
  return !Number.isNaN(date.getTime());
};

export const formatDate = (date: Date | undefined) => {
  if (!date) {
    return "";
  }
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};
