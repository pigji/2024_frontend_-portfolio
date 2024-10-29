//로딩에서 화면으로 이동하는 구현
const loadingAreaGrey = document.querySelector('#loading');
const loadingAreaGreen = document.querySelector('#loading-screen');
const loadingText = document.querySelector('#loading p')

//문서가 전부 load되면 구문 실행
addEventListener('load', () => {
  //로딩중(회색 스크린) : 서서히 사라지게 구현
  loadingAreaGrey.animate(
    {
      //동작
      opacity: [1, 0],
      visibility: 'hidden'
    },
    {
      //옵션
      duration: 2000,
      delay: 1200,  //1.2초 뒤에 서서히 사라짐
      easing: 'ease',
      fill: 'forwards'  //마지막 프레임 유지
    }
  );

  //로딩 중(연녹색 스크린) : 아래에서 위로 이동하면서 사라짐
  loadingAreaGreen.animate(
    {
      //동작
      translate: ['0 100vh', '0 0', '0 -100vh']
    },
    {
      //옵션
      duration: 2000,
      delay: 800,
      easing: 'ease',
      fill: 'forwards'
    }
  );

  //로딩 중 텍스트(offset으로 타이밍 조정)
  //duration이 80%가 될때까지 opacity가 1이고, 80%~100%까지 opacity가 0으로 변경
  loadingAreaGreen.animate(
    [
      {
        opacity: 1,
        offset: .8  //80%를 의미
      },
      {
        opacity: 0,
        offset: 1 //100%를 의미
      }
    ],
    {
      //옵션
      duration: 1200,
      easing: 'ease',
      fill: 'forwards'
    }
  )
})
/*-----------------------------------------------------*/
//썸네일 이미지에 커서를 올리면 큰 이미지가 나타나는 애니메이션 구현
//이미지 갤러리
const mainImage = document.querySelector('.gallery-image img');
const thumbImages = document.querySelectorAll('.gallery-thumbnails img');

//썸네일 이미지에 마우스 hoaver이벤트 리스너 추가
thumbImages.forEach(thumbImage => thumbImage.addEventListener('mouseover', (e) => {
  //메인이미지에 src속성을 이벤트가 발생된 요소의 scr속성 값으로 적용
  mainImage.src = e.target.src;
  //메인 이미지의 opacity를 0에서 1로 0.5초동안 변경
  mainImage.animate({opacity: [0, 1]}, 500);
}));
/*-----------------------------------------------------*/
//슬라이드 메뉴
const menuOpen = document.querySelector('#menu-open');
const menuClose = document.querySelector('#menu-close');
const menuPanel = document.querySelector('#menu-panel');
const menuItems = document.querySelectorAll('#menu-panel li');

//애니메이션 옵션 설정
const menuOptions = {
  duration: 1400,
  easing: 'ease',
  fill: 'forwards'
}

//메뉴 열기
menuOpen.addEventListener('click', () => {
  //화면 오른쪽 바깥에서 안쪽으로 메뉴패널 이동
  menuPanel.animate({translate: ['100vw', 0]}, menuOptions)

  //링크를 하나씩 순서대로 표시
  menuItems.forEach((menuItem, idx) => menuItem.animate(
    {
      opacity: [0, 1],
      translate: ['2rem', 0]
    },
    {
      duration: 2400,
      delay: 300 * idx, //인덱스를 가져와서 순서대로 딜레이를 따로 설정
      easing: 'ease',
      fill: 'forwards'
    }
  ))
})

//메뉴 닫기
menuClose.addEventListener('click', () => {
  //메뉴 패널을 오른쪽 밖으로 이동
  menuPanel.animate({translate: [0, '100vw']}, menuOptions);
  //메뉴 리스트에 한번에 동시에 서서리 사라지게 함
  menuItems.forEach(menuItems => menuItems.animate({opacity: [1, 0]}, menuOptions));
})
/*-----------------------------------------------------*/
//모달창
const open = document.querySelector("#open");
const close = document.querySelector("#close");
const modal = document.querySelector("#modal");

const showKeyframes = {
  opacity:[0, 1],
  visibility: 'visible'
}

const hideKeyframes = {
  opacity:[1, 0],
  visibility: 'hidden'
}

const options = {
  duration: 300,
  easing: 'ease',
  fill:'forwards'
}

//모달창 열기
open.addEventListener('click', () => {
  modal.animate(showKeyframes, options)
})

//모달창 닫기
close.addEventListener('click',() => {
  modal.animate(hideKeyframes, options);
})

//#modal을 클릭하면 모달창 닫기
modal.addEventListener('click',(e) => {
  console.log(e.target)
  //클릭한 요소가 modal이면 close버튼의 click이벤트를 발생시켜서 모달창을 닫아 줍니다
  if(e.target == modal) close.click();
})
/*-----------------------------------------------------*/
//스크롤로 요소 표시
//관찰 대상이 범위안에 들어오면 실행하는 동작
//entries = 관찰대상 요소
//obs = 콜백을 호출한 IntersectionObserver

//스크롤로 요소 표시
//관찰 대상이 범위 안에 들어오면 실행하는 동작
//entries = 관찰 대상 요소
//obs = 콜백을 호출한 IntersectionObserver

const animateFade = (entries, obs) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){ //요소가 보이는 영역에 들어오면 .isIntersecting = true
      entry.target.animate(
        //동작
        {
          opacity:[0,1],
          filter:['blur(.4rem)','blur(0)'],
          translate: ['0 4rem', 0]
        },
        //옵션
        {
          duration: 2000,
          easing: 'ease',
          fill: 'forwards'
        }
      );
      //부드럽게 한번 표시되었다면 관찰 중지
      obs.unobserve(entry.target)
    }
  })
}

//관찰 설정
const fadeObserver = new IntersectionObserver(animateFade)

//.fadein을 관찰하도록 지시
const fadeElements = document.querySelectorAll('.fadein');
fadeElements.forEach(fadeElement => {
  fadeObserver.observe(fadeElement)
})