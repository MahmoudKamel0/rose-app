import { format } from "date-fns";

export function formatOrderDate(isoDate: string): string {
  const date = new Date(isoDate);
  return `${format(date, "dd MMMM, yyyy 'at' hh:mmaaa")}`;
}
