import { format } from "date-fns";

function convertStringToDateAndTime(date: string, time: string) {
  if (!date || !time) {
    return;
  }
  const dateObj = new Date(`${date}:${time}`);
  return format(dateObj, "dd-mm-yyyy/hh:mm");
}

export default convertStringToDateAndTime;
