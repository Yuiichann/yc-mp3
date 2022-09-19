// if releaseDate is a string, return this
// else releaseDate is a Timestap, format this to string
const convertDate = (date: string | number) => {
  if (typeof date === 'string') {
    return date;
  }

  const newDate = new Date(date * 1000);

  const dateFormat = newDate.getDate() > 9 ? newDate.getDate() : `0${newDate.getDate()}`;
  const monthFormat = newDate.getMonth() > 9 ? newDate.getMonth() : `0${newDate.getMonth()}`;

  return `${dateFormat}/${monthFormat}/${newDate.getFullYear()}`;
};

export default convertDate;
