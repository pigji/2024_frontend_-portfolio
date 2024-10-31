//calculator 엘리먼트와, 그 자식 엘리먼트의 정보(전체영역)
const calculator = document.querySelector(".calculating-machine");
const buttons = document.querySelectorAll(".btns button");  //모든 버튼 값을 가져옴
const calculatedResult = document.querySelector(".result")  //계산된 결과 값이 나옴
const operator = document.querySelector(".calculating-machine .operator") //연산자 기호(버튼)를 가져옴

let prevNum = ''; //첫번째 입력 값(이전)
let nextNum = ''; //두번째 입력 값(최근)
let operatorOn = '' //연산자

//모든 버튼 값 출력
// buttons.forEach((button) => {
//   console.log(button.textContent);  //확인
// })

//클릭한 버튼 값 출력(console창 확인)
buttons.forEach((button) => {
  button.addEventListener('click', () => {
    console.log(button.textContent) //확인
  })
})

//result영역에 클릭한 숫자 값 나타내기( AC, Enter버튼 값 제외하기 )
buttons.forEach((button) => {
  button.addEventListener('click', () => {
    calculatedResult.innerHTML = button.textContent; //확인
  })
})

//연산자 계산식 -> 연산기호 때문에 문자열로 받아오기(String)
//switch문 사용
let calculate = (n1, operator, n2) => {
  let result = 0;
  switch(operator){
    case '+':
      result = prevNum + nextNum;
      break;
    case '-':
      result = prevNum - nextNum;
      break;
    case '*':
      result = prevNum * nextNum;
      break;
    case '/':
      result = prevNum / nextNum;
      break;

    default:
      break;
  }
  return String(result);
}

//연산 계산식 출력



//AC버튼 눌렀을때 계산식 초기화

//Enter버튼 눌렀을때 연산 결과 출력

