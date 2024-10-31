const calculator = document.querySelector('.calculator'); // calculator 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있습니다.
const buttons = calculator.querySelector('.calculator__buttons'); // calculator__keys 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있습니다.
const operator = document.querySelector('.calculator__operator'); // calculator__operator 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있습니다.
const calculatedResult = document.querySelector('.calculator__result'); // calculator__result 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있습니다.
const firstOperend = document.querySelector('.calculator__operend--left'); // calculator__operend--left 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있습니다.
const secondOperend = document.querySelector('.calculator__operend--right'); // calculator__operend--right 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있습니다.

let count = 1;

function calculate(n1, operator, n2) {
  let result = 0;
  // TODO : n1과 n2를 operator에 따라 계산하는 함수를 만드세요.
  // ex) 입력값이 n1 : '1', operator : '+', n2 : '2' 인 경우, 3이 리턴됩니다.
  n1 = parseFloat(n1);
  n2 = parseFloat(n2);
  if (operator === '+'){
    result = n1 + n2;
  } else if (operator === '-'){
    result = n1 - n2;
  } else if (operator === '*'){
    result = n1 * n2;
  } else if (operator === '/'){
    result = n1 / n2;
  }
  return String(result);
}
 
buttons.addEventListener('click', function (event) {
  const target = event.target;
  const action = target.classList[0];
  const buttonContent = target.textContent;
  if (target.matches('button')) {
    if (action === 'number') {
      if (count !== 2){
        firstOperend.textContent = buttonContent;
      } else{
        secondOperend.textContent = buttonContent;
      }
    }
    if (action === 'operator') {
      operator.textContent = buttonContent;
    }
    if (action === 'clear') {
      firstOperend.textContent = '0';
      secondOperend.textContent = '0';
      operator.textContent = '+';
      calculatedResult.textContent = '0';
  
    }
    if (action === 'calculate') {
      calculatedResult.textContent = calculate(firstOperend.textContent, operator.textContent, secondOperend.textContent);
    }
  }
});

//! intermediate, advanced test
const display = document.querySelector('.calculator__display--intermediate'); // calculator__display 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있습니다.
let firstNum = '0';
let secondNum = '';
let intermediateOperator = '';
let previousKey, previousNum;
let isFirst = true;
let isSecond = true;
let enterCount = 1;
let operatorCount = 1;
let alreadyOperator = false;
let alreadyDecimal = false;

buttons.addEventListener('mousedown', function(event){
  const target = event.target; 
  target.classList.add('isPressed');
})

buttons.addEventListener('mouseup', function(event){
  const target = event.target; 
  target.classList.remove('isPressed');
})

buttons.addEventListener('click', function (event) {
  const target = event.target; 
  const action = target.classList[0];
  const buttonContent = target.textContent;

  if (target.matches('button')) {
    if (action === 'number') {
      alreadyOperator = false;

      if(count===1){
        console.log(count)
        if(isFirst && display.textContent==='0'){
          display.textContent = buttonContent;
          isFirst = false;
        } 
        else{
          display.textContent += buttonContent;
        }
        firstNum = display.textContent;
      } 
      else {
        console.log(count);
          if(isSecond){
            if(secondNum === ''){
              display.textContent = buttonContent;
            }
            if(secondNum==='0.'){
              display.textContent = secondNum + buttonContent;
            }
            isSecond= false;
          } 
          else{
            if(secondNum === '' || alreadyOperator===true){
              display.textContent = buttonContent;
            }
            else{
              display.textContent += buttonContent;
            }
          }
          secondNum = display.textContent;
      }
    }
    if (action === 'operator') {
        intermediateOperator = buttonContent;
        count++;
        alreadyDecimal = false;  

        if(operatorCount === 1){
          previousNum = firstNum;
          previousKey = intermediateOperator;
          operatorCount++;
          alreadyOperator = true;
        }
        else{
          if(!alreadyOperator){
            console.log(previousNum, previousKey, secondNum);
            previousNum = calculate(previousNum, previousKey, secondNum);
            display.textContent = previousNum;
            previousKey = intermediateOperator;
            previousNum = display.textContent;
            secondNum = '';
            console.log(previousNum, previousKey, secondNum);
            alreadyOperator = true;
          }
        }
    }

    if (action === 'decimal') {
      if(alreadyDecimal === true){
        display.textContent = display.textContent;
      }
      else{
        if(display.textContent === '0'){
          display.textContent = '0.';
        }
        else if(count===2 && secondNum === ''){
          secondNum = '0.'
          display.textContent = secondNum;
        }
        else {
          display.textContent += buttonContent;
        }
        alreadyDecimal = true;
      } 
    }

    if (action === 'clear') {
      display.textContent = 0;
      isFirst = true;
      isSecond = true;
      enterCount = 1;
      operatorCount = 1;
      intermediateOperator = '';
      previousNum = '';
      firstNum = 0;
      secondNum = '';
      count = 1;
      alreadyDecimal = false;
    }

    if (action === 'calculate') {
      console.log(previousNum, intermediateOperator, secondNum);
      alreadyOperator = true;
      operatorCount = 1;
      
      if(intermediateOperator === ''){
        if(firstNum === '0'){
          display.textContent = display.textContent;
        }
        else{
          display.textContent = firstNum;
        }
      } 
      else{
        if(secondNum === ''){
          secondNum = previousNum;
          if(enterCount === 1){
            previousNum = calculate(previousNum, intermediateOperator, previousNum);
            display.textContent = previousNum;
            previousKey = intermediateOperator;
            previousNum = display.textContent;
            secondNum = '';
            enterCount++;
          } else{
            previousNum = calculate(previousNum, previousKey,secondNum);
            display.textContent = previousNum;
          }
        }
        else{
          if(enterCount === 1){
            previousNum = calculate(previousNum, intermediateOperator, secondNum);
            previousKey = intermediateOperator;
            display.textContent = previousNum;
            enterCount++;
          } else{
            previousNum = calculate(previousNum, previousKey, secondNum);
            display.textContent = previousNum;
          }
        } 
      }
    }
  }
});

