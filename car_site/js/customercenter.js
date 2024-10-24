const acc = document.getElementsByClassName("accordion");
    //console.log(acc)

    //모든 버튼요소에 클릭이벤트를 추가
    for(let ac of acc){
      ac.addEventListener("click", function(){
        ac.classList.toggle("active");  //클릭한 버튼에 active클래스를 추가 또는 제거

        const panel = ac.nextElementSibling;  //클릭한 버튼의 다음 형제요소인 panel을 선택
        
        if(panel.style.maxHeight){  //패널의 maxHeight값이 0이 아니면 실행
          panel.style.maxHeight = null; //maxHeight값을 null로 설정하여 패널을 접어줍니다.
        }
        else{ //display가 none이면
          console.log(panel.scrollHeight)
          /* Element.serollHeight는 읽기전용 속성으로
          요소 콘텐츠의 총 높이를 나타내며, 바깥으로 넘쳐서 보이지 않는 콘텐츠도 포함됩니다. */
          
          //패널의 scrollHeight값을 패널의 maxHeight값으로 적용하여 패널을 펄쳐줍니다.
          panel.style.maxHeight = panel.scrollHeight + "px";
        }
      })
    }