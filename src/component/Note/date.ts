import { format } from "date-fns";

export const format_yyyyMd = (value: string | number | Date) => {
  return format(new Date(value), "yyyy/M/d");
};
