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