// keyboard input
document.addEventListener('keydown', function (event) {
  const keyboardContent = event.key;
  const numList = ['0','1','2','3','4','5','6','7','8','9'];

  if (keyboardContent in numList) {
      alreadyOperator = false;
      console.log('num',keyboardContent);

      if(count===1){
        console.log(count)
        if(isFirst && display.textContent==='0'){
          display.textContent = keyboardContent;
          isFirst = false;
        } 
        else{
          display.textContent += keyboardContent;
        }
        firstNum = display.textContent;
      } 
      else {
        console.log(count);
          if(isSecond){
            if(secondNum === ''){
              display.textContent = keyboardContent;
            }
            if(secondNum==='0.'){
              display.textContent = secondNum + keyboardContent;
            }
            isSecond= false;
          } 
          else{
            if(secondNum === '' || alreadyOperator===true){
              display.textContent = keyboardContent;
            }
            else{
              display.textContent += keyboardContent;
            }
          }
          secondNum = display.textContent;
      }
    }

    if (keyboardContent === '+' || keyboardContent === '-' ||keyboardContent === '*' ||keyboardContent === '/') {
        console.log('operator', keyboardContent);
        intermediateOperator = keyboardContent;
        count++;
        alreadyDecimal = false;  

        if(operatorCount === 1){
          previousNum = firstNum;
          previousKey = intermediateOperator;
          operatorCount++;
          alreadyOperator = true;
        }
        else{
          if(!alreadyOperator){
            console.log(previousNum, previousKey, secondNum);
            previousNum = calculate(previousNum, previousKey, secondNum);
            display.textContent = previousNum;
            previousKey = intermediateOperator;
            previousNum = display.textContent;
            secondNum = '';
            console.log(previousNum, previousKey, secondNum);
            alreadyOperator = true;
          }
        }
    }

    if (keyboardContent === '.') {
      if(alreadyDecimal === true){
        display.textContent = display.textContent;
      }
      else{
        if(display.textContent === '0'){
          display.textContent = '0.';
        }
        else if(count===2 && secondNum === ''){
          secondNum = '0.'
          display.textContent = secondNum;
        }
        else {
          display.textContent += keyboardContent;
        }
        alreadyDecimal = true;
      } 
    }

    if (keyboardContent === 'Escape') {
      display.textContent = 0;
      isFirst = true;
      isSecond = true;
      enterCount = 1;
      operatorCount = 1;
      intermediateOperator = '';
      previousNum = '';
      firstNum = 0;
      secondNum = '';
      count = 1;
      alreadyDecimal = false;
    }

    if (keyboardContent === 'Enter') {
      console.log(previousNum, intermediateOperator, secondNum);
      alreadyOperator = true;
      operatorCount = 1;
      
      if(intermediateOperator === ''){
        if(firstNum === '0'){
          display.textContent = display.textContent;
        }
        else{
          display.textContent = firstNum;
        }
      } 
      else{
        if(secondNum === ''){
          secondNum = previousNum;
          if(enterCount === 1){
            previousNum = calculate(previousNum, intermediateOperator, previousNum);
            display.textContent = previousNum;
            previousKey = intermediateOperator;
            previousNum = display.textContent;
            secondNum = '';
            enterCount++;
          } else{
            previousNum = calculate(previousNum, previousKey,secondNum);
            display.textContent = previousNum;
          }
        }
        else{
          if(enterCount === 1){
            previousNum = calculate(previousNum, intermediateOperator, secondNum);
            previousKey = intermediateOperator;
            display.textContent = previousNum;
            enterCount++;
          } else{
            previousNum = calculate(previousNum, previousKey, secondNum);
            display.textContent = previousNum;
          }
        } 
      }
    }
  }
);


Resources