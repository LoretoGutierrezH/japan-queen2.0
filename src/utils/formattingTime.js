export const formattingTime = (order = null, time = null) => {
  let formattedTime;
  if (order !== null) {
    formattedTime = order.timestamp.toDate().toString();
  } else if (time !== null) {
    formattedTime = time.toDate().toString();
  } 

  if (formattedTime === undefined) {
    return 'no time'
  }
  const splitTime = formattedTime.split(" ");
  // console.log(splitDate[1], splitDate[2], splitDate[3], splitDate[4]);
  return `${splitTime[4]}`;
};