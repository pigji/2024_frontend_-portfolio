//모든 span(버튼)요소를 선택
const keys = document.querySelectorAll("#calculator span");

//사칙연산을 저장한 배열(연산자를 구분하는데 사용)
const operators = ['+', '-', 'x', '÷']

//소수점이 이미 추가되었는지 추척하는 변수
let decimalAdded = false;

//keys배열에 있는 각 버튼에 대해 클릭이벤트 추가
keys.forEach(key => key.addEventListener("click", () => {
  //screen은 계산기 화면을 나타내는 영역
  const input = document.querySelector(".screen");
  //화면에 표시된 값을 inputval변수에 할당(사용자가 입력한 숫자와 연산식을 표시)
  let inputVal = input.innerHTML;

  //클릭한 버튼의 값을 변수에 할당
  let btnVal = key.innerHTML;
  //console.log(btnVal) //확인

  //계산된 결과 값을 저장할 변수(초기값 0으로 설정)
  let total = 0;

  //초기화 버튼("C")을 클릭했을 때
  if(btnVal == "C"){
    input.innerHTML = ""; //screen에 담길 글자를 지움
    decimalAdded = false; //소수점 추가 여부를 초기화
    return; //함수 종료
  }
  //결과 출력("=")을 클릭했을 때
  else if(btnVal == "="){
    let equation = inputVal;  //screen에 입력한 값을 equation변수에 할당
    //console.log(equation) //확인
    
    //screen의 마지막 글자를 lastChar에 할당
    let lastChar = equation[equation.length - 1]
    //console.log(lastChar)

    //수식에서 곱샘(x), 나눗셈(÷) 기호를 각각 "*"와 "/"로 바꿔줌
    equation = equation.replace(/×/g, "*").replace(/÷/g, "/");
    //console.log(equation) //변경 확인

    //수식의 마지막 문자가 연산자 또는 소수점이면 마지막 문자를 제거
    if(operators.indexOf(lastChar) > -1 || lastChar == "."){
      equation = equation.replace(/.$/, "");  // "."을 ""(빈문자열)로 바꿔줌
      //console.log(equation) // .(점) 제거되서 나오는것 확인
    }

    //eval = 문자열로 된 수식을 실행하여 결과를 반환
    if(equation){
      total = eval(equation)
      //console.log(total)  //계산된 결과 값 확인
      
      //결과 값을 문자열로 변환하고 indexOf로 소수점이 포함되어 있는지 확인
      if(total.toString().indexOf(".") > -1){ //소수점 포함시 실행
        total = total.toFixed(5); //소수점 5자리까지 표현
      }
      //계산된 total값을 화면에 표시
      input.innerHTML = total;
    }
    //계산이 끝났으므로 숫점 추가 여부를 초기화
    decimalAdded = false;
  }
  //소수점 버튼을 클릭했을때
  else if(btnVal == "."){
    if(!decimalAdded){  //소수점이 추가되지 않았다면
      input.innerHTML += btnVal;  //소수점을 추가하고
      decimalAdded = true;  //소수점이 중복되서 입력되지 않도록 소수점 추가 여부를 true로 변경
    }
  }
  else if(operators.indexOf(btnVal) > -1){  //사용자가 연산자 버튼을 클릭했을 경우
    //입력된 버튼의 문자(연산자)를 lastChar에 저장
    let lastChar = inputVal[inputVal.length-1];
    //입력 값이 비어있지 않고 마지막 입력 값이 연산자가 아니면 버튼 값을 screen에 추가
    if(inputVal != "" && operators.indexOf(lastChar) == -1){
      input.innerHTML += btnVal;
    }
    //입력 값이 비어있으면 -연산자(음수)만 입력할 수 있도록 처리
    else if(inputVal == "" && btnVal == "-"){
      input.innerHTML += btnVal;
    }
    //연산자를 입력했으므로 소수점 추가 여부를 초기화
    decimalAdded = false;
  }
  else{
    //버튼 값을 screen화면에 추가
    input.innerHTML += btnVal;
  }
}))