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