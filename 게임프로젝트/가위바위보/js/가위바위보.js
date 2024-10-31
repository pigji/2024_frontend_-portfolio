//li요소를 전역변수로 만들어서 코드 전체에서 사용할 수 있도록 함
const images = document.querySelectorAll("li");

//setInterval을 제어할 변수
let myInterval = null;

window.addEventListener("load", () => {
  //html문서 및 관련 이미지 등이 모두 준비될때 함수 init()을 호출
  init();
})

function init(){
  //가위바위보의 배경이미지가 있는 모든 li요소에서 클래스 이름이 rock인 경우에만 화면에 보이도록 설정
  //초기 설정 값 보(주먹)로 설정
  images.forEach(list => {
    console.log(list.className) //6개 요소 확인
    
    if(list.className == "rock"){
      list.style.visibility = "visible"
    }
    else{
      list.style.visibility = "hidden";
    }
  })
}

//#control에 클릭이벤트 추가
document.querySelector("#control").addEventListener("click", function(){
  //console.log(this.childNodes[0].nodeValue)
  console.log(this.firstChild.nodeValue) //시작
 
 //control이 "시작"일때 control의 글자를 "종료/결과"로 변경하고, 배경색과 글자색도 변경한 후 playGame()함수를 호출한다.
  if(this.firstChild.nodeValue == "시작"){
    this.firstChild.nodeValue = '종료/결과';  //value 변경
    this.style.backgroundColor = "#9da5cb" //배경색 변경
    this.style.color = "white"; //글자색 변경
    playGame(); //playGame함수 호출
  }
  else{ //결과보기 및 게임 종료
    this.style.backgroundColor = "#cbc39d";
    this.style.color = "black";
    this.firstChild.nodeValue = "시작";
    stopGame(); //stopGame함수 호출
  }
})

//playGame함수 생성, setInterval을 이용하여 1/4초마다 반복적으로 가위바위보 이미지 변경
function playGame(){
  myInterval = setInterval(function(){
    //Math.random*3으로 0부터 3미만의 실수를 만들고, Math.floor()로 소수점 이하의 값을 버려줌(0,1,2 출력)
    let showItem = Math.floor(Math.random() * 3);
    
    //forEach로 이미지를 순회하여 랜덤 숫자와 같은 순번의 이미지를 화면에 나타나게 하고, 그 외 이미지는 화면에 나타나지 않게 함.
    images.forEach((list, idx) => {
      if((idx%3) == showItem){
        list.style.visibility = 'visible';
      }
      else{
        list.style.visibility = 'hidden';
      }
    })
  }, 250)
}

//stopGame함수 생성, clearInterval을 이용하여 가위바위보 이미지를 반복적으로 변경하는 효과 제거
function stopGame(){
  clearInterval(myInterval);

  let homeResult, guestResult;
  //홈팀 과 상대팀의 가위바위보를 랜덤으로 선택
  //homeItem은 0~2 사이의 하나의 값이 선택되고, guestItem은 3~5 사이의 하나의 값이 선택
  let homeItem = Math.floor(Math.random() * 3);
  let guestItem = Math.floor(Math.random() * 3) + 3;

  //forEach로 모든 아이템 요소를 순환하면서 순번이 homeItem인 요소를 화면에 표시
  //클래스 이름을 homeResult변수에 담아주고, 순번이 guestItem인 요소를 화면에 표시
  //클래스 이름을 guestResult변수에 담아줌. 그 외 요소는 화면에서 가려줌
  images.forEach((list, idx) => {
    if(idx == homeItem){
      list.style.visibility = 'visible';
      homeResult = list.className;
    }
    else if(idx ==  guestItem){
      list.style.visibility = 'visible';
      guestResult = list.className;
    }
    else{
      list.style.visibility = 'hidden';
    }
  })
  //마지막으로 결과를 출력하기 위해 0.3초 뒤에 resultGame을 실행하고 인자로 homeResult와 guestResult를 전달
  setTimeout(function(){
    resultGame(homeResult, guestResult)
  }, 300)
}

//resultGame함수 생성, 매개변수로 home과 guest를 전달받음
function resultGame(home, guest){
  if(home == guest){  //무승부일 경우
    alert("무승부 입니다. -_-;")
  }
  else{
    //home이 이겼을때와 졌을때 알림창 표시
    switch(home){
      case 'rock':
        if(guest == 'paper'){
          alert("승부에서 졌습니다. (｡•́︿•̀｡)")
        }
        else{ //scissors
          alert("승부에서 이겼습니다. (≧∇≦)/")
        }
        break;
      case 'paper':
        if(guest == 'scissors'){
          alert("승부에서 졌습니다. (｡•́︿•̀｡)")
        }
        else{ //rock
          alert("승부에서 이겼습니다. (≧∇≦)/")
        }
        break;
      case 'scissors':
        if(guest == 'rock'){
          alert("승부에서 졌습니다. (｡•́︿•̀｡)")
        }
        else{ //paper
          alert("승부에서 이겼습니다. (≧∇≦)/")
        }
        break;
    }
  }
}