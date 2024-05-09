export const getDisplayTime = (time: number): string => {
  const createDate = new Date(time);

  const todayDate = new Date();
  if (todayDate.toDateString() === createDate.toDateString()) {
    const timeString = createDate.toLocaleTimeString();
    return (
      timeString.slice(0, 5) +
      timeString.slice(timeString.length - 3, timeString.length)
    ); // return format: HH:MM AM/PM
  } else {
    const dateString = createDate.toDateString();
    return dateString.slice(4); // return format: MM:DD:YYYY
  }
};
