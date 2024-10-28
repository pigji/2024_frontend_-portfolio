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

/*--------------------------------------------------------*/
/*프로젝트 이미지를 변경(썸네일 변경) */
const navLi = document.querySelectorAll("#nav li a");

//모든 a요소 클릭이벤트 추가
navLi.forEach(item => item.addEventListener('click', (e) => {
  e.preventDefault(); //a태그 기본링크 제거

  //클릭한 a요소 href값을 img_url변수에 할당
  const img_url = item.getAttribute('href');
  console.log(img_url)

  //window자식 요소인 img요소 scr 속성 값으로 img_url 할당
  document.querySelector("#thumbanil img").setAttribute('src', img_url);
  for(const item of navLi){
    item.classList.remove('active');  //모든 a요소에 active 클래스 제거
  }
  item.classList.add('active'); //클릭한 a요소에 active클래스를 추가
}))