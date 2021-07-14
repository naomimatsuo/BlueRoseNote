function getNowString (now) {
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const date = now.getDate();
  const hour = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  return year + '/' + get0PaddingString(month) + '/' + get0PaddingString(date) + ' ' + get0PaddingString(hour) + ':' + get0PaddingString(minutes) + ':' + get0PaddingString(seconds);
}

function get0PaddingString (num) {
  return String(num).padStart(2, '0');
}