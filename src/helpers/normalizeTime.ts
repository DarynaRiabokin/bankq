export function normalizeTime() {
  return new Intl.DateTimeFormat("uk", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  }).format(new Date());
}
