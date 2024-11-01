    //전역변수 초기화
    let canvas = null;  //캔버스 요소를 담을 변수 선언
    let ctx = null; //getContext()메소드를 담을 변수
    let intervaId = null; //setInterval메소드를 담을 변수
    let direction = null; //키보드 방향 값을 담을 변수
    let score = 0;  //점수를 담을 변수
    let canvasW, canvasH; //캔버스의 크기를 담을 변수

    //캔버스 초기화
    addEventListener("load", function(){
      canvas = document.getElementById("space");
      ctx = canvas.getContext("2d");
      canvasW = canvas.width;
      canvasH = canvas.height;
      help(); //help함수 호출 -> 글자를 표시해주는 함수

      //키보드를 누르면 keyControl함수를 호출
      document.addEventListener('keydown', keyControl)
    })

    //캔버스의 글자를 표시
    function help(){
      ctx.font = '20px Courier';
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';
      ctx.fillText('볼 바운스 게임 도움말', 200, 130);  //(표시할 문구, x축 위치, y축 위치)
      ctx.fillText("게임 시작 : space bar", 200, 180);
      ctx.fillText('바 조절: 왼쪽(<-), 오른쪽(->)',200, 230);
    }

    function keyControl(){
      console.log(event.keyCode)  //키코드 확인 : 왼쪽37, 오른쪽39, 스페이스바32
      let selection = { //누른 키보드 버튼의 숫자를 속성 이름을 값을 할당
        32 : "startGame",
        37 : "left",
        39 : "right"
      }
      //누른 버튼이 startGame이면 playGame()함수 호출
      if(selection[event.keyCode] == 'startGame'){
        playGame();
      }
      //누른 버튼이 startGame이 아니면 direction에 입력한 키 값을 담음
      else{
        direction = selection[event.keyCode];
        //입력한 키에 대한 값을 출력
        console.log("key: " + event.keyCode + ", value: " + selection[event.keyCode]);
      }
    }

    //공(ball) 객체 생성
    const ball = {
      x: 200, //x축 위치(초기값)
      y: 200, //y축 위치(초기값)
      xspeed: -2, //x축으로 이동하는 값
      yspeed: 3, //y축으로 이동하는 값
      radius: 10, //공의 반지름 값
      draw: function(){ //공을 그려주는 메소드
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);  //원을 그려주는 공식:Math.PI*2
        ctx.fillStyle = 'white';
        ctx.fill();
      },
      //공의 위치를 이동시키는 메소드
      move: function(){
        this.x += this.xspeed;
        this.y += this.yspeed;
      },
      //캔버스 벽에 닿았을때 공을 반대 방향으로 이동시키는 메소드
      checkWall: function(){
        if(this.x < 0 || this.x > canvasW){
          this.xspeed = -this.xspeed;
        }
        if(this.y < 0 || this.y > canvasH){
          this.yspeed = -this.yspeed;
        }
      }
    }
    
    //bar 객체 생성
    const bar = {
      x: 100,
      y: 300,
      barWidth: 50, //bar 넓이
      barHeight: 3, //bar 높이
      moveSpace: 20,  //bar의 이동값
      barColor: 'white',
      
      //블록 객체에 사각형을 만드는 메소드
      draw: function(){
        ctx.fillStyle = this.barColor;
        ctx.fillRect(this.x, this.y, this.barWidth, this.barHeight);
      },
      move: function(){ //bar를 움직이게 하는 메소드
        if(direction == 'right'){ //이동 방향이 right면 실행
          this.x = this.x + this.moveSpace; //bar의 x축 위치를 현재 위치에서 bar의 이동 값을 더한 값만큼 이동
          
          //bar를 캔버스 오른쪽 밖으로 나가지 않도록 이동을 못하게 막아주는 구문
          if(this.x > canvasW - this.barWidth){
            this.x = canvasW - this.barWidth; 
          }
        }
        //이동 방향이 left면 실행
        else if(direction == 'left'){
          this.x -= this.moveSpace  //bar의 x축 위치를 현재 위치에서 bar의 이동 값을 뺀 값만큼 이동
          if(this.x < 0){ //bar의 위치가 캔버스의 왼쪽 끝이면 더 이상 이동하지 못하도록 막음
            this.x = 0;
          }
        }
        direction = ''; //마지막으로 방향 값을 비워줌
      },
      //충돌을 감지하는 메소드
      bounceCheck: function(ball){
        if(
          ball.x >= this.x && 
          ball.x <= this.x + this.barWidth &&
          ball.y >= this.y &&
          ball.y <= this.y + this.barHeight
        ){ //ball과 bar가 충돌했을때
          //공의 y축 방향을 반대 방향으로 이동시킴
          ball. yspeed = -ball.yspeed
          score++;  //score를 1증가 시킴
        }
      }
    }

    //score 글자를 표시하는 함수
    function drawScore(){
      ctx.font = '20px Courier';
      ctx.fillStyle = 'white';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';
      ctx.fillText("seore: " + score, 10, 30)
    }

    //장애물을 생성하는 함수, 매개변수로 x축 y축 위치값을 전달 받음
    function barrier(x, y){
      this.x = x; //장애물의 x위치값
      this.y = y; //장애물의 y위치값
      this.barWidth = 50; //장애물의 넓이
      this.barHeight = 10; //장애물의 높이
      this.barColor = 'yellow'; //장애물 색상
      
      //블록 객체이 사각형을 만드는 메소드를 생성
      this.draw = function(){
        ctx.fillStyle = this.barColor;
        ctx.fillRect(this.s, this.y, this.barWidth, this.barHeight);
      }
    }


    //장애물의 위치를 랜덤으로 적용하는 함수
    function barrierGen(barrierArray, barrierNum){  //barrierArray = 장애물 객체를 담을 배열, barrierNum = 장애물의 갯수
      //장애물이 생성될 최대 위치 값
      let locationW = canvasW - bar.barWidth;
      let locationH = bar.y - 100;
      let barrierX, barrierY; //장애물의 위치 값을 담을 변수
      //장애물의 갯수만큼 반복문 실행
      for(let i = 0; i < barrierNum; i++){
        //장애물의 위치를 랜덤으로 설정
        barrierX = Math.floor(Math.random() * locationW);
        barrierY = Math.floor(Math.random() * locationH);

        //배열에 담아주는데 barrier 생성자함수로 랜덤으로 설정한 x축 위치와 y축 위치를 인자로 전달하면서 생성
        barrierArray[i] = new barrierArray(barrierX, barrierY)
      }
    }


    function playGame(){
      //barrierr를 생성하는 구문(장애물)
      const barrierId = document.getElementById('barrierNum');
      //선택된 option의 인덱스를 변수에 할당
      let barrierIdx = barrierId.selectedIndex;
      console.log(barrierIdx)
      //선택한 option의 value값을 변수에 할당
      let barrierNum = barrierId.options[barrierIdx].value;
      //barrier들을 담을 배열을 생성
      let barrierArray = new Array();

      //barrierGan함수로 배열과 선택한 option의 value값을 인자로 전달하여 호출
      barrierGen(barrierArray, barrierNum)

      //0.02초마다 화면을 지우고 객체의 메소드를 실행
      intervaId = setInterval(function(){
        ctx.clearRect(0, 0, canvasW, canvasH);
        ball.draw();  //볼을 캔버스에 그려줌
        ball.move();  //볼의 위치를 이동시켜줌
        ball.checkWall(); //볼이 캔버스 밖으로 나가지 않게 하는 메소드

        //장애물의 갯수만큼 반복
        for(var i = 0; i < barrierNum; i++){
          barrierArray[i].draw(); //장애물을 그려줌
        }

        bar.draw(); //bar를 캔버스에 그려줌
        bar.move(); //bar의 위치를 이동시켜줌
        bar.bounceCheck(ball);  //ball객체를 파리미터로 전달
        drawScore();  //스코어 표시
        gameOver(ball); //게임오버 함수 호출
      }, 20)
    }

    //공이 캔버스 바닦에 닿으면 게임오버
    function gameOver(ball){
      if(ball.y > canvasH){
        clearInterval(intervaId); //setInerval함수를 종료
        //Game Over 글자 표시
        ctx.font = '50px Courier',
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.fillText("Game Over", canvasW/2, canvasH/2);
      }
    }