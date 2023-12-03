const convertToMinutes = (str) => {
  const parts = str.split(':');
  if (parts.length === 0) {
    return 0;
  }

  return parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
};

const checkTime = (begin, end, start, minutes) => {
  const beginTime = convertToMinutes(begin);
  const endTime = convertToMinutes(end);
  const startTime = convertToMinutes(start);

  return beginTime <= startTime && endTime > startTime && (endTime - startTime) >= minutes;
};

checkTime('08:00', '17:30', '14:00', 90);
checkTime('8:0', '10:0', '8:0', 120);
checkTime('08:00', '14:30', '14:00', 90);
checkTime('14:00', '17:30', '08:0', 90);
checkTime('8:00', '17:30', '08:00', 900);
