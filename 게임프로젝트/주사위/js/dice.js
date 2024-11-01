document.querySelector("#control").addEventListener('click', function(){
  console.log(this.firstChild.nodeValue, this.textContent)

  if(this.firstChild.nodeValue == '시작'){  //게임 시작
    this.firstChild.nodeValue = '종료/결과';
    this.style.backgroundColor = "#9da5cb";
    this.style.color = "white";
    playGame();
  }
  else{ //결과보기 및 게임 종료
    this.style.backgroundColor = "#cbc39d";
    this.firstChild.nodeValue = '시작';
    this.style.color = "black";
    stopGame();
  }
})

const home = document.querySelector("#home").src = 'images/dice.gif';
const guest = document.querySelector("#guest").src = 'images/dice.gif';


//게임 시작 함수
function playGame(){
  home.src = 'images/dice.gif';
  guest.src = 'images/dice.gif';
}

//게임 종료 함수
function stopGame(){
  let homeItem = Math.floor(Math.random() * 6) + 1;
  let guestItem = Math.floor(Math.random() * 6) + 1;
  console.log(homeItem, guestItem)  //종료 결과 각 주사위 숫자를 출력

  //각 이미지요소의 src 속성 값에 생성한 랜덤숫자를 적용하여 설정
  home.src = `images/dice-${homeItem}.png`;
  guest.src = `images/dice-${guestItem}.png`;

  //0.5초 뒤에 경과를 경고창으로 띄움
  setTimeout(function(){
    if(homeItem > guestItem){
      alert("이겼다. (≧∇≦)/")
    }
    else if(homeItem < guestItem){
      alert("졌다. (｡•́︿•̀｡)")
    }
    else{
      alert("무승부. -_-;")
    }
  }, 500)
}