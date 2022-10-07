// if releaseDate is a string, return this
// else releaseDate is a Timestap, format this to string
const convertDate = (date: string | number) => {
  if (typeof date === 'string') {
    return date;
  }

  if (typeof date === 'string' && date === '0') {
    return '';
  }

  if (typeof date === 'number' && date === 0) {
    return '';
  }

  const newDate = new Date(date * 1000);

  const dateFormat = newDate.getDate() > 9 ? newDate.getDate() : `0${newDate.getDate()}`;
  const monthFormat =
    newDate.getMonth() > 8 ? newDate.getMonth() + 1 : `0${newDate.getMonth() + 1}`;


  return `${dateFormat}/${monthFormat}/${newDate.getFullYear()}`;
};

export default convertDate;
