const frame = document.querySelector("section");
const lists = frame.querySelectorAll('article');
const prev = document.querySelector('.btnPrev');
const next = document.querySelector('.btnNext');
const audio = frame.querySelectorAll("audio");

const deg = 45;//각각의 article요소가 회전할 각도
const len = lists.length-1;//순번이 0부터 시작하므로 전체 개수에서 1을 빼줌

let i = 0;
let num = 0; //좌우 버튼을 클릭할 때마다 frame요소를 회전하기 위한 카운트 값을 담을 변수
let active = 0; //활성화 패널의 순번이 저장될 변수

//모든 오디오 요소를 반복하면서 정지시키고, .pic요소의 모션을 중지해서 초기화 하는 함수
function initMusic(){
  for(let el of audio){
    el.pause();
    el.load();
    el.closest("article").querySelector(".pic").classList.remove("on");
  }
}

//prev 버튼 클릭시
prev.addEventListener("click", () => {
  //음악 초기화 함수 실행
  initMusic();
  //num값을 증가시키며 frame 45도 만큼 증가시키며 시계방향으로 회전
  num++;
  frame.style.transform = `rotate(${deg * num}deg)`;
  //현재 패널의 순번이 0이면 다시 마지막 패널의 순번으로 변경하고 그렇지 않으면 현재 패널 순번에서 1씩 감소시켜서 activation함수를 호출
  (active == 0) ? active = len : active--;
  activation(active, lists);
});

//next 버튼 클릭시
next.addEventListener("click", () => {
  //음악 초기화 함수 실행
  initMusic();
  //num값을 감소시키며 frame 45도만큼 감소시키며 반시계방향으로 회전
  num--;
  frame.style.transform = `rotate(${deg * num}deg)`;
  //현재 패널의 순번이 마지막 이면 다시 처음 패널의 순번으로 변경하고 그렇지 않으면 현재 패널 순번에서 1씩 증가시켜서 activation함수를 호출
  (active == len) ? active = 0 : active++;
  activation(active, lists);
})



function activation(index, lists){//첫번째 매개변수는 순번, 두번째는 패널의 그룹을 전달
  for(let el of lists){
    el.classList.remove("on");//모든 패널에 on클래스를 제거
  }
  lists[index].classList.add("on");//1번째 매개변수로 받은 순번의 패널만 on클래스를 추가
}

//article의 갯수만큼 반복
for(let el of lists){
  const pic = el.querySelector(".pic");
  //article을 순회하면서 rotate값으로 deg*i값을 적용하고 위로 100vh만큼 이동시킴
  el.style.transform = `rotate(${deg*i}deg) translateY(-100vh)`;
  //배경이미지 추가
  pic.style.backgroundImage = `url(img/member${i+1}.jpg)`;
  i++;

  //각 aritlce요소 안쪽의 재생, 정지, 처음부터 재생 버튼을 변수에 저장
  const play = el.querySelector(".play")
  const pause = el.querySelector(".pause")
  const load = el.querySelector(".load")

  //play버튼 클릭 시
  play.addEventListener("click", e => {
    let isActive = e.currentTarget.closest("article").classList.contains("on")

    if(isActive){//article에 on클래스가 있는경우에만 코드가 실행됨

      //play버튼부터 .pic요소까지 탐색한 뒤 클래스 on을 추가하여 활성화
      //selector.closest("element") = 선택요소의 상위 부모요소들을 순회하여 인자와 일치하는 조상(부모)요소를 찾아줌
      e.currentTarget.closest('article').querySelector('.pic').classList.add("on");
      //audio요소를 재생
      e.currentTarget.closest("article").querySelector("audio").play();
    }
  })

  //pause버튼 클릭 시
  pause.addEventListener("click", e => {  
    let isActive = e.currentTarget.closest("article").classList.contains("on")

    if(isActive){//article에 on클래스가 있는경우에만 코드가 실행됨
      e.currentTarget.closest('article').querySelector('.pic').classList.remove("on");
      //audio요소를 선택하고 음악 정지
      e.currentTarget.closest("article").querySelector("audio").pause();
    }
  })
  //load버튼 클릭 시
  load.addEventListener("click", e => {  
    let isActive = e.currentTarget.closest("article").classList.contains("on")

    if(isActive){//article에 on클래스가 있는경우에만 코드가 실행됨
      e.currentTarget.closest('article').querySelector('.pic').classList.add("on");
      //음악을 다시 로드하고 재생
      e.currentTarget.closest("article").querySelector("audio").load();
      e.currentTarget.closest("article").querySelector("audio").play();
    }
  })

}

