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