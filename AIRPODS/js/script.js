//섹션1

//스크롤을 내리면 airpods-navbar가 브라우저 상단에 고정
const navbar = document.querySelector(".airpods-navbar");
const originalY = navbar.offsetTop;//.airpods-navbar의 y축으로 top위치값을 originalY에 할당
//.apple-navbar의 높이가 44px이므로 originalY에 할당된 값은 44가 할당됩니다.

//스크롤 이벤트 리스너 추가
window.addEventListener("scroll", () => {
  if(scrollY >= originalY){//스크롤 이동값이 originalY값보다 커지면 실행
    navbar.classList.add("sticky");//navbar에 sticky클래스를 추가하여 브라우저 상단에 고정
  }else{//스크롤 이동값이 originalY값보다 작으면 실행
    navbar.classList.remove("sticky");//navbar에 sticky클래스를 제거하여 브라우저 상단에 고정되 않도록 초기화
  }
})

//ScrollTrigger 플러그인을 등록
gsap.registerPlugin(ScrollTrigger)

//섹션01과 그 내부의 텍스트요소들을 선택
const section1 = document.querySelector(".section-01");
const mainText = document.querySelector(".main-elem");
const msgText1 = document.querySelector(".msg-elem-01");
const msgText2 = document.querySelector(".msg-elem-02");
const msgText3 = document.querySelector(".msg-elem-03");
const msgText4 = document.querySelector(".msg-elem-04");

//캔버스의 크기설정
const canvas = document.querySelector("#airpods");
const ctx = canvas.getContext("2d");

canvas.width = 1158;
canvas.height = 770;

//이미지의 프레임을 저장할 배열을 생성
const images = [];
//현재 프레임을 추적하는 airpods객체를 정의
const airpods = {frame:0}
//총 프레임의 수
const frameCount = 147;

//이미지 경로를 frameCount의 갯수 만큼 받아서 images배열에 저장
const currentFrame = (index) => 
  //프레임 번호를 index로 받아서 이미지 경로를 생성하는 함수
  //index가 0일 경우 `images/airpods/0001.jpg`를 반환
  `images/airpods/${(index+1).toString().padStart(4,"0")}.jpg`;

//.padStart(4,"0") = 문자열의 특정 길이로 맞추기 위해 사용되는 메서드
//4는 최종 문자열의 길이를 의미, "0"은 추가할 문자를 의미
//예를 들어 전달 받는 문자열이 5면 문자열의 길이가 4가 되도록 0을 추가합니다.
//결과적을 "0005"라는 문자열이 됩니다

//console.log(currentFrame(100))

//총 프레임의 갯수 만큼 반복
for(let i=0; i < frameCount; i++){
  const img = new Image();//이미지를 생성
  img.src = currentFrame(i);//이미지 경로를 생성하는 함수를 호출하여 생성한 이미지 src속성값으로 할당
  images.push(img);//images배열에 생성한 이미지를 저장

  //img객체의 onload이벤트 핸들러를 정의(이미지가 로드 되었을때 호출되는 함수)
  img.onload = () => {
    //첫번째 이미지가 로드되면 render함수를 호출(render함수는 이미지를 캔버스에 그려줄 함수)
    if(i === 0) render();
  }
}
//console.log(images)

//초기 로딩 애니메이션
let tl0 = gsap.timeline();//로딩 애니메이션을 정의 하기 위해 timeline을 호출하여 타임라인 객체 생성

tl0
  .add("start0")//타임라인에 start0이라는 레이블을 추가 이후에 .to()메서드에 3번째 인자값으로 start0을 입력하면 해당 애니메이션은 start0레이블을 추가한 시점에서 동시에 실행됩니다.
  .fromTo(canvas, {opacity:0}, {duration:2, opacity:1}, "start0")//'start0'지접에서 캔버스가 2초 동안 서서히 보이게 합니다.
  .fromTo(mainText,
    {opacity:0},
    {duration:1.5, delay: 0.75, opacity:1},
    "start0"
  );

//스크롤 애니메이션
const tl1 = gsap.timeline({
  scrollTrigger: {//스크롤 이벤트에 따라 애니메이션을 제어하기 위한 설정
    trigger: section1, //스크롤 트리거될 요소 설정
    start: "top top", //애니메이션이 시작되는 시점
    end: "+=4000",//애니메이션 종료시점은 시작위치에서 4000px아래로 설정
    pin:true,//트리거 요소를 고정
    scrub:true,//스크롤 위치에 따라 애니메이션이 실시간으로 동기화 되도록 설정
    markers:true,
  }
})

tl1
  .add("start0")
  //메인텍스트 애니메이션 : 5초동안 위로 500px이동
  .to(mainText, {duration:5, y:-500}, "start0")
  //airpods 객체의 frame 속성을 0에서 138까지 8초 동안 애니메이션 합니다.
  .to(
    airpods,
    {
      duration:8,
      frame: 138,//airpods객체의 frame프로퍼티를 0부터 138까지 8초동안 증가
      snap:"frame",//애니메이션을 프레임 단위로 스냅합니다(이미지를 담는다)
      ease: "none",
      onUpdate: render,//프레임이 변경될 때 render함수를 호출
    },
    "start0"
  )
  //메시지 텍스트 애니메이션
  .add("start1")
  //msgText1요소는 3.5초 동안 투명도가 1로 증가하고 y축으로 -50px위치로 이동한 후
  .to(msgText1, {duration:3.5, opacity:1, y: -50}, "start1")
  //다시 3.5초동안 투명도가 0으로 감소하면서 현재위치(-50px)에서 y축으로 -100px로 이동
  .to(msgText1, {duration:3.5, opacity:0, y: -100})

  .add("start2")
  .to(msgText2, {duration:3.5, opacity:1, y: -50}, "start2")
  .to(msgText2, {duration:3.5, opacity:0, y: -100})
  
  .add("start3")
  .to(msgText3, {duration:3.5, opacity:1, y: -50}, "start3")
  .to(msgText3, {duration:3.5, opacity:0, y: -100})

  .add("start4")
  .to(msgText4, {duration:3.5, opacity:1, y: -50}, "start4")
  .to(msgText4, {duration:3.5, opacity:0, y: -100})

  //캔버스에 마지막 이미지 그리기(마지막 프레임까지 1초동안 애니메이션 합니다.)
  .to(airpods,{
    duration:1,
    frame: frameCount - 1,
    snap: "frame",
    ease: "none",
    onUpdate:render,
  })
  //easeIn = 천천히시작 -> 보통속도
  .to(canvas,{duration:36, scale:0.5, ease: "power1.in"}, "start0")

//이미지 렌더링
function render(){
  //먼저 캔버스의 이미지를 지우고
  ctx.clearRect(0,0, canvas.width, canvas.height);
  //현재 프레임의 이미지를 캔버스에 그립니다.
  ctx.drawImage(images[airpods.frame], 0, 0);
}

