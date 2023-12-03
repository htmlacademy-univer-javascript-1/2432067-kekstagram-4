const checkStringLength = (checkedString, maxLength) => checkedString.length <= maxLength;

checkStringLength('проверяемая строка', 18);

const isPalindrome = (checkedString) => {
  checkedString = checkedString.replaceAll(' ', '').toLowerCase();

  return checkedString === [...checkedString].reverse().join('');
};

isPalindrome('Лёша на полке клопа нашёл ');

const findNumber = (checkedString) =>{
  let result = 0;
  for (let i = 0; i < checkedString.length; i++){
    if (!Number.isNaN(parseInt(checkedString[i], 10))){
      result = result * 10 + parseInt(checkedString[i], 10);
    }
  }

  if(result !== 0){
    return result;
  }

  return NaN;
};

findNumber('1 кефир, 0.5 батона');
