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
const homeText = document.querySelector('.introduction > .title > p');
const content = '안녕하세요!\n프론트엔드\u00a0개발자\u00a0성지혜\u00a0입니다.';
let count = 0;

function typeing(){
  homeText.innerText += content[count++];
  if(count > content.length){
    homeText.innerText = '';
    count = 0;
  }
}
setInterval(typeing, 300);

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
/*--------------------------------------------------------*/
/*프로젝트 슬라이드*/

//슬라이드 요소 선택
const list = document.querySelector("#banner");
const listLi = document.querySelectorAll("#banner > li");
const show_num = 1; //보여지는 슬라이드 이미지 갯수
const total = listLi.length;  // 슬라이드 개수
const li_width = parseInt(getComputedStyle(listLi[0]).width); //첫번째 슬라이드 이미지의 넓이를 변수에 할당
console.log(li_width) //넓이 확인

//보여지는 이미지의 슬라이드 갯수만큼 슬라이드 복제
for(let i = 0; i < show_num; i++){
  //순번이 i번째인 li요소를 복제
  const copyobj = listLi[i].cloneNode(true);
  //list의 마지막 자소능로 copyobj를 추가
  list.appendChild(copyobj);
}

//슬라이드 순번을 담을 변수
let num = 0;



//오른쪽버튼 이벤트 추가
document.querySelector('.next').addEventListener('click', (e) => {
  e.preventDefault(); //a태그 기본링크 제거
  //num값이 슬라이드 갯수와 같으면
  console.log(num)
  if(num === total){
    num = 0;  //num값을 0으로 초기화(처음 슬라이드)
    list.style.transition = 'none'; //애니메이션이 되지 않도록 함
    list.style.marginLeft = '0%'; //left위치를 초기화
  }
  //0.05초 뒤에 함수 실행
  setTimeout(function(){
    num++;
    list.style.transition = 'margin-left .5s';  //애니메이션 효과 적용
    list.style.marginLeft = `${-li_width * num}px`; //슬라이드 한개의 넓이*num만큼 이동
  }, 50)
})
//왼쪽 화살표 버튼 클릭시 이벤트 추가(이전버튼)
document.querySelector('.prev').addEventListener('click', (e) => {
  e.preventDefault(); //a태그 기본링크 제거
  if(num === 0){
    num = total;  //슬라이드의 마지막 순번을 할당
    list.style.transition = 'none';
    list.style.marginLeft = `${-li_width * num}px`; //슬라이드의 마지막 순번위치로 이동
  }
  setTimeout(function(){
    num--;
    list.style.transition = 'margin-left .5s';
    list.style.marginLeft = `${-li_width * num}px`
  }, 50)
})
/*--------------------------------------------------------*/
/*README 팝업창 코드 작성*/
// 팝업창 폼 선택
const readme_box = document.querySelectorAll(".readme-box");
//함수 생성
function readme(selector){
  //팝업창 display값을 black으로 변경하여 화면에 표시
  document.querySelector(selector).style.display = "block";
  //스크롤 기능 비활성화
  myFullpage.setAllowScrolling(false);
}

//pClose 함수 생성 -> 닫기버튼을 누르면 화면에서 사라짐(가려줌)
function pClose(selector){
  // console.log(e)
  // e.preventDefault();
  document.querySelector(selector).style.display = "none";
  //스크롤 기능 활성화
  myFullpage.setAllowScrolling(true);
}

// //닫히는 구현
window.addEventListener("click", (e) => {
//console.log(e.target) //클릭한 요소를 읽어올 수 있음

  readme_box.forEach(box => {
    if(e.target === box){
      box.style.display = "none"; 
      //스크롤 기능 활성화
      myFullpage.setAllowScrolling(true);
    }
  })
})
