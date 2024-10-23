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

/*---------------------------------------------------------------*/
/*tap메뉴 JS코드*/
//버튼요소와 지역 리스트 선택
const tabMenus = document.querySelectorAll(".tab_menu > button");
const tabLists = document.querySelectorAll(".tab_list > div");

//모든 버튼을 순회하면서 클릭이벤트를 추가
tabMenus.forEach((tabMenu, idx) => tabMenu.addEventListener("click", () => {
  console.log("버튼클릭")
  
  //버튼의 갯수만큼 반복 실행
  for(let i = 0; i < tabMenus.length; i++){
    //모든 버튼과 리스트요소에 클래스를 제거
    tabMenus[i].classList.remove("on");
    console.log(tabMenus) //확인

    tabLists[i].classList.remove("on");
  }

  //클릭한 버튼에 on클래스 추가
  tabMenu.classList.add("on");
  //클릭한 버튼과 같은 순번의 리스트요소 on클래스 추가
  tabLists[idx].classList.add("on");
}))


/*---------------------------------------------------------------*/
//버튼요소와 지역 리스트 선택
const tabMenus2 = document.querySelectorAll(".sub_tab_menu > button");
const tabLists2 = document.querySelectorAll(".sub_tab_list > div");

//클릭이벤트를 추가
tabMenus2.forEach((tabMenu2, idx) => tabMenu2.addEventListener("click", () => {
  console.log("버튼클릭")
  
  //버튼의 갯수만큼 반복 실행
  for(let i = 0; i < tabMenus2.length; i++){
    //모든 버튼과 리스트요소에 클래스를 제거
    tabMenus2[i].classList.remove("on");
    console.log(tabLists2[i]) //확인

    tabLists2[i].classList.remove("on");
  }

  //클릭한 버튼에 on클래스 추가
  tabMenu2.classList.add("on");
  //클릭한 버튼과 같은 순번의 리스트요소 on클래스 추가
  tabLists2[idx].classList.add("on");
}))