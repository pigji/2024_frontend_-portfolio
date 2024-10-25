//fullpage플러그인 적용
let myFullpage = new fullpage("#fullpage", {
  autoScolling: true,
  scrollHorizontally: false,
  css3: false,  //crome에서 css3변환 및 고정된 요소의 문제를 해결
  menu: "#menu",  //메뉴 버튼 기능 추가
  anchors: ["intro", "about", "stacks", "works", "contact"]
})

//section요소 선택
const section = document.querySelectorAll('section');



/*--------------------------------------------------------*/
//INTRO 텍스트 제목 한글자씩 타이핑 출력
const homeText = document.querySelector('.introduction > .title > h1');
const content = '안녕하세요!\n프론트엔드\u00a0개발자\n성지혜\u00a0입니다.';
let count = 0;

function typeing(){
  homeText.innerText += content[count++];
  if(count > content.length){
    homeText.innerText = '';
    count = 0;
  }
}
setInterval(typeing, 400);