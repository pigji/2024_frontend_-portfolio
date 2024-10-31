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
/*README 팝업창 코드 작성*/
// 팝업창 폼 선택
const readme_box = document.querySelectorAll(".readme-box");
//함수 생성
function readme(selector){
  //팝업창 display값을 black으로 변경하여 화면에 표시
  document.querySelector(selector).style.display = "block";
  
}

//pClose 함수 생성 -> 닫기버튼을 누르면 화면에서 사라짐(가려줌)
function pClose(selector){
  // console.log(e)
  // e.preventDefault();
  document.querySelector(selector).style.display = "none";
}

// //닫히는 구현
window.addEventListener("click", (e) => {
//console.log(e.target) //클릭한 요소를 읽어올 수 있음

  readme_box.forEach(box => {
    if(e.target === box){
      box.style.display = "none"; 
    }
  })
})
