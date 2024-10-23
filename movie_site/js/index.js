//현재 표시되는 슬라이드
let slideIndex = 1;

//처음 페이지가 로드될때 showSlides함수를 호출하여 첫번째 슬라이드를 표시
showSlides(slideIndex);

//dot버튼에 이벤트 리스너 추가
const dots = document.querySelectorAll(".dot");
console.log(dots) //현재 선택된 dot버튼 요소 확인

dots.forEach((dot, idx) => dot.addEventListener("click", () => {
  //클릭한 dot버튼의 index값에서 1을 더한 값을 slideIndex에 할당한 후 showSlides의 인자로 전달
  showSlides(slideIndex = idx + 1)
}))


//dot버튼과 화살표 버튼을 눌렀을때 실행될 함수
function showSlides(n){
  //슬라이드 이미지 아이템
  const slides = document.querySelectorAll('.bImg-box');
  //dot버튼 선택
  const dots = document.querySelectorAll(".dot");

  //n값이 1보다 작으면 slideIndex값을 슬라이드의 마지막 순번 값으로 할당
  if(n < 1) slideIndex = slides.length;
  //n값이 슬라이드의 갯수보다 커지면 slideIndex값을 초기 값(1)으로 변경
  if(n > slides.length) slideIndex = 1

  //모든 슬라이드를 제거
  slides.forEach(slide => {
    slide.style.display = "none";
  });
  //모든 dot버튼 비활성화
  dots.forEach(dot => {
    dot.classList.remove("active");
  })
  //slideIndex -1번째의 슬라이드를 화면에 표시하고 같은 순번의 dot버튼을 활성화
  slides[slideIndex - 1].style.display = "flex";
  dots[slideIndex - 1].classList.add("active");
}