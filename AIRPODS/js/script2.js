//섹션2

const section2 = document.querySelector(".section-02");
const msgText = section2.querySelector(".msg-elem");

const canvas2 = document.querySelector("#head-bob-turn");
const ctx2 = canvas2.getContext("2d");

//캔버스크기
canvas2.width = 1458;
canvas2.height = 820;

//이미지의 프레임을 저장할 배열
const images2 = [];
//현재 프레임을 추적하는 객체
const headturn = {frame:0};
//총프레임수
const frameCount2 = 131;

//이미지 경로를 frameCount2의 갯수 만큼 받아서 images배열에 저장
const currentFrame2 = (index) => 
  //프레임 번호를 index로 받아서 이미지 경로를 생성하는 함수
  //index가 0일 경우 `images/head-bob-turn/0001.jpg`를 반환
  `images/head-bob-turn/${(index+1).toString().padStart(4,"0")}.jpg`;

//총 프레임의 갯수 만큼 반복
for(let i=0; i < frameCount2; i++){
  const img = new Image();//이미지를 생성
  img.src = currentFrame2(i);//이미지 경로를 생성하는 함수를 호출하여 생성한 이미지 src속성값으로 할당
  images2.push(img);//images배열에 생성한 이미지를 저장

  //img객체의 onload이벤트 핸들러를 정의(이미지가 로드 되었을때 호출되는 함수)
  img.onload = () => {
    //첫번째 이미지가 로드되면 render함수를 호출(render함수는 이미지를 캔버스에 그려줄 함수)
    if(i === 0) render2();
  }
}

//로딩 애니메이션을 정의하기 위해 gsap.timeline()을 호출하여 타임라인 객체를 생성
let tl2 = gsap.timeline({
  scrollTrigger: {
    trigger: section2,
    start: "top top",
    end: "+=4000",
    scrub: true,
    pin: true,
  }
});

tl2
  .add("start0")
  .to(msgText, {delay: 11, duration:3.5, opacity:1, y: -50}, "start0")
  .to(msgText, {duration:3.5, opacity:0, y: -100})
  //headturn 객체의 frame속성을 0에서 마지막 프레임까지 19초동안 애니메이션 합니다.
  .to(
    headturn,
    {
      duration:19,
      frame: frameCount2 - 1,
      snap:"frame",
      ease:"none",
      onUpdate: render2
    },
    "start0"
  )

//render2함수는 캔버스를 지우고 현재 프레임의 이미지를 캔버스에 그립니다.
function render2(){
  ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
  ctx2.drawImage(images2[headturn.frame], 0, 0);
}