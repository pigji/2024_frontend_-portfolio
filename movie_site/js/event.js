//문서가 전부 로드 되었을때 실행
window.addEventListener("load", ()=>{
  const grid = new Isotope("section", {
    itemSelector : "article", //배치할 요소명
    columnWidth : "article",  //넓이 값을 구할 요소명
    transitionDuration : "0.5s" //화면배치 애니메이션 속도
  });

  //클릭할 모든 버튼요소를 변수에 저장
  const btns = document.querySelectorAll("main ul li");
  console.log(btns) //확인

  //btns배열의 요소를 하나씩 뽑아서 갯수만큼 반복문을 실행
  for(let el of btns){
    console.log(el) //확인

    el.addEventListener("click", (e) => {
      e.preventDefault(); //윈도우의 기본 기능인 링크기능 제거

      const sort = e.currentTarget.querySelector("a").getAttribute("href");
      console.log(sort) //확인

      //grid에 저장된 결과 값을 불러와 재정렬 기능 연결
      grid.arrange({
        //옵션값으로 sort변수 값 지정
        filter : sort
      })

      //다시 모든 버튼의 갯수만큼 반복을 돌림
      for(let el2 of btns){
        el2.classList.toggle("on", el2 === el)
      }
    })
  }
})

/*----------------------------------------------------------*/
/*이벤트 슬라이드 배너*/
//슬라이드 이미지 선택
const list = document.querySelector("#banner");
const listLi = document.querySelectorAll("#banner > li");
const show_num = 2; //보여지는 이미지 갯수
const total = listLi.length;  //슬라이드 갯수
const li_width = parseInt(getComputedStyle(listLi[0]).width); //첫번째 슬라이드 이미지의 넓이를 변수에 할당
console.log(li_width)
//보여지는 이미지의 슬라이드의 갯수만큼 슬라이드를 복제
for(let i = 0; i < show_num; i++){
  //순번이 i번째인 li요소를 복제
  const copyobj = listLi[i].cloneNode(true);
  //list의 마지막 자손으로 copyobj를 추가
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