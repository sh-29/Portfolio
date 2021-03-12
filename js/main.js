$(document).ready(function(){
  /* 패널1 제어는 common.js 파일에 있음 */
  
  /* 패널2 */
  // 토글 스크립트
  var _toggle = $('.toggle')
  var tit = new Array(6);
  tit[0] = 'html';
  tit[1] = 'css';
  tit[2] = 'script';
  tit[3] = 'jQuery';
  tit[4] = 'sass';
  tit[5] = 'ps&ai';

  _toggle.find('.tg').on('click',function () {
    var toggleidx = $(this).closest('.toggle_list').index();
    // console.log(toggleidx);
    // 반복되는 요소 수정해야함. css도 같이 수정해야함
    $('.img_box').children().eq(toggleidx).children('p').toggleClass('light').next().toggleClass('on').siblings('b').toggleClass('on');

    if(!$(this).prev().prop('checked')) {
      $(this).text($(this).data('num'));
    } else {
      $(this).text(tit[toggleidx]);
    }
  });


  /* 패널3 */
  // 애니메이션이 진행중이면 함수 강제종료
  
  $('#aP3 .arrow_box button').on('click',function () {
    var slideWrap = $('#aP3 .slide_wrap');
    // if(slideWrap.is(':animated')) return false;

    /* 업(이전) 버튼 클릭시
    -마지막 요소 복제, 복제요소를 첫째로 동적생성
    -마지막 요소 삭제 */
    /* 다운(다음) 버튼 클릭시
    -첫번째 요소 복제, 복제 요소를 마지막으로 동적생성
    -첫번째 요소 삭제 */
    var idx = $(this).index();
    var cntHei = slideWrap.children().outerHeight(true);
    // console.log(cntHei);

    if(slideWrap.is(':animated')) return false;
    if (idx === 0) {  //up(이전)버튼 클릭
      slideWrap.prepend(slideWrap.children().last().clone())
      .css({marginTop : -1*cntHei})
      .stop()
      .animate({marginTop : 0},function(){
      $(this).children().last().remove();
      });

    } else {  //down(다음)버튼 클릭
      slideWrap.append(slideWrap.children().first().clone())
      .css({marginTop : cntHei}).children().first().remove();
      slideWrap.animate({marginTop : 0});
    }
  });

  // 접근성을 제어하기위해 aria-hidden
  
  // 슬라이드 이미지 클리핑마스크 컬러, 흑백 제어
  $('#aP3 .slide_img').on({
    'mousemove mouseenter':function (evt) {
      // 이미지내에서 좌표값 = .color 좌표값
      var elePosX = evt.offsetX;
      var eleposY = evt.offsetY;
      // console.log(elePosX,eleposY);
      $(this).find('.color').css('clip-path','circle(20% at '+elePosX+'px '+eleposY+'px)');
      //기존 커서 없애기
      $('#cursor_follow').find('svg').addClass('none');
      $('#cursor_follow').find('p').addClass('block');
    }, 
    'mouseout mouseleave':function(){
      $(this).find('.color').removeAttr('style');
      $('#cursor_follow').find('svg').removeClass('none');
      $('#cursor_follow').find('p').removeClass('block');
    }
  });
  // 동적생성 요소 위와 같은 제어
  $(document).on('mousemove mouseenter','#aP3 .slide_img',function (evt) {
    // 이미지내에서 좌표값 = .color 좌표값
      var elePosX = evt.offsetX;
      var eleposY = evt.offsetY;
      // console.log(elePosX,eleposY);
      $(this).find('.color').css('clip-path','circle(20% at '+elePosX+'px '+eleposY+'px)');
      //기존 커서 없애기
      $('#cursor_follow').find('svg').addClass('none');
      $('#cursor_follow').find('p').addClass('block');
  });
  // 동적생성 요소 위와 같은 제어
  $(document).on('mouseout mouseleave','#aP3 .slide_img',function (evt) {
    $(this).find('.color').removeAttr('style');
      $('#cursor_follow').find('svg').removeClass('none');
      $('#cursor_follow').find('p').removeClass('block');
  });

  // view more 제어
  // 초기값 안보이게 제어
  // $('#aP3 .more_btn').next().css('display','none');
  $('#aP3 .more_btn').on('click',function () {
    $(this).next().slideDown();
  });
  $('#aP3 .arrow_box button').on('click',function(){
    $('#aP3 .more_cnt').slideUp();
  });
  // 동적생성 요소 위와 같은 view more 제어
  $(document).on('click','#aP3 .more_btn',function () {
    $(this).next().slideDown();
  });


  /* 패널4 */
  //버튼 클릭 스크립트
  var _prevBtn = $('#aP4 .arrow_box .left');
  var _nextBtn = $('#aP4 .arrow_box .right');
  var _aP4Move = $('#aP4 .cnt_list');

  _nextBtn.on('click',function(){
    _aP4Move.stop().animate({left:'-76%'},1000);
  },
  );
  _prevBtn.on('click',function(){
    _aP4Move.stop().animate({left:0},1000)
  });

  /* 패널4 버튼 클릭 호버시 살짝씩 움직이게 제어 */
  $('#aP4 .arrow_box .left').on({'mousemove':function(evt){
    var posX = evt.offsetX;
    var posY = evt.offsetY;
    // console.log(posX, posY, btnPosX, btnPosY);
    _prevBtn.css({top:posX+'px', left:posY+'px'});

  },'mouseout':function(evt){
    _prevBtn.css({top:'10%', left:'10%'});
  },
  });
  $('#aP4 .arrow_box .right').on({'mousemove':function(evt){
    var posX = evt.offsetX;
    var posY = evt.offsetY;
    // console.log(posX, posY, btnPosX, btnPosY);
    _nextBtn.css({top:posX+'px', left:posY+'px'});

  },'mouseout':function(evt){
    _nextBtn.css({top:'30%', left:'50%'});
  },
  });
});
